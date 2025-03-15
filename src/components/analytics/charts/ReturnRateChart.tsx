
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

interface ReturnRateChartProps {
  dateRange: DateRange;
}

export function ReturnRateChart({ dateRange }: ReturnRateChartProps) {
  // Mock data - in a real app, this would be fetched based on the date range
  const data = [
    { month: "Jan", rate: 4.2 },
    { month: "Feb", rate: 3.9 },
    { month: "Mar", rate: 3.5 },
    { month: "Apr", rate: 4.0 },
    { month: "May", rate: 3.8 },
    { month: "Jun", rate: 3.3 },
    { month: "Jul", rate: 3.1 },
    { month: "Aug", rate: 3.2 },
    { month: "Sep", rate: 3.0 },
    { month: "Oct", rate: 3.2 },
    { month: "Nov", rate: 3.5 },
    { month: "Dec", rate: 3.7 },
  ];

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }} 
            axisLine={{ strokeOpacity: 0.2 }} 
            tickLine={{ strokeOpacity: 0.2 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={{ strokeOpacity: 0.2 }} 
            tickLine={{ strokeOpacity: 0.2 }}
            domain={[0, 5]}
            tickCount={6}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Return Rate']}
          />
          <Legend iconType="circle" />
          <ReferenceLine y={3.5} stroke="#f59e0b" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#f43f5e" 
            name="Return Rate" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
