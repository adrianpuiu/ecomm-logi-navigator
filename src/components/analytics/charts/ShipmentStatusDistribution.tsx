
import { DateRange } from "react-day-picker";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ShipmentStatusDistributionProps {
  dateRange: DateRange | undefined;
}

export function ShipmentStatusDistribution({ dateRange }: ShipmentStatusDistributionProps) {
  // This would typically come from an API based on the date range
  const data = [
    { name: "Delivered", value: 68, color: "hsl(120, 70%, 45%)" },
    { name: "In Transit", value: 15, color: "hsl(210, 70%, 55%)" },
    { name: "Out for Delivery", value: 8, color: "hsl(45, 90%, 55%)" },
    { name: "Pending", value: 5, color: "hsl(190, 70%, 55%)" },
    { name: "Exception", value: 4, color: "hsl(0, 80%, 60%)" },
  ];

  // Create a dynamic config object based on the data
  const config = data.reduce((acc, item) => {
    acc[item.name.toLowerCase().replace(/\s+/g, '_')] = {
      label: item.name,
      color: item.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  return (
    <div className="h-[300px]">
      <ChartContainer config={config} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
