
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { History, User, ServerCrash } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ShipmentHistorySectionProps {
  shipment: ShipmentType;
}

export function ShipmentHistorySection({ shipment }: ShipmentHistorySectionProps) {
  const sortedEvents = [...shipment.events].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="px-6 py-4">
        <div className="flex items-center gap-2">
          <History size={18} className="text-primary" />
          <CardTitle className="text-xl">History & Logs</CardTitle>
        </div>
        <CardDescription>
          Complete audit trail of shipment activity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
              <div className="mt-1">
                {event.type === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <ServerCrash size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <p className="font-medium text-sm">
                    {event.description}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(event.timestamp)}
                  </span>
                </div>
                
                <div className="mt-1 text-xs text-muted-foreground">
                  {event.type === "user" ? (
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{event.user}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <ServerCrash size={12} />
                      <span>System</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {sortedEvents.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No history records found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
