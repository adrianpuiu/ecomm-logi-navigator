
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DateRangeFilter } from "@/components/shipment/DateRangeFilter";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, 
  Line, ResponsiveContainer, PieChart, Pie, Cell, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Filter, RefreshCw } from "lucide-react";
import { useState } from "react";

// Mock data for delivery analytics
const DELIVERY_TIMES_DATA = [
  { name: "Mon", avg: 28, min: 18, max: 42 },
  { name: "Tue", avg: 32, min: 22, max: 45 },
  { name: "Wed", avg: 34, min: 25, max: 48 },
  { name: "Thu", avg: 30, min: 20, max: 40 },
  { name: "Fri", avg: 38, min: 26, max: 52 },
  { name: "Sat", avg: 42, min: 30, max: 58 },
  { name: "Sun", avg: 36, min: 28, max: 50 },
];

const DELIVERY_VOLUME_DATA = [
  { name: "8-10 AM", count: 12 },
  { name: "10-12 PM", count: 18 },
  { name: "12-2 PM", count: 24 },
  { name: "2-4 PM", count: 32 },
  { name: "4-6 PM", count: 28 },
  { name: "6-8 PM", count: 22 },
  { name: "8-10 PM", count: 14 },
];

const DELIVERY_SUCCESS_RATE_DATA = [
  { name: "First Attempt", value: 78 },
  { name: "Second Attempt", value: 15 },
  { name: "Third+ Attempt", value: 7 },
];

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

const PERFORMANCE_RADAR_DATA = [
  { subject: "On-time Rate", A: 85, B: 90, fullMark: 100 },
  { subject: "Driver Efficiency", A: 75, B: 80, fullMark: 100 },
  { subject: "Customer Satisfaction", A: 88, B: 84, fullMark: 100 },
  { subject: "Cost Efficiency", A: 70, B: 82, fullMark: 100 },
  { subject: "Exception Rate", A: 92, B: 88, fullMark: 100 },
  { subject: "Route Optimization", A: 78, B: 85, fullMark: 100 },
];

const EXCEPTIONS_BY_TYPE_DATA = [
  { name: "Address Issue", count: 12 },
  { name: "Customer Not Available", count: 24 },
  { name: "Weather Delay", count: 8 },
  { name: "Traffic Delay", count: 18 },
  { name: "Package Damage", count: 5 },
  { name: "Other", count: 9 },
];

export function DeliveryAnalytics() {
  const [dateRange, setDateRange] = useState<{ startDate?: Date; endDate?: Date }>({});
  const [activeTab, setActiveTab] = useState("delivery-times");

  const handleDateRangeChange = (startDate?: Date, endDate?: Date) => {
    setDateRange({ startDate, endDate });
    // In a real app, this would trigger a data refetch for the selected date range
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Delivery Performance Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Insights and metrics for same-day delivery operations
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={16} />
            <span className="hidden md:inline">Filter</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download size={16} />
            <span className="hidden md:inline">Export</span>
          </Button>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Delivery Volume</CardTitle>
            <CardDescription>Total deliveries today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">148</div>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 mr-1">↑ 12%</span> 
              compared to yesterday
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">On-Time Rate</CardTitle>
            <CardDescription>Same-day delivery performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92.5%</div>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 mr-1">↑ 3.2%</span> 
              compared to last week
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Delivery Time</CardTitle>
            <CardDescription>From dispatch to delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">34 min</div>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <span className="text-red-500 mr-1">↑ 2 min</span> 
              compared to yesterday
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="delivery-times">Delivery Times</TabsTrigger>
          <TabsTrigger value="success-rate">Success Rate</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="delivery-times" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Times by Day of Week</CardTitle>
              <CardDescription>Average, minimum and maximum delivery times in minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={DELIVERY_TIMES_DATA}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="min" stroke="#4caf50" name="Min Time" />
                    <Line type="monotone" dataKey="avg" stroke="#2196f3" name="Avg Time" strokeWidth={2} />
                    <Line type="monotone" dataKey="max" stroke="#f44336" name="Max Time" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Volume by Time of Day</CardTitle>
              <CardDescription>Number of deliveries completed during each time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DELIVERY_VOLUME_DATA}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Deliveries" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="success-rate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Success Rate</CardTitle>
                <CardDescription>Breakdown of successful deliveries by attempt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DELIVERY_SUCCESS_RATE_DATA}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {DELIVERY_SUCCESS_RATE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Current week vs previous week performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={120} data={PERFORMANCE_RADAR_DATA}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="This Week" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="Last Week" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance Metrics</CardTitle>
              <CardDescription>Average delivery times and completion rates by driver</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {/* This would be a table or chart of driver metrics in a real application */}
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Driver performance data visualization would appear here
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exceptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exceptions by Type</CardTitle>
              <CardDescription>Breakdown of delivery exceptions by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={EXCEPTIONS_BY_TYPE_DATA}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Exceptions" fill="#ff7043" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
