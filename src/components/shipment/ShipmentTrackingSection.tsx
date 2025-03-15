
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, MapPin, Truck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";

interface ShipmentTrackingSectionProps {
  shipment: ShipmentType;
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'delivered':
      return <CheckCircle size={16} className="text-green-600" />;
    case 'delayed':
    case 'exception':
      return <AlertCircle size={16} className="text-red-600" />;
    case 'in_transit':
    case 'out_for_delivery':
      return <Truck size={16} className="text-blue-600" />;
    default:
      return <Clock size={16} className="text-gray-600" />;
  }
}

export function ShipmentTrackingSection({ shipment }: ShipmentTrackingSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const sortedTrackingHistory = [...shipment.trackingHistory].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-primary" />
              <CardTitle className="text-xl">Tracking Information</CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CardDescription>
            Real-time shipment tracking updates
          </CardDescription>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="px-6 pb-4">
            <div className="flex flex-col">
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="font-medium">Current Location</span>
                </div>
                <p className="text-sm">
                  {sortedTrackingHistory[0]?.location || "Unknown"}
                </p>
                <div className="text-xs text-muted-foreground mt-1">
                  Last updated: {formatDate(sortedTrackingHistory[0]?.timestamp || "")}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1 bottom-0 w-0.5 bg-muted" />
                
                {sortedTrackingHistory.map((event, index) => (
                  <div key={index} className="flex gap-4 mb-4 relative">
                    <div className="z-10 mt-1">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        index === 0 ? "bg-primary" : "bg-muted-foreground/20"
                      )}>
                        {getStatusIcon(event.status)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="p-3 bg-card rounded-md border">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <span className="font-medium capitalize">
                            {event.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(event.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{event.description}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
