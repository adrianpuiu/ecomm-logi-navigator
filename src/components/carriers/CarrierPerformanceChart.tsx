
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the performance chart
const mockPerformanceData = [
  { month: "Jan", onTimeRate: 92.3, damageRate: 1.1, costEfficiency: 87.4 },
  { month: "Feb", onTimeRate: 91.8, damageRate: 1.3, costEfficiency: 86.9 },
  { month: "Mar", onTimeRate: 93.5, damageRate: 1.0, costEfficiency: 88.2 },
  { month: "Apr", onTimeRate: 94.1, damageRate: 0.9, costEfficiency: 88.7 },
  { month: "May", onTimeRate: 93.8, damageRate: 0.8, costEfficiency: 89.1 },
  { month: "Jun", onTimeRate: 94.5, damageRate: 0.8, costEfficiency: 89.2 },
  { month: "Jul", onTimeRate: 95.1, damageRate: 0.7, costEfficiency: 90.1 },
  { month: "Aug", onTimeRate: 94.7, damageRate: 0.8, costEfficiency: 90.3 },
  { month: "Sep", onTimeRate: 94.2, damageRate: 0.9, costEfficiency: 89.8 },
  { month: "Oct", onTimeRate: 94.5, damageRate: 0.8, costEfficiency: 89.7 },
  { month: "Nov", onTimeRate: 95.2, damageRate: 0.7, costEfficiency: 90.4 },
  { month: "Dec", onTimeRate: 94.8, damageRate: 0.8, costEfficiency: 90.1 },
];

// Mock data for the quarterly performance
const mockQuarterlyData = [
  { quarter: "Q1", onTimeRate: 92.5, damageRate: 1.1, costEfficiency: 87.5 },
  { quarter: "Q2", onTimeRate: 94.1, damageRate: 0.8, costEfficiency: 89.0 },
  { quarter: "Q3", onTimeRate: 94.7, damageRate: 0.8, costEfficiency: 90.1 },
  { quarter: "Q4", onTimeRate: 94.8, damageRate: 0.8, costEfficiency: 90.1 },
];

// Mock data for the yearly performance
const mockYearlyData = [
  { year: "2019", onTimeRate: 89.3, damageRate: 1.5, costEfficiency: 84.7 },
  { year: "2020", onTimeRate: 90.2, damageRate: 1.3, costEfficiency: 85.8 },
  { year: "2021", onTimeRate: 91.8, damageRate: 1.1, costEfficiency: 87.2 },
  { year: "2022", onTimeRate: 93.1, damageRate: 0.9, costEfficiency: 88.5 },
  { year: "2023", onTimeRate: 94.5, damageRate: 0.8, costEfficiency: 89.7 },
];

interface CarrierPerformanceChartProps {
  carrierId: string;
}

export function CarrierPerformanceChart({ carrierId }: CarrierPerformanceChartProps) {
  // In a real implementation, we would fetch the performance data from Supabase
  
  const renderTooltipContent = (props: any) => {
    const { active, payload, label } = props;
    
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium text-sm mb-1">{`${label}`}</p>
          {payload.map((entry: any, index: number) => {
            let displayValue = entry.value;
            let displayName = entry.name;
            
            // Format the display value and name based on the data type
            if (entry.name === "onTimeRate") {
              displayValue = `${displayValue}%`;
              displayName = "On-Time Rate";
            } else if (entry.name === "damageRate") {
              displayValue = `${displayValue}%`;
              displayName = "Damage Rate";
            } else if (entry.name === "costEfficiency") {
              displayName = "Cost Efficiency";
            }
            
            return (
              <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
                {`${displayName}: ${displayValue}`}
              </p>
            );
          })}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Tabs defaultValue="monthly">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="monthly">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockPerformanceData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
            />
            <YAxis 
              yAxisId="left"
              domain={[85, 100]}
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 2]}
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <ReferenceLine y={90} yAxisId="left" stroke="#10b981" strokeDasharray="3 3" />
            <ReferenceLine y={1} yAxisId="right" stroke="#f43f5e" strokeDasharray="3 3" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="onTimeRate"
              name="On-Time Rate"
              stroke="hsl(var(--primary))"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="costEfficiency"
              name="Cost Efficiency"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="damageRate"
              name="Damage Rate"
              stroke="#f43f5e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="quarterly">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockQuarterlyData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
            />
            <YAxis 
              yAxisId="left"
              domain={[85, 100]}
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 2]}
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <ReferenceLine y={90} yAxisId="left" stroke="#10b981" strokeDasharray="3 3" />
            <ReferenceLine y={1} yAxisId="right" stroke="#f43f5e" strokeDasharray="3 3" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="onTimeRate"
              name="On-Time Rate"
              stroke="hsl(var(--primary))"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="costEfficiency"
              name="Cost Efficiency"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="damageRate"
              name="Damage Rate"
              stroke="#f43f5e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="yearly">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockYearlyData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
            />
            <YAxis 
              yAxisId="left"
              domain={[80, 100]}
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 2]}
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: "var(--border)" }} 
              tickLine={{ stroke: "var(--border)" }} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <ReferenceLine y={90} yAxisId="left" stroke="#10b981" strokeDasharray="3 3" />
            <ReferenceLine y={1} yAxisId="right" stroke="#f43f5e" strokeDasharray="3 3" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="onTimeRate"
              name="On-Time Rate"
              stroke="hsl(var(--primary))"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="costEfficiency"
              name="Cost Efficiency"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="damageRate"
              name="Damage Rate"
              stroke="#f43f5e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
