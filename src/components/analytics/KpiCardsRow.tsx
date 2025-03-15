
import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardsRowProps {
  dateRange: DateRange | undefined;
}

export function KpiCardsRow({ dateRange }: KpiCardsRowProps) {
  // In a real application, you would fetch this data from an API
  // based on the selected date range
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KpiCard 
        title="Cost per Shipment"
        value="$24.82"
        trend="down"
        trendValue="-3%"
        description="3% lower than previous period"
        icon={<div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-500">💵</div>}
      />
      
      <KpiCard 
        title="On-Time Delivery"
        value="94.7%"
        trend="up"
        trendValue="+1.5%"
        description="1.5% improvement over last month"
        icon={<div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center text-green-500">⏱️</div>}
      />
      
      <KpiCard 
        title="Transit Time (avg)"
        value="2.1 days"
        trend="down"
        trendValue="-0.2"
        description="0.2 days faster than last month"
        icon={<div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center text-purple-500">🚚</div>}
      />
      
      <KpiCard 
        title="DIFOT Rate"
        value="92.3%"
        trend="down"
        trendValue="-0.8%"
        description="0.8% below target of 93.1%"
        icon={<div className="h-8 w-8 rounded-md bg-amber-100 flex items-center justify-center text-amber-500">📊</div>}
      />
      
      <KpiCard 
        title="Return Rate"
        value="3.2%"
        trend="down"
        trendValue="-0.5%"
        description="0.5% lower than previous period"
        icon={<div className="h-8 w-8 rounded-md bg-red-100 flex items-center justify-center text-red-500">↩️</div>}
      />
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  description: string;
  icon: React.ReactNode;
}

function KpiCard({ title, value, trend, trendValue, description, icon }: KpiCardProps) {
  const isTrendPositive = (trend === "up" && !title.includes("Return")) || 
                           (trend === "down" && title.includes("Return") || 
                           title.includes("Cost") || 
                           title.includes("Transit"));
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h2 className="text-2xl font-bold mt-1">{value}</h2>
          </div>
          {icon}
        </div>
        
        <div className="flex items-center mt-2">
          {trend === "up" && (
            <TrendingUp 
              size={16} 
              className={isTrendPositive ? "text-emerald-500 mr-1" : "text-rose-500 mr-1"} 
            />
          )}
          {trend === "down" && (
            <TrendingDown 
              size={16} 
              className={isTrendPositive ? "text-emerald-500 mr-1" : "text-rose-500 mr-1"} 
            />
          )}
          <span className={`text-xs font-medium ${isTrendPositive ? "text-emerald-500" : "text-rose-500"} mr-1`}>
            {trendValue}
          </span>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
