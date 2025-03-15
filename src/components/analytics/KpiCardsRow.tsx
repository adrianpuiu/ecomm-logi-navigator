
import { DateRange } from "react-day-picker";
import { DashboardStatsCard } from "@/components/home/DashboardStatsCard";
import { 
  Truck, 
  CreditCard, 
  Clock, 
  Loader2, 
  RefreshCw
} from "lucide-react";

interface KpiCardsRowProps {
  dateRange: DateRange | undefined;
}

export function KpiCardsRow({ dateRange }: KpiCardsRowProps) {
  // In a real application, you would fetch this data from an API
  // based on the selected date range
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <DashboardStatsCard
        title="Cost per Shipment"
        value="$24.82"
        description="3% lower than previous period"
        trend="down"
        trendValue="-3%"
        icon={<CreditCard size={18} />}
        className="animate-scale-in"
      />
      <DashboardStatsCard
        title="On-Time Delivery"
        value="94.7%"
        description="1.5% improvement over last month"
        trend="up"
        trendValue="+1.5%"
        icon={<Clock size={18} />}
        className="animate-scale-in animation-delay-100"
      />
      <DashboardStatsCard
        title="Transit Time (avg)"
        value="2.1 days"
        description="0.2 days faster than last month"
        trend="down"
        trendValue="-9.5%"
        icon={<Truck size={18} />}
        className="animate-scale-in animation-delay-200"
      />
      <DashboardStatsCard
        title="DIFOT Rate"
        value="92.3%"
        description="0.8% below target of 93.1%"
        trend="down"
        trendValue="-0.8%"
        icon={<Loader2 size={18} />}
        className="animate-scale-in animation-delay-300"
      />
      <DashboardStatsCard
        title="Return Rate"
        value="3.2%"
        description="0.5% lower than previous period"
        trend="down"
        trendValue="-13.5%"
        icon={<RefreshCw size={18} />}
        className="animate-scale-in animation-delay-400"
      />
    </div>
  );
}
