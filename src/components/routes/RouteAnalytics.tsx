
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { KpiCardsRow } from "@/components/analytics/KpiCardsRow";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for route analytics
const routesByDay = [
  { day: "Monday", routes: 12, distance: 580, onTime: 10 },
  { day: "Tuesday", routes: 15, distance: 720, onTime: 13 },
  { day: "Wednesday", routes: 18, distance: 850, onTime: 16 },
  { day: "Thursday", routes: 16, distance: 760, onTime: 14 },
  { day: "Friday", routes: 20, distance: 920, onTime: 17 },
  { day: "Saturday", routes: 10, distance: 480, onTime: 9 },
  { day: "Sunday", routes: 5, distance: 220, onTime: 5 },
];

const driverPerformance = [
  { driver: "John Doe", routes: 28, onTimePercentage: 92, avgDistance: 58 },
  { driver: "Jane Smith", routes: 32, onTimePercentage: 88, avgDistance: 64 },
  { driver: "Mike Johnson", routes: 25, onTimePercentage: 95, avgDistance: 52 },
  { driver: "Sara Williams", routes: 20, onTimePercentage: 90, avgDistance: 48 },
  { driver: "Robert Brown", routes: 18, onTimePercentage: 85, avgDistance: 55 },
];

const vehicleUtilization = [
  { name: "Truck 101", value: 35 },
  { name: "Van 202", value: 40 },
  { name: "Truck 303", value: 25 },
  { name: "Van 404", value: 30 },
  { name: "Truck 505", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function RouteAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Route Analytics</h3>
        
        <DateRangePicker
          dateRange={dateRange}
          onUpdate={setDateRange}
        />
      </div>
      
      <KpiCardsRow dateRange={dateRange} />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Utilization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Routes by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routesByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="routes" fill="#8884d8" name="Total Routes" />
                    <Bar dataKey="onTime" fill="#82ca9d" name="On-Time Routes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distance by Day (km)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={routesByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="distance" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Total Distance (km)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={driverPerformance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="driver" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="routes" fill="#8884d8" name="Total Routes" />
                    <Bar dataKey="onTimePercentage" fill="#82ca9d" name="On-Time %" />
                    <Bar dataKey="avgDistance" fill="#ffc658" name="Avg Distance (km)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleUtilization}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {vehicleUtilization.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
