
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShipmentVolumeByRegionChart } from "./charts/ShipmentVolumeByRegionChart";
import { DeliveryPerformanceChart } from "./charts/DeliveryPerformanceChart";
import { ShipmentStatusDistribution } from "./charts/ShipmentStatusDistribution";
import { CostTrendsChart } from "./charts/CostTrendsChart";
import { CarrierComparisonChart } from "./charts/CarrierComparisonChart";
import { DeliveryExceptionsByTypeChart } from "./charts/DeliveryExceptionsByTypeChart";

interface ShipmentAnalyticsContentProps {
  dateRange: DateRange | undefined;
}

export function ShipmentAnalyticsContent({ dateRange }: ShipmentAnalyticsContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Shipment Volume & Trends</CardTitle>
            <CardDescription>Daily shipment volume with 7-day moving average</CardDescription>
          </CardHeader>
          <CardContent>
            <ShipmentVolumeByRegionChart dateRange={dateRange} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Delivery Performance</CardTitle>
            <CardDescription>On-time vs delayed deliveries by week</CardDescription>
          </CardHeader>
          <CardContent>
            <DeliveryPerformanceChart dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Shipment Status Distribution</CardTitle>
            <CardDescription>Current status of all shipments in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <ShipmentStatusDistribution dateRange={dateRange} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Shipping Cost Trends</CardTitle>
            <CardDescription>Average cost per shipment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <CostTrendsChart dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Carrier Performance Comparison</CardTitle>
            <CardDescription>On-time delivery rates and average transit times</CardDescription>
          </CardHeader>
          <CardContent>
            <CarrierComparisonChart dateRange={dateRange} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Delivery Exceptions By Type</CardTitle>
            <CardDescription>Breakdown of delivery issues and their frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <DeliveryExceptionsByTypeChart dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
