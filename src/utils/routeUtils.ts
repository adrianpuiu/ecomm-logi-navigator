
import { supabase } from "@/integrations/supabase/client";
import { Route, RouteStop } from "@/types/route";
import { toast } from "@/components/ui/use-toast";

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
        date: route.date,
        time_window_start: route.timeWindow?.start,
        time_window_end: route.timeWindow?.end,
        driver_id: route.driver?.id,
        vehicle_id: route.vehicle?.id,
        optimization_priority: route.optimizationPriority,
        constraints: route.constraints,
        status: route.status || 'planned',
        distance: route.distance,
        duration: route.duration,
        estimated_cost: route.estimatedCost,
      })
      .select()
      .single();

    if (routeError) throw routeError;

    // Then save the stops
    if (route.stops && route.stops.length > 0) {
      const stopsToInsert = route.stops.map((stop, index) => ({
        route_id: routeData.id,
        address: stop.address,
        latitude: stop.latitude,
        longitude: stop.longitude,
        type: stop.type,
        order_index: index,
        arrival_time: stop.arrivalTime,
        departure_time: stop.departureTime,
      }));

      const { error: stopsError } = await supabase
        .from('route_stops')
        .insert(stopsToInsert);

      if (stopsError) throw stopsError;
    }

    return routeData as unknown as Route;
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
