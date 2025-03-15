
import { DateRange } from "react-day-picker";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ShipmentsByRegionMapProps {
  dateRange: DateRange;
}

export function ShipmentsByRegionMap({ dateRange }: ShipmentsByRegionMapProps) {
  // Mock data - in a real app, this would be fetched based on the date range
  const regions = [
    { name: "Northeast", shipments: 1245, percentage: 28 },
    { name: "Southeast", shipments: 873, percentage: 19 },
    { name: "Midwest", shipments: 645, percentage: 14 },
    { name: "Southwest", shipments: 522, percentage: 12 },
    { name: "West", shipments: 921, percentage: 21 },
    { name: "Other", shipments: 267, percentage: 6 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center h-36 bg-muted/20 rounded-md border border-dashed">
        <div className="text-center text-muted-foreground">
          <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Interactive map visualization would appear here</p>
          <p className="text-xs">Using a mapping library like MapBox or Leaflet</p>
        </div>
      </div>
      
      <div className="space-y-3 mt-4">
        {regions.map((region) => (
          <div key={region.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{region.name}</span>
              <span className="font-medium">{region.shipments.toLocaleString()} shipments ({region.percentage}%)</span>
            </div>
            <Progress value={region.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
