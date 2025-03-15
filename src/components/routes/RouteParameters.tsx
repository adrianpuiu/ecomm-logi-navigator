
import { useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Stop {
  id: string;
  address: string;
  type: "origin" | "destination" | "waypoint";
}

export function RouteParameters() {
  const [stops, setStops] = useState<Stop[]>([
    { id: "origin", address: "", type: "origin" },
    { id: "destination", address: "", type: "destination" }
  ]);

  const addWaypoint = () => {
    const newStop: Stop = {
      id: `waypoint-${Date.now()}`,
      address: "",
      type: "waypoint"
    };
    
    // Insert the waypoint before the destination
    const newStops = [...stops];
    newStops.splice(newStops.length - 1, 0, newStop);
    setStops(newStops);
  };

  const removeStop = (id: string) => {
    // Don't allow removing origin or destination
    if (id === "origin" || id === "destination") return;
    setStops(stops.filter(stop => stop.id !== id));
  };

  const updateAddress = (id: string, address: string) => {
    setStops(stops.map(stop => 
      stop.id === id ? { ...stop, address } : stop
    ));
  };

  const getStopLabel = (type: string) => {
    switch (type) {
      case "origin": return "Starting Point";
      case "destination": return "Destination";
      case "waypoint": return "Stop";
      default: return "Location";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Route Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stops.map((stop, index) => (
          <div key={stop.id} className="flex items-center space-x-2">
            <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-grow">
              <Input
                placeholder={`${getStopLabel(stop.type)} address`}
                value={stop.address}
                onChange={(e) => updateAddress(stop.id, e.target.value)}
              />
            </div>
            {stop.type === "waypoint" && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeStop(stop.id)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2" 
          onClick={addWaypoint}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Waypoint
        </Button>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Date</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Window</label>
            <div className="flex space-x-2">
              <Input type="time" placeholder="Start" />
              <Input type="time" placeholder="End" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
