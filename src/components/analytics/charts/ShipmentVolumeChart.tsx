
import { DateRange } from "react-day-picker";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

export interface ShipmentVolumeChartProps {
  dateRange: DateRange | undefined;
}

export function ShipmentVolumeChart({ dateRange }: ShipmentVolumeChartProps) {
  // Mock data - in a real app, this would be fetched based on the date range
  const data = [
    { date: "Jan 1", volume: 145, target: 150 },
    { date: "Jan 2", volume: 132, target: 150 },
    { date: "Jan 3", volume: 164, target: 150 },
    { date: "Jan 4", volume: 187, target: 150 },
    { date: "Jan 5", volume: 142, target: 150 },
    { date: "Jan 6", volume: 128, target: 150 },
    { date: "Jan 7", volume: 118, target: 150 },
    { date: "Jan 8", volume: 156, target: 150 },
    { date: "Jan 9", volume: 165, target: 150 },
    { date: "Jan 10", volume: 172, target: 150 },
    { date: "Jan 11", volume: 188, target: 150 },
    { date: "Jan 12", volume: 196, target: 150 },
    { date: "Jan 13", volume: 184, target: 150 },
    { date: "Jan 14", volume: 164, target: 150 },
  ];

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            axisLine={{ strokeOpacity: 0.2 }} 
            tickLine={{ strokeOpacity: 0.2 }} 
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={{ strokeOpacity: 0.2 }} 
            tickLine={{ strokeOpacity: 0.2 }}
            domain={[0, 'dataMax + 30']}
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
          <Legend iconType="circle" />
          <Bar 
            dataKey="volume" 
            fill="hsl(var(--primary))" 
            name="Shipment Volume" 
            barSize={20} 
            radius={[4, 4, 0, 0]}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#f59e0b" 
            name="Target Volume" 
            strokeWidth={2} 
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
