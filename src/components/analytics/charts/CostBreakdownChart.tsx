
import { DateRange } from "react-day-picker";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from "recharts";

interface CostBreakdownChartProps {
  dateRange: DateRange;
}

export function CostBreakdownChart({ dateRange }: CostBreakdownChartProps) {
  // Mock data - in a real app, this would be fetched based on the date range
  const data = [
    { name: "Base Shipping", value: 68, color: "hsl(var(--primary))" },
    { name: "Fuel Surcharge", value: 12, color: "#f59e0b" },
    { name: "Insurance", value: 8, color: "#10b981" },
    { name: "Handling Fees", value: 7, color: "#d946ef" },
    { name: "Other Fees", value: 5, color: "#a1a1aa" },
  ];

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            formatter={(value: number, name: string) => {
              return [`${value}%`, name];
            }}
          />
          <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
