
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { AnalyticsReports } from '@/components/analytics/AnalyticsReports';
import { AnalyticsSettings } from '@/components/analytics/AnalyticsSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KpiCardsRow } from '@/components/analytics/KpiCardsRow';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, LayoutDashboard, Settings } from 'lucide-react';
import { DateRangePicker } from '@/components/analytics/DateRangePicker';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  });

  return (
    <>
      <Helmet>
        <title>Analytics & Reporting | Logistics TMS</title>
      </Helmet>

      <div className="ml-[240px] flex flex-col min-h-screen bg-background p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics & Reporting</h1>
            <p className="text-muted-foreground mt-1">
              Monitor key metrics and generate reports for your logistics operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DateRangePicker 
              dateRange={dateRange}
              onUpdate={setDateRange}
            />
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Export Dashboard
            </Button>
          </div>
        </div>
        
        <KpiCardsRow dateRange={dateRange} />
        
        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="pt-4">
            <AnalyticsDashboard dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="reports" className="pt-4">
            <AnalyticsReports dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            <AnalyticsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
