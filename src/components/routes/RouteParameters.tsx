
import { useState, useEffect } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RouteStop } from "@/types/route";
import { useToast } from "@/components/ui/use-toast";

interface RouteParametersProps {
  stops: RouteStop[];
  onUpdateStop: (id: string, stop: Partial<RouteStop>) => void;
  onRemoveStop: (id: string) => void;
  onAddStop: (stop: RouteStop) => void;
}

export function RouteParameters({ stops, onUpdateStop, onRemoveStop, onAddStop }: RouteParametersProps) {
  const { toast } = useToast();
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [timeWindowStart, setTimeWindowStart] = useState<string>("");
  const [timeWindowEnd, setTimeWindowEnd] = useState<string>("");

  const addWaypoint = () => {
    const newStop: RouteStop = {
      id: `waypoint-${Date.now()}`,
      address: "",
      type: "waypoint",
      latitude: undefined,
      longitude: undefined
    };
    
    onAddStop(newStop);
  };

  const geocodeAddress = async (address: string, stopId: string) => {
    const mapboxToken = localStorage.getItem("mapbox_token");
    if (!mapboxToken) {
      toast({
        title: "Mapbox Token Required",
        description: "Please set your Mapbox token to enable geocoding.",
        variant: "destructive"
      });
      return;
    }

    try {
      // URL encode the address
      const encodedAddress = encodeURIComponent(address);
      
      // Call Mapbox Geocoding API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) throw new Error('Geocoding API request failed');
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [longitude, latitude] = feature.center;
        
        onUpdateStop(stopId, {
          latitude,
          longitude,
          address: feature.place_name || address
        });
        
        toast({
          title: "Address Geocoded",
          description: `Geocoded address: ${feature.place_name}`
        });
      } else {
        toast({
          title: "Geocoding Failed",
          description: "Could not find coordinates for the provided address.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast({
        title: "Geocoding Error",
        description: "An error occurred while geocoding the address.",
        variant: "destructive"
      });
    }
  };

  const handleAddressChange = (id: string, address: string) => {
    onUpdateStop(id, { address });
  };

  const handleAddressBlur = (id: string, address: string) => {
    if (address.trim()) {
      geocodeAddress(address, id);
    }
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
                onChange={(e) => handleAddressChange(stop.id, e.target.value)}
                onBlur={(e) => handleAddressBlur(stop.id, e.target.value)}
              />
              {stop.latitude && stop.longitude && (
                <div className="text-xs text-muted-foreground mt-1">
                  Lat: {stop.latitude.toFixed(5)}, Lng: {stop.longitude.toFixed(5)}
                </div>
              )}
            </div>
            {stop.type === "waypoint" && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onRemoveStop(stop.id)}
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
            <Input 
              type="date" 
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Window</label>
            <div className="flex space-x-2">
              <Input 
                type="time" 
                placeholder="Start" 
                value={timeWindowStart}
                onChange={(e) => setTimeWindowStart(e.target.value)}
              />
              <Input 
                type="time" 
                placeholder="End" 
                value={timeWindowEnd}
                onChange={(e) => setTimeWindowEnd(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
