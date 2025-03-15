
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
import { ChevronDown, ChevronUp, MapPin, Truck, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  const [viewMode, setViewMode] = useState<'timeline' | 'map'>('timeline');
  
  const sortedTrackingHistory = [...shipment.trackingHistory].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const statusColors = {
    created: "bg-purple-100 text-purple-800",
    processing: "bg-yellow-100 text-yellow-800",
    picked_up: "bg-indigo-100 text-indigo-800",
    in_transit: "bg-blue-100 text-blue-800",
    out_for_delivery: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    delayed: "bg-orange-100 text-orange-800",
    exception: "bg-red-100 text-red-800",
  };
  
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
            <div className="flex justify-end mb-4">
              <div className="flex space-x-2">
                <Button 
                  variant={viewMode === 'timeline' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                >
                  <Clock size={16} className="mr-1" /> Timeline
                </Button>
                <Button 
                  variant={viewMode === 'map' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <MapPin size={16} className="mr-1" /> Map View
                </Button>
              </div>
            </div>
            
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
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="bg-white rounded-md p-2 flex-1">
                    <div className="text-xs text-muted-foreground">Carrier</div>
                    <div className="font-medium">{shipment.carrier.name}</div>
                  </div>
                  <div className="bg-white rounded-md p-2 flex-1">
                    <div className="text-xs text-muted-foreground">Tracking #</div>
                    <div className="font-medium">{shipment.carrier.trackingNumber}</div>
                  </div>
                  <div className="bg-white rounded-md p-2 flex-1">
                    <div className="text-xs text-muted-foreground">Status</div>
                    <Badge className={cn(
                      "mt-1", 
                      statusColors[shipment.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                    )}>
                      {shipment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="bg-white rounded-md p-2 flex-1">
                    <div className="text-xs text-muted-foreground">Created</div>
                    <div className="font-medium">{formatDate(shipment.createdAt)}</div>
                  </div>
                  <div className="bg-white rounded-md p-2 flex-1">
                    <div className="text-xs text-muted-foreground">Expected Delivery</div>
                    <div className="font-medium">{formatDate(shipment.expectedDelivery)}</div>
                  </div>
                </div>
              </div>
              
              {viewMode === 'timeline' ? (
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
              ) : (
                <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Map view not available in demo mode</p>
                    <p className="text-xs text-muted-foreground">Integration with mapping service required</p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 bg-muted/50 p-4 rounded-lg">
                <div className="font-medium flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-primary" />
                  Delivery Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                    <div className="text-sm">{`${shipment.sender.address.street}, ${shipment.sender.address.city}, ${shipment.sender.address.state} ${shipment.sender.address.zipCode}`}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Destination</div>
                    <div className="text-sm">{`${shipment.recipient.address.street}, ${shipment.recipient.address.city}, ${shipment.recipient.address.state} ${shipment.recipient.address.zipCode}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
