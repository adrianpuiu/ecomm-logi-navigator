
import { useState, useEffect } from "react";
import { Vehicle } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

// Mock vehicles data
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Box Truck 01",
    type: "Box",
    licensePlate: "TRK-1234",
    capacity: {
      weight: 10000,
      volume: 30,
      pallets: 12
    },
    available: true,
    fuelEfficiency: 12,
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
  }
];

interface VehicleSelectorProps {
  onSelectVehicle?: (vehicle: Vehicle | null) => void;
}

export function VehicleSelector({ onSelectVehicle = () => {} }: VehicleSelectorProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  
  useEffect(() => {
    // In a real app, we would fetch vehicles from the database here
    // For now, we'll just use the mock data
    setVehicles(mockVehicles);
  }, []);
  
  const handleVehicleChange = (value: string) => {
    setSelectedVehicleId(value);
    
    if (value) {
      const vehicleId = parseInt(value);
      const selectedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId) || null;
      onSelectVehicle(selectedVehicle);
    } else {
      onSelectVehicle(null);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Assign Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
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
                  {vehicle.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        
        {selectedVehicleId && (
          <div className="mt-3 text-sm space-y-1">
            {(() => {
              const vehicle = vehicles.find(v => v.id === parseInt(selectedVehicleId));
              if (!vehicle) return null;
              
              return (
                <>
                  <div className="text-muted-foreground">Type: {vehicle.type}</div>
                  <div className="text-muted-foreground">
                    Capacity: {vehicle.capacity.weight} kg / {vehicle.capacity.volume} m³
                  </div>
                  {vehicle.features.length > 0 && (
                    <div className="text-muted-foreground">
                      Features: {vehicle.features.join(", ")}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
