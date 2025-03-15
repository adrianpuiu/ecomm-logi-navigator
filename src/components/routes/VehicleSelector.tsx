
import { useState, useEffect } from "react";
import { Vehicle, VehicleType } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Truck, CheckCircle2 } from "lucide-react";

// Mock vehicles data
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Box Truck 01",
    type: "Box",
    licensePlate: "TRK-1234",
    capacity: {
      weight: 10000, // in kg
      volume: 30,     // in cubic meters
      pallets: 12
    },
    available: true,
    fuelEfficiency: 12, // miles per gallon
    features: ["Liftgate", "GPS Tracking"]
  },
  {
    id: 2,
    name: "Refrigerated Van 02",
    type: "Refrigerated",
    licensePlate: "VAN-5678",
    capacity: {
      weight: 5000,
      volume: 15,
      pallets: 6
    },
    available: true,
    fuelEfficiency: 15,
    features: ["Temperature Control", "GPS Tracking"]
  },
  {
    id: 3,
    name: "Flatbed 03",
    type: "Flatbed",
    licensePlate: "FLT-9012",
    capacity: {
      weight: 20000,
      volume: 0,
      pallets: 0
    },
    available: false,
    fuelEfficiency: 10,
    features: ["Straps", "Tarps", "GPS Tracking"]
  },
  {
    id: 4,
    name: "Tanker Truck 04",
    type: "Tanker",
    licensePlate: "TNK-3456",
    capacity: {
      weight: 25000,
      volume: 20,
      pallets: 0
    },
    available: true,
    fuelEfficiency: 8,
    features: ["Hazmat Certified", "GPS Tracking", "Pump System"]
  }
];

interface VehicleSelectorProps {
  onSelectVehicle?: (vehicle: Vehicle | null) => void;
}

export function VehicleSelector({ onSelectVehicle = () => {} }: VehicleSelectorProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  useEffect(() => {
    // In a real app, we would fetch vehicles from the database here
    // For now, we'll just use the mock data
    setVehicles(mockVehicles);
  }, []);
  
  const handleVehicleChange = (value: string) => {
    setSelectedVehicleId(value);
    
    if (value) {
      const vehicleId = parseInt(value);
      const vehicle = vehicles.find(v => v.id === vehicleId) || null;
      setSelectedVehicle(vehicle);
      onSelectVehicle(vehicle);
    } else {
      setSelectedVehicle(null);
      onSelectVehicle(null);
    }
  };

  const getVehicleTypeIcon = (type: VehicleType) => {
    return <Truck className="h-4 w-4 mr-1" />;
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Assign Vehicle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedVehicleId} onValueChange={handleVehicleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {vehicles
              .filter(vehicle => vehicle.available)
              .map(vehicle => (
                <SelectItem key={vehicle.id} value={String(vehicle.id)}>
                  <div className="flex items-center">
                    {getVehicleTypeIcon(vehicle.type)}
                    {vehicle.name}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        
        {selectedVehicle && (
          <div className="space-y-3 bg-muted/30 rounded-md p-3 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getVehicleTypeIcon(selectedVehicle.type)}
                <span className="font-medium">{selectedVehicle.type}</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Available
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">License:</div>
              <div>{selectedVehicle.licensePlate}</div>
              
              <div className="text-muted-foreground">Max Weight:</div>
              <div>{selectedVehicle.capacity.weight.toLocaleString()} kg</div>
              
              <div className="text-muted-foreground">Volume:</div>
              <div>{selectedVehicle.capacity.volume} m³</div>
              
              {selectedVehicle.capacity.pallets > 0 && (
                <>
                  <div className="text-muted-foreground">Pallets:</div>
                  <div>{selectedVehicle.capacity.pallets}</div>
                </>
              )}
              
              <div className="text-muted-foreground">Fuel Efficiency:</div>
              <div>{selectedVehicle.fuelEfficiency} mpg</div>
            </div>
            
            {selectedVehicle.features.length > 0 && (
              <div className="pt-2">
                <div className="text-xs text-muted-foreground mb-1">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedVehicle.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
