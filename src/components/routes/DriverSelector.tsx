
import { useState, useEffect } from "react";
import { Driver } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

// Mock drivers data
const mockDrivers: Driver[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    license: "DL-12345678",
    certifications: ["Hazmat", "Tanker"],
    available: true,
    maxHours: 11,
    currentHours: 3,
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "555-987-6543",
    license: "DL-87654321",
    certifications: ["Class A CDL", "Doubles/Triples"],
    available: true,
    maxHours: 11,
    currentHours: 0,
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "555-456-7890",
    license: "DL-45678901",
    certifications: ["Class A CDL", "Hazmat", "Tanker"],
    available: false,
    maxHours: 11,
    currentHours: 10,
  }
];

interface DriverSelectorProps {
  onSelectDriver?: (driver: Driver | null) => void;
}

export function DriverSelector({ onSelectDriver = () => {} }: DriverSelectorProps) {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  
  useEffect(() => {
    // In a real app, we would fetch drivers from the database here
    // For now, we'll just use the mock data
    setDrivers(mockDrivers);
  }, []);
  
  const handleDriverChange = (value: string) => {
    setSelectedDriverId(value);
    
    if (value) {
      const driverId = parseInt(value);
      const selectedDriver = drivers.find(driver => driver.id === driverId) || null;
      onSelectDriver(selectedDriver);
    } else {
      onSelectDriver(null);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Assign Driver</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedDriverId} onValueChange={handleDriverChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a driver" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {drivers
              .filter(driver => driver.available)
              .map(driver => (
                <SelectItem key={driver.id} value={String(driver.id)}>
                  {driver.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        
        {selectedDriverId && (
          <div className="mt-3 text-sm space-y-1">
            {(() => {
              const driver = drivers.find(d => d.id === parseInt(selectedDriverId));
              if (!driver) return null;
              
              return (
                <>
                  <div className="text-muted-foreground">Contact: {driver.phone}</div>
                  <div className="text-muted-foreground">Hours: {driver.currentHours}/{driver.maxHours}h</div>
                  {driver.certifications.length > 0 && (
                    <div className="text-muted-foreground">
                      Certifications: {driver.certifications.join(", ")}
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
