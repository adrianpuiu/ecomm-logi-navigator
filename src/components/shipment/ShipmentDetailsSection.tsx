
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
import { Calendar, Package, Truck, Info, ChevronUp, ChevronDown, Weight, Ruler, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ShipmentDetailsSectionProps {
  shipment: ShipmentType;
}

export function ShipmentDetailsSection({ shipment }: ShipmentDetailsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="shadow-sm overflow-hidden border border-border/40 bg-gradient-to-br from-card to-background">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4 bg-card border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Package size={16} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Shipment Details</CardTitle>
                <CardDescription className="text-xs">
                  Essential information about this shipment
                </CardDescription>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="px-6 py-5">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Calendar size={14} />
                  <span>Date Information</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">Created</div>
                    <div className="font-medium">{formatDate(shipment.createdAt)}</div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">Expected Delivery</div>
                    <div className="font-medium">{formatDate(shipment.expectedDelivery)}</div>
                  </div>
                  
                  {shipment.actualDelivery && (
                    <div className="p-3 rounded-md bg-card border border-border/30">
                      <div className="text-xs text-muted-foreground mb-1">Actual Delivery</div>
                      <div className="font-medium">{formatDate(shipment.actualDelivery)}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Truck size={14} />
                  <span>Carrier & Service</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">Carrier</div>
                    <div className="font-medium">{shipment.carrier.name}</div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">Tracking Number</div>
                    <div className="font-medium font-mono text-xs">{shipment.carrier.trackingNumber}</div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">Service Level</div>
                    <div className="font-medium">{shipment.carrier.serviceLevel}</div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">Shipping Method</div>
                    <Badge variant="outline" className="font-normal capitalize">
                      {shipment.shippingMethod}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <div className="flex items-center gap-2">
                    <Package size={14} />
                    <span>Package Details</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Weight size={12} />
                      <span>Weight</span>
                    </div>
                    <div className="font-medium">
                      {shipment.weight.value} {shipment.weight.unit}
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Ruler size={12} />
                      <span>Dimensions</span>
                    </div>
                    <div className="font-medium">
                      {shipment.dimensions.length} × {shipment.dimensions.width} × {shipment.dimensions.height} {shipment.dimensions.unit}
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-card border border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <CreditCard size={12} />
                      <span>Declared Value</span>
                    </div>
                    <div className="font-medium">
                      {shipment.declaredValue.currency} {shipment.declaredValue.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              
              {shipment.specialInstructions && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <Info size={14} />
                      <span>Special Instructions</span>
                    </div>
                    <div className="px-4 py-3 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
                      <p className="text-sm">{shipment.specialInstructions}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
