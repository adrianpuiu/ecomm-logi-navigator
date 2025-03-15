
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { date: "Mon", onTime: 92, avgDeliveryTime: 1.8, returnRate: 2.4 },
  { date: "Tue", onTime: 88, avgDeliveryTime: 2.1, returnRate: 2.2 },
  { date: "Wed", onTime: 95, avgDeliveryTime: 1.5, returnRate: 1.9 },
  { date: "Thu", onTime: 91, avgDeliveryTime: 1.7, returnRate: 2.5 },
  { date: "Fri", onTime: 87, avgDeliveryTime: 2.2, returnRate: 2.8 },
  { date: "Sat", onTime: 93, avgDeliveryTime: 1.6, returnRate: 2.1 },
  { date: "Sun", onTime: 96, avgDeliveryTime: 1.4, returnRate: 1.8 }
];

export function PerformanceChart() {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>Delivery Performance</CardTitle>
        <CardDescription>Weekly performance metrics for your logistics operations</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                axisLine={{ strokeOpacity: 0.2 }} 
                tickLine={{ strokeOpacity: 0.2 }} 
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }} 
                axisLine={{ strokeOpacity: 0.2 }} 
                tickLine={{ strokeOpacity: 0.2 }}
                domain={[80, 100]}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: 12 }} 
                axisLine={{ strokeOpacity: 0.2 }} 
                tickLine={{ strokeOpacity: 0.2 }}
                domain={[0, 5]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }} 
              />
              <Legend 
                iconType="circle"
                wrapperStyle={{ paddingTop: 20 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="onTime"
                name="On-Time Delivery %"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={2000}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgDeliveryTime"
                name="Avg. Delivery Time (days)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={2000}
                animationBegin={300}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="returnRate"
                name="Return Rate %"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={2000}
                animationBegin={600}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
