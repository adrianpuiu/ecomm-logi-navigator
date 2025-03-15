
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { FileText } from "lucide-react";
import { KpiCardsRow } from "@/components/analytics/KpiCardsRow";
import { ShipmentAnalyticsContent } from "@/components/analytics/ShipmentAnalyticsContent";

export default function Analytics() {
  // Update the state type to match DateRange from react-day-picker
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  });

  // Create a handler function that explicitly accepts DateRange
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <>
      <Helmet>
        <title>Analytics | LogiNav</title>
      </Helmet>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze your logistics performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker 
            dateRange={dateRange}
            onUpdate={handleDateRangeChange}
          />
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <KpiCardsRow dateRange={dateRange} />
      
      <div className="mt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-background border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="carriers">Carriers</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <ShipmentAnalyticsContent dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="shipments">
            <ShipmentAnalyticsContent dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="carriers">Carrier analytics content</TabsContent>
          <TabsContent value="costs">Cost analytics content</TabsContent>
          <TabsContent value="returns">Returns analytics content</TabsContent>
        </Tabs>
      </div>
    </>
  );
}
