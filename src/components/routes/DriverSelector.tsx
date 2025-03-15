
import { useState, useEffect } from "react";
import { Driver } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { User, Phone, Clock, Award } from "lucide-react";

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
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "555-789-0123",
    license: "DL-56789012",
    certifications: ["Class B CDL", "Passenger"],
    available: true,
    maxHours: 11,
    currentHours: 5,
    location: {
      latitude: 37.7749,
      longitude: -122.4194
    }
  }
];

interface DriverSelectorProps {
  onSelectDriver?: (driver: Driver | null) => void;
}

export function DriverSelector({ onSelectDriver = () => {} }: DriverSelectorProps) {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  
  useEffect(() => {
    // In a real app, we would fetch drivers from the database here
    // For now, we'll just use the mock data
    setDrivers(mockDrivers);
  }, []);
  
  const handleDriverChange = (value: string) => {
    setSelectedDriverId(value);
    
    if (value) {
      const driverId = parseInt(value);
      const driver = drivers.find(d => d.id === driverId) || null;
      setSelectedDriver(driver);
      onSelectDriver(driver);
    } else {
      setSelectedDriver(null);
      onSelectDriver(null);
    }
  };
  
  const getHoursUtilizationPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };
  
  const getHoursColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Assign Driver</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {driver.name}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        
        {selectedDriver && (
          <div className="space-y-3 bg-muted/30 rounded-md p-3 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{selectedDriver.phone}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Hours: {selectedDriver.currentHours}/{selectedDriver.maxHours}h</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {selectedDriver.maxHours - selectedDriver.currentHours}h remaining
                </span>
              </div>
              <Progress 
                value={getHoursUtilizationPercentage(selectedDriver.currentHours, selectedDriver.maxHours)} 
                className="h-2"
                indicatorClassName={getHoursColor(getHoursUtilizationPercentage(selectedDriver.currentHours, selectedDriver.maxHours))}
              />
            </div>
            
            {selectedDriver.location && (
              <div className="flex items-center gap-2 text-sm">
                <div className="text-muted-foreground">Current Location:</div>
                <div>
                  {selectedDriver.location.latitude.toFixed(4)}, {selectedDriver.location.longitude.toFixed(4)}
                </div>
              </div>
            )}
            
            {selectedDriver.certifications.length > 0 && (
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Certifications:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedDriver.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cert}
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
