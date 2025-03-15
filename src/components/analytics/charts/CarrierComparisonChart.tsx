
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
  LabelList,
  ReferenceLine
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface CarrierComparisonChartProps {
  dateRange: DateRange | undefined;
}

export function CarrierComparisonChart({ dateRange }: CarrierComparisonChartProps) {
  // This would typically come from an API based on the date range
  const data = [
    { 
      carrier: "FedEx", 
      onTimeRate: 94.5, 
      transitTime: 2.1, 
      costPerPackage: 24.75,
      exceptionRate: 2.8
    },
    { 
      carrier: "UPS", 
      onTimeRate: 92.8, 
      transitTime: 2.3, 
      costPerPackage: 23.90,
      exceptionRate: 3.2
    },
    { 
      carrier: "DHL", 
      onTimeRate: 91.2, 
      transitTime: 2.6, 
      costPerPackage: 25.80,
      exceptionRate: 3.5
    },
    { 
      carrier: "USPS", 
      onTimeRate: 88.5, 
      transitTime: 3.0, 
      costPerPackage: 19.50,
      exceptionRate: 4.1
    },
    { 
      carrier: "Regional", 
      onTimeRate: 95.2, 
      transitTime: 1.8, 
      costPerPackage: 22.30,
      exceptionRate: 2.2
    },
  ];

  const config = {
    onTimeRate: {
      label: "On-Time Delivery Rate (%)",
      color: "hsl(120, 70%, 45%)"
    },
    transitTime: {
      label: "Avg. Transit Time (days)",
      color: "hsl(210, 80%, 55%)"
    },
    exceptionRate: {
      label: "Exception Rate (%)",
      color: "hsl(0, 80%, 60%)"
    }
  };

  return (
    <div className="h-[300px]">
      <ChartContainer config={config} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.2} />
            <XAxis 
              type="number"
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
              domain={[80, 100]}
            />
            <YAxis 
              dataKey="carrier"
              type="category"
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
              width={80}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar 
              dataKey="onTimeRate" 
              name="On-Time Rate" 
              fill="var(--color-onTimeRate)" 
              background={{ fill: '#eee' }}
              radius={[0, 4, 4, 0]}
            >
              <LabelList dataKey="onTimeRate" position="right" formatter={(value: number) => `${value}%`} />
            </Bar>
            <ReferenceLine x={90} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
