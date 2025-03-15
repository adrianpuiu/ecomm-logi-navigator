
import { DateRange } from "react-day-picker";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from "recharts";

interface DeliveryTimeDistributionProps {
  dateRange: DateRange;
}

export function DeliveryTimeDistribution({ dateRange }: DeliveryTimeDistributionProps) {
  // Mock data - in a real app, this would be fetched based on the date range
  const data = [
    { name: "1 Day", value: 32, color: "#10b981" },
    { name: "2 Days", value: 46, color: "#10b981" },
    { name: "3 Days", value: 15, color: "#f59e0b" },
    { name: "4 Days", value: 5, color: "#f43f5e" },
    { name: "5+ Days", value: 2, color: "#f43f5e" },
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
            innerRadius={40}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
              return [`${value}%`, `${name} Delivery Time`];
            }}
          />
          <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
