
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DollarSign, 
  CreditCard, 
  Tag, 
  Shield, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  Receipt, 
  Sparkles,
  Percent,
  BadgePercent
} from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ShipmentFinancialsSectionProps {
  shipment: ShipmentType;
}

export function ShipmentFinancialsSection({ shipment }: ShipmentFinancialsSectionProps) {
  const { financials } = shipment;
  const [isOpen, setIsOpen] = useState(true);
  
  // Calculate savings percentage if possible
  const totalAddons = financials.additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
  const baseCost = financials.shippingCost + financials.insuranceCost;
  
  return (
    <Card className="shadow-md overflow-hidden border border-indigo-100/40 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-slate-800/60">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent border-b border-indigo-100/30 dark:border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <DollarSign size={18} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Financial Summary</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed cost breakdown for this shipment
                </CardDescription>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent className="animate-fade-in">
          <CardContent className="px-6 py-5">
            <div className="space-y-6">
              <div className="rounded-xl bg-white dark:bg-slate-900/70 overflow-hidden border border-indigo-100/50 dark:border-slate-700/50 shadow-sm">
                <div className="bg-gradient-to-r from-indigo-50/80 to-blue-50/50 dark:from-indigo-950/30 dark:to-slate-800/30 px-4 py-3 border-b border-indigo-100/30 dark:border-slate-700/50">
                  <h4 className="font-medium flex items-center gap-2 text-slate-800 dark:text-slate-100">
                    <Receipt size={16} className="text-indigo-600 dark:text-indigo-400" />
                    Cost Breakdown
                  </h4>
                </div>
                
                <div className="divide-y divide-indigo-100/30 dark:divide-slate-700/30">
                  <div className="px-4 py-3.5 flex justify-between items-center transition-colors hover:bg-indigo-50/30 dark:hover:bg-slate-800/30">
                    <div className="flex items-center gap-2.5 text-sm">
                      <Tag size={16} className="text-blue-500 dark:text-blue-400" />
                      <span className="text-slate-700 dark:text-slate-300">Base Shipping Cost</span>
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {financials.currency} {financials.shippingCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="px-4 py-3.5 flex justify-between items-center transition-colors hover:bg-indigo-50/30 dark:hover:bg-slate-800/30">
                    <div className="flex items-center gap-2.5 text-sm">
                      <Shield size={16} className="text-green-500 dark:text-green-400" />
                      <span className="text-slate-700 dark:text-slate-300">Insurance Premium</span>
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {financials.currency} {financials.insuranceCost.toFixed(2)}
                    </span>
                  </div>
                  
                  {financials.additionalFees.length > 0 && (
                    <div className="px-4 py-3.5 hover:bg-indigo-50/30 dark:hover:bg-slate-800/30">
                      <div className="flex items-center gap-2.5 text-sm mb-2">
                        <PlusCircle size={16} className="text-orange-500 dark:text-orange-400" />
                        <span className="text-slate-700 dark:text-slate-300">Additional Fees</span>
                      </div>
                      <div className="space-y-2.5 pl-7">
                        {financials.additionalFees.map((fee, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400 flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 dark:bg-indigo-500 mr-2"></span>
                              {fee.name}
                            </span>
                            <span className="text-slate-700 dark:text-slate-300">{financials.currency} {fee.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="px-4 py-4 bg-gradient-to-r from-indigo-50/80 to-blue-50/70 dark:from-indigo-950/50 dark:to-slate-800/50 flex justify-between items-center">
                    <span className="font-medium text-slate-700 dark:text-slate-200">Total Cost</span>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
                        {financials.currency} {financials.totalCost.toFixed(2)}
                      </span>
                      {totalAddons > 0 && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Base: {financials.currency} {baseCost.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[180px] bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-indigo-950/30 rounded-xl p-4 border border-blue-100/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgePercent size={18} className="text-blue-500 dark:text-blue-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Cost Savings</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12%</div>
                    <Badge variant="outline" className="bg-blue-100/50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50">
                      vs. Standard Rate
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 min-w-[180px] bg-gradient-to-br from-emerald-50 to-green-50/50 dark:from-slate-800 dark:to-emerald-950/30 rounded-xl p-4 border border-emerald-100/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard size={18} className="text-emerald-500 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Payment Status</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Completed</div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50">
                      Paid
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-sm bg-gradient-to-r from-amber-50/80 to-orange-50/50 dark:from-amber-950/20 dark:to-slate-800/30 p-4 rounded-xl border border-amber-100/50 dark:border-amber-900/30 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-amber-500 dark:text-amber-400" />
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    Rate Information
                  </p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 pl-6">
                  All costs are calculated based on negotiated carrier rates and applicable surcharges. 
                  Insurance costs are determined by the declared value of {financials.currency} {shipment.declaredValue.amount.toFixed(2)}.
                </p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
