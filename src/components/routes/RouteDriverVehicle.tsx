
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
  { id: "d1", name: "John Doe", phone: "555-1234", license: "CDL-A", available: true },
  { id: "d2", name: "Jane Smith", phone: "555-5678", license: "CDL-B", available: true },
  { id: "d3", name: "Mike Johnson", phone: "555-9012", license: "CDL-A", available: false },
];

const mockVehicles: Vehicle[] = [
  { id: "v1", name: "Truck 101", type: "semi", capacity: 24000, fuelEfficiency: 6.5, available: true },
  { id: "v2", name: "Van 202", type: "van", capacity: 3500, fuelEfficiency: 18, available: true },
  { id: "v3", name: "Truck 303", type: "box", capacity: 12000, fuelEfficiency: 10, available: false },
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver & Vehicle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="driver-select">Driver</Label>
          <Select
            value={selectedDriver?.id || ""}
            onValueChange={(value) => {
              const driver = mockDrivers.find((d) => d.id === value) || null;
              setSelectedDriver(driver);
            }}
          >
            <SelectTrigger id="driver-select">
              <SelectValue placeholder="Select a driver" />
            </SelectTrigger>
            <SelectContent>
              {mockDrivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name} {!driver.available && "(Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedDriver && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Phone: {selectedDriver.phone}</p>
              <p>License: {selectedDriver.license}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-select">Vehicle</Label>
          <Select
            value={selectedVehicle?.id || ""}
            onValueChange={(value) => {
              const vehicle = mockVehicles.find((v) => v.id === value) || null;
              setSelectedVehicle(vehicle);
            }}
          >
            <SelectTrigger id="vehicle-select">
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent>
              {mockVehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} {!vehicle.available && "(Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedVehicle && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Type: {selectedVehicle.type}</p>
              <p>Capacity: {selectedVehicle.capacity} kg</p>
              <p>Fuel Efficiency: {selectedVehicle.fuelEfficiency} mpg</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
