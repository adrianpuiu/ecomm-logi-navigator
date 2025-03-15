
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
import { ChevronDown, ChevronUp, Calendar, Clock, Package, Truck, Info, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface ShipmentDetailsSectionProps {
  shipment: ShipmentType;
}

export function ShipmentDetailsSection({ shipment }: ShipmentDetailsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package size={18} className="text-primary" />
              <CardTitle className="text-xl">Shipment Details</CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CardDescription>
            Essential information about this shipment
          </CardDescription>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 text-muted-foreground">
                    <Calendar size={14} /> Date Information
                  </h4>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Created:</span>
                      <span className="text-sm font-medium">{formatDate(shipment.createdAt)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Expected Delivery:</span>
                      <span className="text-sm font-medium">{formatDate(shipment.expectedDelivery)}</span>
                    </div>
                    {shipment.actualDelivery && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Actual Delivery:</span>
                        <span className="text-sm font-medium">{formatDate(shipment.actualDelivery)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 text-muted-foreground">
                    <Truck size={14} /> Carrier & Service
                  </h4>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Carrier:</span>
                      <span className="text-sm font-medium">{shipment.carrier.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tracking Number:</span>
                      <span className="text-sm font-medium">{shipment.carrier.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Service Level:</span>
                      <span className="text-sm font-medium">{shipment.carrier.serviceLevel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Shipping Method:</span>
                      <Badge variant="outline" className="font-normal capitalize">
                        {shipment.shippingMethod}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-1 text-muted-foreground">
                    <Package size={14} /> Package Details
                  </h4>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weight:</span>
                      <span className="text-sm font-medium">
                        {shipment.weight.value} {shipment.weight.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dimensions:</span>
                      <span className="text-sm font-medium">
                        {shipment.dimensions.length} × {shipment.dimensions.width} × {shipment.dimensions.height} {shipment.dimensions.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Declared Value:</span>
                      <span className="text-sm font-medium">
                        {shipment.declaredValue.currency} {shipment.declaredValue.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {shipment.specialInstructions && (
              <div className="mt-6 bg-muted p-3 rounded-md">
                <h4 className="text-sm font-medium flex items-center gap-1 text-muted-foreground mb-1">
                  <Info size={14} /> Special Instructions
                </h4>
                <p className="text-sm">{shipment.specialInstructions}</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
