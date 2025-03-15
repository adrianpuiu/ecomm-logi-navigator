
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TruckIcon, ArrowLeftRight, FileText, BarChart } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common logistics operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          <ActionButton 
            icon={<Package />} 
            label="New Shipment" 
            description="Create a new order" 
            onClick={() => console.log("New shipment")} 
            className="animate-slide-in-bottom opacity-0"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          />
          <ActionButton 
            icon={<TruckIcon />} 
            label="Track Order" 
            description="View shipment status" 
            onClick={() => console.log("Track order")} 
            className="animate-slide-in-bottom opacity-0"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          />
          <ActionButton 
            icon={<ArrowLeftRight />} 
            label="Return" 
            description="Process a return" 
            onClick={() => console.log("Return")} 
            className="animate-slide-in-bottom opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          />
          <ActionButton 
            icon={<FileText />} 
            label="Report" 
            description="Generate report" 
            onClick={() => console.log("Report")} 
            className="animate-slide-in-bottom opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          />
          <ActionButton 
            icon={<BarChart />} 
            label="Analytics" 
            description="View metrics" 
            onClick={() => console.log("Analytics")} 
            className="animate-slide-in-bottom opacity-0"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

function ActionButton({ icon, label, description, onClick, className, style }: ActionButtonProps) {
  return (
    <Button
      variant="outline"
      className={`h-auto flex flex-col items-center justify-center px-4 py-6 space-y-2 hover:bg-accent transition-all hover:shadow-sm hover:-translate-y-1 ${className}`}
      onClick={onClick}
      style={style}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-center">
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </Button>
  );
}
