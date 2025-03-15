
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface ShipmentFinancialsSectionProps {
  shipment: ShipmentType;
}

export function ShipmentFinancialsSection({ shipment }: ShipmentFinancialsSectionProps) {
  const { financials } = shipment;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="px-6 py-4">
        <div className="flex items-center gap-2">
          <DollarSign size={18} className="text-primary" />
          <CardTitle className="text-xl">Financial Details</CardTitle>
        </div>
        <CardDescription>
          Cost breakdown for this shipment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        <div className="space-y-6">
          <div className="bg-card border rounded-md">
            <div className="border-b p-3">
              <h4 className="font-medium">Cost Summary</h4>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping Cost</span>
                <span className="font-medium">
                  {financials.currency} {financials.shippingCost.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Insurance</span>
                <span className="font-medium">
                  {financials.currency} {financials.insuranceCost.toFixed(2)}
                </span>
              </div>
              
              {financials.additionalFees.length > 0 && (
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Additional Fees</div>
                  {financials.additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center text-sm pl-4 mb-1">
                      <span>{fee.name}</span>
                      <span>{financials.currency} {fee.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="pt-3 border-t flex justify-between items-center font-medium">
                <span>Total Cost</span>
                <span className="text-lg">
                  {financials.currency} {financials.totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>
              All costs are calculated based on negotiated carrier rates and any applicable 
              surcharges. Insurance costs are determined by the declared value of the shipment.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
