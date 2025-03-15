
import { supabase } from "@/integrations/supabase/client";
import { Route, RouteStop, RouteStatus, RouteConstraint, OptimizationPriority, Driver, Vehicle, VehicleType } from "@/types/route";
import { toast } from "@/components/ui/use-toast";
import { Json } from "@/integrations/supabase/types";

/**
 * Saves a route to Supabase
 * @param route The route data to save
 * @returns Promise with the saved route or null if there was an error
 */
export const saveRoute = async (route: Partial<Route>): Promise<Route | null> => {
  try {
    // Validate the route data before saving
    const validation = validateRouteData(route.stops || [], route.name);
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.message,
        variant: "destructive"
      });
      return null;
    }

    console.log("Saving route:", route);

    // First save the main route
    const { data: routeData, error: routeError } = await supabase
      .from('routes')
      .insert([{
        name: route.name,
        date: route.date?.toISOString(),
        time_window_start: route.timeWindow?.start?.toISOString(),
        time_window_end: route.timeWindow?.end?.toISOString(),
        driver_id: route.driver?.id ? String(route.driver.id) : null,
        vehicle_id: route.vehicle?.id ? String(route.vehicle.id) : null,
        optimization_priority: route.optimizationPriority as string,
        constraints: route.constraints as unknown as Json,
        status: route.status as string,
        distance: route.distance || 0,
        duration: route.duration || 0,
        estimated_cost: route.estimatedCost || 0,
      }])
      .select()
      .single();

    if (routeError) {
      console.error('Error saving route:', routeError);
      throw routeError;
    }

    console.log("Route saved successfully:", routeData);

    // Then save the stops
    if (route.stops && route.stops.length > 0) {
      const stopsToInsert = route.stops.map((stop, index) => ({
        route_id: routeData.id,
        address: stop.address,
        latitude: stop.latitude !== undefined ? stop.latitude : null,
        longitude: stop.longitude !== undefined ? stop.longitude : null,
        type: stop.type,
        order_index: index,
        arrival_time: stop.arrivalTime?.toISOString(),
        departure_time: stop.departureTime?.toISOString(),
      }));

      console.log("Saving route stops:", stopsToInsert);

      const { error: stopsError } = await supabase
        .from('route_stops')
        .insert(stopsToInsert);

      if (stopsError) {
        console.error('Error saving route stops:', stopsError);
        throw stopsError;
      }

      console.log("Route stops saved successfully");
    }

    // Format the data to match our Route type
    const savedRoute = {
      id: routeData.id,
      name: routeData.name,
      date: new Date(routeData.date),
      timeWindow: routeData.time_window_start && routeData.time_window_end ? {
        start: new Date(routeData.time_window_start),
        end: new Date(routeData.time_window_end)
      } : undefined,
      stops: route.stops || [],
      driver: route.driver,
      vehicle: route.vehicle,
      optimizationPriority: routeData.optimization_priority as OptimizationPriority,
      constraints: routeData.constraints as unknown as RouteConstraint,
      status: routeData.status as RouteStatus,
      distance: routeData.distance,
      duration: routeData.duration,
      estimatedCost: routeData.estimated_cost,
      createdAt: new Date(routeData.created_at),
      updatedAt: new Date(routeData.updated_at)
    } as Route;

    toast({
      title: "Route saved successfully",
      description: `Route "${savedRoute.name}" has been saved.`,
    });

    return savedRoute;
  } catch (error) {
    console.error('Error saving route:', error);
    toast({
      title: "Error saving route",
      description: "There was a problem saving your route. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};

/**
 * Validates route data before saving
 * @param stops Array of route stops
 * @param name Route name
 * @returns Object with isValid boolean and any error message
 */
export const validateRouteData = (
  stops: RouteStop[], 
  name?: string
): { isValid: boolean; message?: string } => {
  if (!stops || stops.length < 2) {
    return { 
      isValid: false, 
      message: "A route must have at least two stops (origin and destination)"
    };
  }

  // Check if at least one stop has address information
  const hasValidStops = stops.some(stop => 
    stop.address && (stop.latitude !== undefined && stop.longitude !== undefined)
  );

  if (!hasValidStops) {
    return { 
      isValid: false, 
      message: "At least one stop must have a valid address and coordinates"
    };
  }

  // Check if origin has coordinates
  const origin = stops.find(stop => stop.type === "origin");
  if (origin && (!origin.latitude || !origin.longitude)) {
    return { 
      isValid: false, 
      message: "The starting point must have valid coordinates. Please add a valid origin point on the map."
    };
  }

  // Check if destination has coordinates
  const destination = stops.find(stop => stop.type === "destination");
  if (destination && (!destination.latitude || !destination.longitude)) {
    return { 
      isValid: false, 
      message: "The destination must have valid coordinates. Please add a valid destination on the map."
    };
  }

  if (!name || name.trim() === '') {
    return { 
      isValid: false, 
      message: "Please provide a name for the route"
    };
  }

  return { isValid: true };
};

/**
 * Calculates the estimated cost of a route
 * @param distance Distance in meters
 * @param duration Duration in seconds
 * @param vehicleType Type of vehicle (affects fuel consumption)
 * @param avoidTolls Whether tolls are avoided
 * @returns Estimated cost in dollars
 */
export const calculateRouteCost = (
  distance: number,
  duration: number,
  vehicleType?: string,
  avoidTolls?: boolean
): number => {
  // Base rates
  const baseRatePerKm = 1.5;         // $ per km
  const driverRatePerHour = 30;      // $ per hour
  const estimatedTollCost = avoidTolls ? 0 : distance / 50000; // Rough estimate
  
  // Vehicle-specific fuel consumption adjustments
  let fuelEfficiencyFactor = 1.0;
  if (vehicleType) {
    switch (vehicleType.toLowerCase()) {
      case 'van':
        fuelEfficiencyFactor = 0.9;
        break;
      case 'refrigerated':
        fuelEfficiencyFactor = 1.3; // Higher fuel consumption for refrigeration
        break;
      case 'flatbed':
        fuelEfficiencyFactor = 1.2;
        break;
      case 'tanker':
        fuelEfficiencyFactor = 1.4;
        break;
      default:
        fuelEfficiencyFactor = 1.0;
    }
  }
  
  // Calculate component costs
  const distanceCost = (distance / 1000) * baseRatePerKm * fuelEfficiencyFactor;
  const timeCost = (duration / 3600) * driverRatePerHour;
  
  // Total estimated cost
  const totalCost = distanceCost + timeCost + estimatedTollCost;
  
  // Round to 2 decimal places
  return Math.round(totalCost * 100) / 100;
};

/**
 * Fetches routes from the database with optional filtering
 * @param filter Optional filter object for querying routes
 * @returns Promise with an array of routes
 */
export const fetchRoutes = async (filter?: {
  driverName?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: RouteStatus;
}): Promise<Route[]> => {
  try {
    let query = supabase.from('routes').select(`
      *,
      route_stops (*),
      drivers:driver_id (*),
      vehicles:vehicle_id (*)
    `);
    
    // Apply filters if provided
    if (filter) {
      if (filter.driverName) {
        // This assumes there's a column called 'name' in the drivers table
        query = query.filter('drivers.first_name', 'ilike', `%${filter.driverName}%`)
          .or(`drivers.last_name.ilike.%${filter.driverName}%`);
      }
      
      if (filter.dateFrom) {
        query = query.gte('date', filter.dateFrom.toISOString());
      }
      
      if (filter.dateTo) {
        query = query.lte('date', filter.dateTo.toISOString());
      }
      
      if (filter.status) {
        query = query.eq('status', filter.status);
      }
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Transform the data to match our Route type
    const routes = data.map(item => {
      // Create a properly formatted driver object that matches our Driver type
      const driver = item.drivers ? {
        id: item.drivers.id,
        name: `${item.drivers.first_name} ${item.drivers.last_name}`.trim(),
        email: item.drivers.email || '',
        phone: item.drivers.phone || '',
        license: item.drivers.license_number || '',
        certifications: [],
        available: item.drivers.status === 'available',
        maxHours: 8, // Default values since these don't exist in the DB
        currentHours: 0,
        location: undefined
      } as Driver : undefined;
      
      // Create a properly formatted vehicle object that matches our Vehicle type
      const vehicle = item.vehicles ? {
        id: item.vehicles.id,
        name: item.vehicles.name,
        type: item.vehicles.type as VehicleType,
        licensePlate: item.vehicles.license_plate,
        capacity: {
          weight: item.vehicles.capacity || 0,
          volume: 0,
          pallets: 0
        },
        available: item.vehicles.status === 'available',
        fuelEfficiency: 0,
        currentLocation: undefined,
        features: []
      } as Vehicle : undefined;

      return {
        id: item.id,
        name: item.name,
        date: new Date(item.date),
        timeWindow: item.time_window_start && item.time_window_end ? {
          start: new Date(item.time_window_start),
          end: new Date(item.time_window_end)
        } : undefined,
        // Transform stops from the joined table
        stops: (item.route_stops || []).map((stop: any) => ({
          id: stop.id,
          address: stop.address,
          latitude: stop.latitude,
          longitude: stop.longitude,
          type: stop.type,
          arrivalTime: stop.arrival_time ? new Date(stop.arrival_time) : undefined,
          departureTime: stop.departure_time ? new Date(stop.departure_time) : undefined,
        })),
        driver: driver,
        vehicle: vehicle,
        optimizationPriority: item.optimization_priority as OptimizationPriority,
        constraints: item.constraints as RouteConstraint,
        status: item.status as RouteStatus,
        distance: item.distance,
        duration: item.duration,
        estimatedCost: item.estimated_cost,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      } as Route;
    });
    
    return routes;
  } catch (error) {
    console.error('Error fetching routes:', error);
    toast({
      title: "Error fetching routes",
      description: "There was a problem fetching the routes. Please try again.",
      variant: "destructive"
    });
    return [];
  }
};

/**
 * Fetches available drivers for route assignment
 * @returns Promise with an array of drivers
 */
export const fetchDrivers = async (): Promise<Driver[]> => {
  try {
    const { data, error } = await supabase
      .from('drivers')
      .select('*');
      
    if (error) throw error;
    
    return data.map((driver: any) => ({
      id: driver.id,
      name: `${driver.first_name} ${driver.last_name}`.trim(),
      email: driver.email || '',
      phone: driver.phone || '',
      license: driver.license_number || '',
      licenseExpiry: driver.license_expiry ? new Date(driver.license_expiry) : undefined,
      certifications: [],
      available: driver.status === 'available',
      maxHours: 8, // Default values since these don't exist in the DB
      currentHours: 0,
      location: undefined
    })) as Driver[];
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return [];
  }
};

/**
 * Fetches available vehicles for route assignment
 * @returns Promise with an array of vehicles
 */
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*');
      
    if (error) throw error;
    
    return data.map((vehicle: any) => ({
      id: vehicle.id,
      name: vehicle.name,
      type: vehicle.type as VehicleType,
      licensePlate: vehicle.license_plate,
      capacity: {
        weight: vehicle.capacity || 0,
        volume: 0,
        pallets: 0
      },
      available: vehicle.status === 'available',
      fuelEfficiency: 0,
      currentLocation: undefined,
      features: []
    })) as Vehicle[];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};
