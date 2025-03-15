
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";

const data = [
  { name: "FastShip Express", score: 94, volume: 245 },
  { name: "Premier Logistics", score: 87, volume: 183 },
  { name: "Reliable Transport", score: 91, volume: 176 },
  { name: "Swift Delivery", score: 85, volume: 120 },
  { name: "Global Carriers", score: 89, volume: 98 },
];

export function CarrierPerformance() {
  // Calculate colors based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "hsl(var(--primary))";
    if (score >= 85) return "#10b981";
    if (score >= 80) return "#f59e0b";
    return "#f43f5e";
  };

  return (
    <Card className="animate-scale-in animation-delay-200">
      <CardHeader>
        <CardTitle>Carrier Performance</CardTitle>
        <CardDescription>Performance metrics for your shipping carriers</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
              barSize={32}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={{ strokeOpacity: 0.2 }} 
                tickLine={{ strokeOpacity: 0.2 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={{ strokeOpacity: 0.2 }} 
                tickLine={{ strokeOpacity: 0.2 }}
                domain={[75, 100]}
                label={{ value: 'Performance Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12, opacity: 0.7 } }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }}
                formatter={(value: number, name: string) => {
                  return [`${value}${name === 'score' ? '%' : ' shipments'}`, name === 'score' ? 'Performance Score' : 'Shipment Volume'];
                }}
              />
              <Legend 
                iconType="circle"
                wrapperStyle={{ paddingTop: 20 }}
              />
              <Bar 
                dataKey="score" 
                name="Performance Score" 
                radius={[4, 4, 0, 0]}
                animationDuration={2000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
