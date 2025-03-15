
import { DateRange } from "react-day-picker";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface CostTrendsChartProps {
  dateRange: DateRange | undefined;
}

export function CostTrendsChart({ dateRange }: CostTrendsChartProps) {
  // This would typically come from an API based on the date range
  const data = [
    { month: "Jan", domestic: 22.15, international: 45.80, avg: 27.35, target: 25.00 },
    { month: "Feb", domestic: 21.90, international: 46.20, avg: 27.10, target: 25.00 },
    { month: "Mar", domestic: 22.50, international: 47.10, avg: 27.80, target: 25.00 },
    { month: "Apr", domestic: 23.10, international: 48.40, avg: 28.50, target: 25.00 },
    { month: "May", domestic: 22.80, international: 47.50, avg: 28.10, target: 25.00 },
    { month: "Jun", domestic: 21.50, international: 46.80, avg: 26.90, target: 25.00 },
    { month: "Jul", domestic: 20.90, international: 45.90, avg: 26.20, target: 25.00 },
    { month: "Aug", domestic: 20.20, international: 44.80, avg: 25.60, target: 25.00 },
    { month: "Sep", domestic: 19.80, international: 44.20, avg: 25.10, target: 25.00 },
    { month: "Oct", domestic: 19.50, international: 43.90, avg: 24.80, target: 25.00 },
    { month: "Nov", domestic: 19.20, international: 43.50, avg: 24.50, target: 25.00 },
    { month: "Dec", domestic: 18.90, international: 43.10, avg: 24.20, target: 25.00 },
  ];

  const config = {
    domestic: {
      label: "Domestic Shipping Cost",
      color: "hsl(210, 90%, 50%)"
    },
    international: {
      label: "International Shipping Cost",
      color: "hsl(340, 90%, 55%)"
    },
    avg: {
      label: "Average Cost",
      color: "hsl(270, 70%, 50%)"
    },
    target: {
      label: "Target Cost",
      color: "hsl(120, 60%, 50%)"
    }
  };

  return (
    <div className="h-[300px]">
      <ChartContainer config={config} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
            />
            <YAxis 
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
              domain={[15, 50]}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<ChartTooltipContent />} formatter={(value) => [`$${value}`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="domestic" 
              name="Domestic" 
              stroke="var(--color-domestic)" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="international" 
              name="International" 
              stroke="var(--color-international)" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="avg" 
              name="Average" 
              stroke="var(--color-avg)" 
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <ReferenceLine 
              y={25} 
              stroke="var(--color-target)" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Target", 
                position: "insideTopRight", 
                fill: "var(--color-target)",
                fontSize: 11 
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
