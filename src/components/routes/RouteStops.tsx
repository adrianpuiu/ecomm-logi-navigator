
import { RouteStop } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Plus, X, AlertTriangle } from "lucide-react";

interface RouteStopsProps {
  stops: RouteStop[];
  onUpdateStop: (id: string, stop: Partial<RouteStop>) => void;
  onRemoveStop: (id: string) => void;
  onAddStop: (stop: RouteStop) => void;
  deliveryDate: string;
  setDeliveryDate: (date: string) => void;
  timeWindowStart: string;
  setTimeWindowStart: (time: string) => void;
  timeWindowEnd: string;
  setTimeWindowEnd: (time: string) => void;
}

export function RouteStops({
  stops,
  onUpdateStop,
  onRemoveStop,
  onAddStop,
  deliveryDate,
  setDeliveryDate,
  timeWindowStart,
  setTimeWindowStart,
  timeWindowEnd,
  setTimeWindowEnd,
}: RouteStopsProps) {
  // Check for stops without coordinates
  const hasOriginCoordinates = stops.some(
    stop => stop.type === "origin" && stop.latitude && stop.longitude
  );
  
  const hasDestinationCoordinates = stops.some(
    stop => stop.type === "destination" && stop.latitude && stop.longitude
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Stops</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasOriginCoordinates && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              The starting point must have valid coordinates. Click on the map to set the origin location.
            </AlertDescription>
          </Alert>
        )}
        
        {!hasDestinationCoordinates && stops.length > 1 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              The destination must have valid coordinates. Click on the map to set the destination location.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={stop.id} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                ${stop.type === 'origin' ? 'bg-green-500 text-white' : 
                  stop.type === 'destination' ? 'bg-red-500 text-white' : 
                  'bg-blue-500 text-white'}`}>
                {index + 1}
              </div>
              <div className="flex-grow">
                <Input
                  placeholder={`${stop.type === 'origin' ? 'Starting point' : 
                               stop.type === 'destination' ? 'Destination' : 
                               'Stop'} address`}
                  value={stop.address}
                  onChange={(e) => onUpdateStop(stop.id, { address: e.target.value })}
                  className={!stop.latitude && !stop.longitude ? "border-red-300" : ""}
                />
                {stop.latitude && stop.longitude ? (
                  <div className="text-xs text-muted-foreground mt-1">
                    Lat: {stop.latitude.toFixed(5)}, Lng: {stop.longitude.toFixed(5)}
                  </div>
                ) : (
                  <div className="text-xs text-red-500 mt-1">
                    No coordinates - click on the map to set location
                  </div>
                )}
              </div>
              {stop.type === 'waypoint' && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemoveStop(stop.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            onAddStop({
              id: `waypoint-${Date.now()}`,
              address: "",
              type: "waypoint",
              latitude: undefined,
              longitude: undefined,
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stop
        </Button>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Date</label>
            <Input 
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Window</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="time"
                value={timeWindowStart}
                onChange={(e) => setTimeWindowStart(e.target.value)}
                placeholder="Start"
              />
              <Input
                type="time"
                value={timeWindowEnd}
                onChange={(e) => setTimeWindowEnd(e.target.value)}
                placeholder="End"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
