
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { DollarSign, CreditCard, Tag, Shield, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShipmentFinancialsSectionProps {
  shipment: ShipmentType;
}

export function ShipmentFinancialsSection({ shipment }: ShipmentFinancialsSectionProps) {
  const { financials } = shipment;
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="shadow-sm overflow-hidden border border-border/40 bg-gradient-to-br from-card to-background">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4 bg-card border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign size={16} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Financial Details</CardTitle>
                <CardDescription className="text-xs">
                  Cost breakdown for this shipment
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
            <div className="space-y-6">
              <div className="rounded-lg bg-card overflow-hidden border border-border/30">
                <div className="bg-muted/30 px-4 py-3 border-b border-border/30">
                  <h4 className="font-medium flex items-center gap-1.5">
                    <CreditCard size={14} className="text-primary" />
                    Cost Summary
                  </h4>
                </div>
                
                <div className="divide-y">
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <Tag size={14} className="text-muted-foreground" />
                      <span>Shipping Cost</span>
                    </div>
                    <span className="font-medium">
                      {financials.currency} {financials.shippingCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield size={14} className="text-muted-foreground" />
                      <span>Insurance</span>
                    </div>
                    <span className="font-medium">
                      {financials.currency} {financials.insuranceCost.toFixed(2)}
                    </span>
                  </div>
                  
                  {financials.additionalFees.length > 0 && (
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <PlusCircle size={14} className="text-muted-foreground" />
                        <span>Additional Fees</span>
                      </div>
                      <div className="space-y-2 pl-6">
                        {financials.additionalFees.map((fee, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{fee.name}</span>
                            <span>{financials.currency} {fee.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="px-4 py-3 bg-muted/20 flex justify-between items-center">
                    <span className="font-medium">Total Cost</span>
                    <span className="text-lg font-bold">
                      {financials.currency} {financials.totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground bg-muted/20 p-4 rounded-md">
                <p>
                  All costs are calculated based on negotiated carrier rates and any applicable 
                  surcharges. Insurance costs are determined by the declared value of the shipment.
                </p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
