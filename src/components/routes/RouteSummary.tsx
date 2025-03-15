
import { RouteStop, RouteConstraint, Vehicle } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateRouteCost } from "@/utils/routeUtils";
import { Clock, Route as RouteIcon, DollarSign, Fuel } from "lucide-react";

interface RouteSummaryProps {
  distance: number;
  duration: number;
  stops: RouteStop[];
  vehicle?: Vehicle | null;
  constraints: RouteConstraint;
}

export function RouteSummary({
  distance,
  duration,
  stops,
  vehicle,
  constraints
}: RouteSummaryProps) {
  const validStops = stops.filter(stop => stop.latitude && stop.longitude);
  const totalStops = validStops.length;
  const progress = (validStops.length / stops.length) * 100;
  
  if (!distance || !duration) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Route Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Add stops to see route details
        </CardContent>
      </Card>
    );
  }
  
  const estimatedCost = calculateRouteCost(
    distance,
    duration,
    vehicle?.type,
    constraints.avoidTolls
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RouteIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Distance</span>
            </div>
            <span className="font-medium">{(distance / 1000).toFixed(1)} km</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="font-medium">
              {Math.floor(duration / 3600)}h {Math.floor((duration % 3600) / 60)}m
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Est. Cost</span>
            </div>
            <span className="font-medium">${estimatedCost}</span>
          </div>
          
          {vehicle && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Fuel Efficiency</span>
              </div>
              <span className="font-medium">{vehicle.fuelEfficiency} mpg</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Stops Configured</span>
            <span className="font-medium">{validStops.length} of {stops.length}</span>
          </div>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground text-center">
            {progress === 100 
              ? "All stops are configured" 
              : "Configure all stops to optimize the route"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
