
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
  ReferenceLine,
  Cell
} from "recharts";

interface CarrierPerformanceChartProps {
  dateRange: DateRange;
}

export function CarrierPerformanceChart({ dateRange }: CarrierPerformanceChartProps) {
  // Mock data - in a real app, this would be fetched based on the date range
  const data = [
    { name: "FastShip", score: 94, color: "#10b981" },
    { name: "Premier", score: 87, color: "#10b981" },
    { name: "Reliable", score: 91, color: "#10b981" },
    { name: "Swift", score: 85, color: "#f59e0b" },
    { name: "Global", score: 79, color: "#f43f5e" },
  ];

  // Calculate colors based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#10b981";
    if (score >= 85) return "#f59e0b";
    return "#f43f5e";
  };

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            tick={{ fontSize: 12 }} 
            axisLine={{ strokeOpacity: 0.2 }} 
            tickLine={{ strokeOpacity: 0.2 }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fontSize: 12 }} 
            axisLine={{ strokeOpacity: 0.2 }} 
            tickLine={{ strokeOpacity: 0.2 }}
            width={60}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Performance Score']}
          />
          <ReferenceLine x={85} stroke="#f59e0b" strokeDasharray="3 3" />
          <ReferenceLine x={90} stroke="#10b981" strokeDasharray="3 3" />
          <Bar 
            dataKey="score" 
            name="Performance Score" 
            barSize={15}
            radius={[0, 4, 4, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
