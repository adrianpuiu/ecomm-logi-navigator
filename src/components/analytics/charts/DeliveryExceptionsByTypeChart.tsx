
import { DateRange } from "react-day-picker";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface DeliveryExceptionsByTypeChartProps {
  dateRange: DateRange | undefined;
}

export function DeliveryExceptionsByTypeChart({ dateRange }: DeliveryExceptionsByTypeChartProps) {
  // This would typically come from an API based on the date range
  const data = [
    { name: "Address Issues", value: 28, color: "#FF5252" },
    { name: "Weather Delay", value: 15, color: "#4FC3F7" },
    { name: "Customer Not Available", value: 22, color: "#FFA726" },
    { name: "Damaged Package", value: 10, color: "#7C4DFF" },
    { name: "Missing Documentation", value: 8, color: "#66BB6A" },
    { name: "Vehicle Breakdown", value: 6, color: "#EC407A" },
    { name: "Other", value: 11, color: "#78909C" },
  ];

  // Calculate percentages and create labels
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  // Create a dynamic config object based on the data
  const config = data.reduce((acc, item) => {
    const key = item.name.toLowerCase().replace(/\s+/g, '_');
    acc[key] = {
      label: item.name,
      color: item.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  return (
    <div className="h-[300px]">
      <ChartContainer config={config} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <Pie
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={100}
              paddingAngle={1}
              dataKey="value"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              labelLine={{ stroke: 'rgba(0,0,0,0.3)', strokeWidth: 1 }}
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="var(--background)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<ChartTooltipContent />} 
              formatter={(value) => [`${value} (${((value as number) / total * 100).toFixed(1)}%)`, '']}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
