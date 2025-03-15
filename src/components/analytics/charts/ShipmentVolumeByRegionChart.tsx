
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
  ReferenceLine
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ShipmentVolumeByRegionChartProps {
  dateRange: DateRange | undefined;
}

export function ShipmentVolumeByRegionChart({ dateRange }: ShipmentVolumeByRegionChartProps) {
  // This would typically come from an API based on the date range
  const data = [
    { name: "North America", domestic: 120, international: 45, target: 170 },
    { name: "Europe", domestic: 80, international: 63, target: 150 },
    { name: "Asia", domestic: 95, international: 78, target: 180 },
    { name: "Australia", domestic: 35, international: 22, target: 60 },
    { name: "South America", domestic: 42, international: 28, target: 75 },
    { name: "Africa", domestic: 28, international: 15, target: 45 },
  ];

  const config = {
    domestic: {
      label: "Domestic Shipments",
      color: "hsl(215, 90%, 50%)"
    },
    international: {
      label: "International Shipments",
      color: "hsl(355, 90%, 60%)"
    },
    target: {
      label: "Target Volume",
      color: "hsl(45, 90%, 50%)"
    }
  };

  return (
    <div className="h-[300px]">
      <ChartContainer config={config} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
            />
            <YAxis 
              tick={{ fontSize: 11 }} 
              axisLine={{ strokeOpacity: 0.2 }} 
              tickLine={{ strokeOpacity: 0.2 }}
              domain={[0, 'dataMax + 20']}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="domestic" name="Domestic" stackId="a" fill="var(--color-domestic)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="international" name="International" stackId="a" fill="var(--color-international)" radius={[4, 4, 0, 0]} />
            {/* Fixed: Removed dataKey and using y instead for the ReferenceLine */}
            <ReferenceLine 
              yAxisId={0}
              y={data[0].target} 
              stroke="var(--color-target)" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              ifOverflow="extendDomain"
              label="Target"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
