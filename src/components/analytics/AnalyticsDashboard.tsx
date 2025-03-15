
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw, Edit2, Maximize2, X, PlusCircle } from "lucide-react";
import { ShipmentVolumeChart } from "./charts/ShipmentVolumeChart";
import { CarrierPerformanceChart } from "./charts/CarrierPerformanceChart";
import { DeliveryTimeDistribution } from "./charts/DeliveryTimeDistribution";
import { CostBreakdownChart } from "./charts/CostBreakdownChart";
import { ReturnRateChart } from "./charts/ReturnRateChart";
import { ShipmentsByRegionMap } from "./charts/ShipmentsByRegionMap";

interface AnalyticsDashboardProps {
  dateRange: DateRange;
}

type WidgetType = {
  id: string;
  title: string;
  description: string;
  gridSpan: string; // 'col-span-1', 'col-span-2', etc.
  component: React.ReactNode;
  visible: boolean;
}

export function AnalyticsDashboard({ dateRange }: AnalyticsDashboardProps) {
  // In a real app, this configuration would be stored in a database
  // and loaded for the specific user
  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      id: "shipment-volume",
      title: "Shipment Volume",
      description: "Daily shipment volume trends",
      gridSpan: "col-span-2",
      component: <ShipmentVolumeChart dateRange={dateRange} />,
      visible: true
    },
    {
      id: "carrier-performance",
      title: "Carrier Performance",
      description: "Performance metrics by carrier",
      gridSpan: "col-span-1",
      component: <CarrierPerformanceChart dateRange={dateRange} />,
      visible: true
    },
    {
      id: "delivery-time",
      title: "Delivery Time Distribution",
      description: "Distribution of delivery times",
      gridSpan: "col-span-1",
      component: <DeliveryTimeDistribution dateRange={dateRange} />,
      visible: true
    },
    {
      id: "cost-breakdown",
      title: "Cost Breakdown",
      description: "Breakdown of shipping costs",
      gridSpan: "col-span-1",
      component: <CostBreakdownChart dateRange={dateRange} />,
      visible: true
    },
    {
      id: "return-rate",
      title: "Return Rate Over Time",
      description: "Trends in return rates",
      gridSpan: "col-span-1",
      component: <ReturnRateChart dateRange={dateRange} />,
      visible: true
    },
    {
      id: "shipments-by-region",
      title: "Shipments by Region",
      description: "Geographical distribution of shipments",
      gridSpan: "col-span-2",
      component: <ShipmentsByRegionMap dateRange={dateRange} />,
      visible: true
    }
  ]);

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, visible: false } : widget
    ));
  };

  const handleAddAllWidgets = () => {
    setWidgets(widgets.map(widget => ({ ...widget, visible: true })));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAddAllWidgets}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add All Widgets
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.filter(w => w.visible).map((widget) => (
          <Card key={widget.id} className={`${widget.gridSpan}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{widget.title}</CardTitle>
                  <CardDescription>{widget.description}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleRemoveWidget(widget.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {widget.component}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
