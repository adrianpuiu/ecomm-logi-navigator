
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Driver, Vehicle } from "@/types/route";

// Mock data for drivers and vehicles
const mockDrivers: Driver[] = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com",
    phone: "555-1234", 
    license: "CDL-A", 
    available: true,
    certifications: ["Hazmat", "Refrigerated"],
    maxHours: 12,
    currentHours: 4
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "555-5678", 
    license: "CDL-B", 
    available: true,
    certifications: ["Refrigerated"],
    maxHours: 10,
    currentHours: 2
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike@example.com",
    phone: "555-9012", 
    license: "CDL-A", 
    available: false,
    certifications: ["Hazmat"],
    maxHours: 12,
    currentHours: 8
  },
];

const mockVehicles: Vehicle[] = [
  { 
    id: 1, 
    name: "Truck 101", 
    type: "Box", 
    licensePlate: "ABC123",
    capacity: { weight: 24000, volume: 2000, pallets: 20 }, 
    fuelEfficiency: 6.5, 
    available: true,
    features: ["GPS", "Refrigeration"]
  },
  { 
    id: 2, 
    name: "Van 202", 
    type: "Van", 
    licensePlate: "DEF456",
    capacity: { weight: 3500, volume: 500, pallets: 4 }, 
    fuelEfficiency: 18, 
    available: true,
    features: ["GPS"]
  },
  { 
    id: 3, 
    name: "Truck 303", 
    type: "Flatbed", 
    licensePlate: "GHI789",
    capacity: { weight: 12000, volume: 0, pallets: 0 }, 
    fuelEfficiency: 10, 
    available: false,
    features: ["GPS", "Straps", "Tie-downs"]
  },
];

interface RouteDriverVehicleProps {
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver | null) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

export function RouteDriverVehicle({
  selectedDriver,
  setSelectedDriver,
  selectedVehicle,
  setSelectedVehicle,
}: RouteDriverVehicleProps) {
  // All users can now assign drivers/vehicles since we removed auth
  const canAssignDrivers = true;
  const canAssignVehicles = true;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver & Vehicle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="driver-select">Driver</Label>
          
          <Select
            value={selectedDriver?.id.toString() || ""}
            onValueChange={(value) => {
              const driver = mockDrivers.find((d) => d.id.toString() === value) || null;
              setSelectedDriver(driver);
            }}
          >
            <SelectTrigger id="driver-select">
              <SelectValue placeholder="Select a driver" />
            </SelectTrigger>
            <SelectContent>
              {mockDrivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id.toString()}>
                  {driver.name} {!driver.available && "(Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedDriver && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Phone: {selectedDriver.phone}</p>
              <p>License: {selectedDriver.license}</p>
              <p>Certifications: {selectedDriver.certifications.join(", ")}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-select">Vehicle</Label>
          
          <Select
            value={selectedVehicle?.id.toString() || ""}
            onValueChange={(value) => {
              const vehicle = mockVehicles.find((v) => v.id.toString() === value) || null;
              setSelectedVehicle(vehicle);
            }}
          >
            <SelectTrigger id="vehicle-select">
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent>
              {mockVehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                  {vehicle.name} {!vehicle.available && "(Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedVehicle && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Type: {selectedVehicle.type}</p>
              <p>Capacity: {selectedVehicle.capacity.weight} kg</p>
              <p>Fuel Efficiency: {selectedVehicle.fuelEfficiency} mpg</p>
              <p>Features: {selectedVehicle.features.join(", ")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
