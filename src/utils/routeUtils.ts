
import { supabase } from "@/integrations/supabase/client";
import { Route, RouteStop, RouteStatus, RouteConstraint, OptimizationPriority } from "@/types/route";
import { toast } from "@/components/ui/use-toast";
import { Json } from "@/integrations/supabase/types";

/**
 * Saves a route to Supabase
 * @param route The route data to save
 * @returns Promise with the saved route or null if there was an error
 */
export const saveRoute = async (route: Partial<Route>): Promise<Route | null> => {
  try {
    // First save the main route
    const { data: routeData, error: routeError } = await supabase
      .from('routes')
      .insert({
        name: route.name,
        date: route.date?.toISOString(),
        time_window_start: route.timeWindow?.start?.toISOString(),
        time_window_end: route.timeWindow?.end?.toISOString(),
        driver_id: route.driver?.id,
        vehicle_id: route.vehicle?.id,
        optimization_priority: route.optimizationPriority as string,
        constraints: route.constraints as unknown as Json,
        status: route.status as string,
        distance: route.distance,
        duration: route.duration,
        estimated_cost: route.estimatedCost,
      })
      .select()
      .single();

    if (routeError) {
      console.error('Error saving route:', routeError);
      throw routeError;
    }

    // Then save the stops
    if (route.stops && route.stops.length > 0) {
      const stopsToInsert = route.stops.map((stop, index) => ({
        route_id: routeData.id,
        address: stop.address,
        latitude: stop.latitude,
        longitude: stop.longitude,
        type: stop.type,
        order_index: index,
        arrival_time: stop.arrivalTime?.toISOString(),
        departure_time: stop.departureTime?.toISOString(),
      }));

      const { error: stopsError } = await supabase
        .from('route_stops')
        .insert(stopsToInsert);

      if (stopsError) {
        console.error('Error saving route stops:', stopsError);
        throw stopsError;
      }
    }

    // Format the data to match our Route type
    const savedRoute: Route = {
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
    };

    return savedRoute;
  } catch (error) {
    console.error('Error saving route:', error);
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

  // Check if origin and destination have coordinates
  const origin = stops.find(stop => stop.type === "origin");
  const destination = stops.find(stop => stop.type === "destination");

  if (!origin?.latitude || !origin?.longitude) {
    return { 
      isValid: false, 
      message: "The starting point must have valid coordinates"
    };
  }

  if (!destination?.latitude || !destination?.longitude) {
    return { 
      isValid: false, 
      message: "The destination must have valid coordinates"
    };
  }

  if (!name) {
    return { 
      isValid: false, 
      message: "Please provide a name for the route"
    };
  }

  return { isValid: true };
};
