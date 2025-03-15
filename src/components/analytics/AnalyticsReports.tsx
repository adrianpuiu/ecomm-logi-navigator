
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Calendar, BarChart2, Clock, Truck, RefreshCw, Users, CreditCard } from "lucide-react";

interface AnalyticsReportsProps {
  dateRange: DateRange;
}

export function AnalyticsReports({ dateRange }: AnalyticsReportsProps) {
  // State for the selected report type
  const [reportType, setReportType] = useState("prebuilt");

  // Mock data for prebuilt reports
  const prebuiltReports = [
    { 
      id: "carrier-performance", 
      name: "Carrier Performance Report", 
      description: "Details on carrier performance metrics",
      icon: <Truck className="h-4 w-4" />,
      lastRun: "Today, 09:15 AM"
    },
    { 
      id: "shipment-costs", 
      name: "Shipment Cost Analysis", 
      description: "Breakdown of shipping costs by various dimensions",
      icon: <CreditCard className="h-4 w-4" />,
      lastRun: "Yesterday, 04:30 PM"
    },
    { 
      id: "delivery-times", 
      name: "Delivery Time Report", 
      description: "Analysis of delivery times and on-time performance",
      icon: <Clock className="h-4 w-4" />,
      lastRun: "Jan 15, 2023, 10:22 AM"
    },
    { 
      id: "volume-trends", 
      name: "Shipment Volume Trends", 
      description: "Trends in shipment volumes over time",
      icon: <BarChart2 className="h-4 w-4" />,
      lastRun: "Jan 10, 2023, 02:45 PM"
    },
    { 
      id: "returns-analysis", 
      name: "Returns Analysis", 
      description: "Detailed analysis of return rates and reasons",
      icon: <RefreshCw className="h-4 w-4" />,
      lastRun: "Dec 28, 2022, 11:30 AM"
    },
    { 
      id: "customer-shipping", 
      name: "Customer Shipping Report", 
      description: "Shipping metrics broken down by customer",
      icon: <Users className="h-4 w-4" />,
      lastRun: "Never"
    }
  ];

  // Mock data for scheduled reports
  const scheduledReports = [
    { 
      id: "weekly-performance", 
      name: "Weekly Performance Summary", 
      schedule: "Every Monday, 8:00 AM",
      recipients: "operations@example.com, managers@example.com",
      lastRun: "Jan 15, 2023, 8:00 AM",
      nextRun: "Jan 22, 2023, 8:00 AM"
    },
    { 
      id: "monthly-cost", 
      name: "Monthly Cost Report", 
      schedule: "1st of each month, 9:00 AM",
      recipients: "finance@example.com, executives@example.com",
      lastRun: "Jan 1, 2023, 9:00 AM",
      nextRun: "Feb 1, 2023, 9:00 AM"
    },
    { 
      id: "daily-exceptions", 
      name: "Daily Shipping Exceptions", 
      schedule: "Daily, 6:00 PM",
      recipients: "support@example.com, operations@example.com",
      lastRun: "Today, 6:00 PM",
      nextRun: "Tomorrow, 6:00 PM"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Reports</CardTitle>
        <CardDescription>Generate and manage logistics reports</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prebuilt" onValueChange={setReportType}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="prebuilt">Pre-built Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          {/* Pre-built Reports Tab */}
          <TabsContent value="prebuilt">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Available Reports</h3>
                  <p className="text-sm text-muted-foreground">Run standard reports or customize them for your needs</p>
                </div>
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" /> Export All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prebuiltReports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 p-1.5 rounded-full bg-primary/10 text-primary">
                            {report.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{report.name}</CardTitle>
                            <CardDescription className="text-xs">{report.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Last run: {report.lastRun}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Customize</Button>
                          <Button size="sm" className="h-7 text-xs">Run Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Scheduled Reports Tab */}
          <TabsContent value="scheduled">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Scheduled Reports</h3>
                  <p className="text-sm text-muted-foreground">Manage your automated report schedules</p>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" /> Schedule New Report
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.schedule}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={report.recipients}>
                        {report.recipients}
                      </TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>{report.nextRun}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Custom Reports Tab */}
          <TabsContent value="custom">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Create Custom Report</h3>
                  <p className="text-sm text-muted-foreground">Build your own report based on specific metrics and dimensions</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Metrics</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">Cost per Shipment</Button>
                      <Button variant="outline" className="justify-start">On-Time Delivery</Button>
                      <Button variant="outline" className="justify-start">Transit Time</Button>
                      <Button variant="outline" className="justify-start">DIFOT Rate</Button>
                      <Button variant="outline" className="justify-start">Return Rate</Button>
                      <Button variant="outline" className="justify-start">+ More Metrics</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Dimensions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">By Carrier</Button>
                      <Button variant="outline" className="justify-start">By Customer</Button>
                      <Button variant="outline" className="justify-start">By Region</Button>
                      <Button variant="outline" className="justify-start">By Time Period</Button>
                      <Button variant="outline" className="justify-start">By Service Level</Button>
                      <Button variant="outline" className="justify-start">+ More Dimensions</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Report Format</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">Table</Button>
                      <Button variant="outline" className="justify-start">Chart</Button>
                      <Button variant="outline" className="justify-start">PDF</Button>
                      <Button variant="outline" className="justify-start">CSV</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline">Save as Template</Button>
                <Button variant="outline">Schedule</Button>
                <Button>Generate Report</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
