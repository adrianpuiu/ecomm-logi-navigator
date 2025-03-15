
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  History, 
  User, 
  ServerCrash,
  Filter,
  Download,
  Calendar
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShipmentHistorySectionProps {
  shipment: ShipmentType;
}

export function ShipmentHistorySection({ shipment }: ShipmentHistorySectionProps) {
  const [filterType, setFilterType] = useState<string>("all");
  
  const filteredEvents = filterType === "all" 
    ? [...shipment.events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    : [...shipment.events]
        .filter(event => event.type === filterType)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const handleExportHistory = () => {
    // In a real application, this would generate a CSV or PDF of the history
    alert("Export functionality would be implemented here");
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-primary" />
            <CardTitle className="text-xl">History & Logs</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px] h-8">
                <Filter size={14} className="mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="user">User Actions</SelectItem>
                <SelectItem value="system">System Events</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExportHistory}>
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
        <CardDescription>
          Complete audit trail of shipment activity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        <div className="mb-4 bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span className="text-sm font-medium">Shipment Timeline Summary</span>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-md p-2">
              <div className="text-xs text-muted-foreground">Created</div>
              <div className="font-medium">{formatDate(shipment.createdAt)}</div>
            </div>
            <div className="bg-white rounded-md p-2">
              <div className="text-xs text-muted-foreground">Status Changed</div>
              <div className="font-medium">{formatDate(filteredEvents[0]?.timestamp || "")}</div>
            </div>
            <div className="bg-white rounded-md p-2">
              <div className="text-xs text-muted-foreground">Expected Delivery</div>
              <div className="font-medium">{formatDate(shipment.expectedDelivery)}</div>
            </div>
            <div className="bg-white rounded-md p-2">
              <div className="text-xs text-muted-foreground">Actual Delivery</div>
              <div className="font-medium">{shipment.actualDelivery ? formatDate(shipment.actualDelivery) : "Pending"}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No history records found for the selected filter
            </div>
          ) : (
            filteredEvents.map((event, index) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
