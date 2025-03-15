
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

// Sample driver data - in a real application, this would come from an API
const drivers = [
  { id: 1, name: "John Smith", available: true },
  { id: 2, name: "Sarah Johnson", available: true },
  { id: 3, name: "Michael Brown", available: false },
  { id: 4, name: "Emily Davis", available: true },
];

export function DriverSelector() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base">
          <User className="h-4 w-4 mr-2" />
          Driver
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a driver" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map(driver => (
              <SelectItem 
                key={driver.id} 
                value={driver.id.toString()}
                disabled={!driver.available}
              >
                {driver.name} {!driver.available && "(Unavailable)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
