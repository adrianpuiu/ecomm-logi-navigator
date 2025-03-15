
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";

interface DashboardStatsCardProps {
  title: string;
  value: string;
  description: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardStatsCard({
  title,
  value,
  description,
  trend = "neutral",
  trendValue,
  icon,
  className,
}: DashboardStatsCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
          </div>
          {icon && (
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-3">
          {trend === "up" && (
            <div className="flex items-center text-emerald-500 mr-2">
              <TrendingUp size={14} className="mr-1" />
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center text-rose-500 mr-2">
              <TrendingDown size={14} className="mr-1" />
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
