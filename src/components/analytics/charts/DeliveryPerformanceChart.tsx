
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
  Area,
  ComposedChart
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface DeliveryPerformanceChartProps {
  dateRange: DateRange | undefined;
}

export function DeliveryPerformanceChart({ dateRange }: DeliveryPerformanceChartProps) {
  // This would typically come from an API based on the date range
  const data = [
    { week: "Week 1", ontime: 92, delayed: 8, sla: 95 },
    { week: "Week 2", ontime: 94, delayed: 6, sla: 95 },
    { week: "Week 3", ontime: 91, delayed: 9, sla: 95 },
    { week: "Week 4", ontime: 88, delayed: 12, sla: 95 },
    { week: "Week 5", ontime: 93, delayed: 7, sla: 95 },
    { week: "Week 6", ontime: 95, delayed: 5, sla: 95 },
    { week: "Week 7", ontime: 97, delayed: 3, sla: 95 },
    { week: "Week 8", ontime: 96, delayed: 4, sla: 95 },
  ];

  const config = {
    ontime: {
      label: "On-Time Deliveries",
      color: "hsl(120, 70%, 45%)"
    },
    delayed: {
      label: "Delayed Deliveries",
      color: "hsl(0, 80%, 60%)"
    },
    sla: {
      label: "SLA Target",
      color: "hsl(210, 90%, 50%)"
    }
  };

  return (
    <div className="h-[300px]">
      <ChartContainer config={config} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
            />
            <YAxis 
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
              domain={[80, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Area type="monotone" dataKey="ontime" name="On-Time" fill="var(--color-ontime)" stroke="var(--color-ontime)" fillOpacity={0.3} />
            <Area type="monotone" dataKey="delayed" name="Delayed" fill="var(--color-delayed)" stroke="var(--color-delayed)" fillOpacity={0.3} />
            <Line type="monotone" dataKey="sla" name="SLA Target" stroke="var(--color-sla)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
