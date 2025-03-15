
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";

// Sample vehicle data - in a real application, this would come from an API
const vehicles = [
  { id: 1, name: "Delivery Van #101", type: "Van", available: true },
  { id: 2, name: "Refrigerated Truck #204", type: "Refrigerated", available: true },
  { id: 3, name: "Flatbed Truck #305", type: "Flatbed", available: false },
  { id: 4, name: "Box Truck #402", type: "Box", available: true },
];

export function VehicleSelector() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base">
          <Truck className="h-4 w-4 mr-2" />
          Vehicle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a vehicle" />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map(vehicle => (
              <SelectItem 
                key={vehicle.id} 
                value={vehicle.id.toString()}
                disabled={!vehicle.available}
              >
                {vehicle.name} {!vehicle.available && "(Unavailable)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
