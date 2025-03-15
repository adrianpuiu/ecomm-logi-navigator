
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
import { ChevronDown, ChevronUp, ShoppingBag, AlertCircle, Tag, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface ShipmentItemsSectionProps {
  shipment: ShipmentType;
}

export function ShipmentItemsSection({ shipment }: ShipmentItemsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="shadow-sm overflow-hidden border border-border/40 bg-gradient-to-br from-card to-background">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4 bg-card border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag size={16} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Package Contents</CardTitle>
                <CardDescription className="text-xs">
                  {shipment.items.length} {shipment.items.length === 1 ? 'item' : 'items'} in this shipment
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
            <div className="rounded-lg border overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipment.items.map((item) => (
                      <TableRow key={item.id} className="group hover:bg-muted/20 transition-colors">
                        <TableCell>
                          <div className="h-12 w-12 rounded-md border bg-background flex items-center justify-center overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            {item.handlingInstructions && (
                              <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                                <AlertCircle size={12} />
                                <p>{item.handlingInstructions}</p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Tag size={12} className="text-muted-foreground" />
                            <span className="font-mono text-xs">{item.sku}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="inline-flex items-center justify-center h-6 min-w-[24px] px-2 rounded-full bg-primary/10 text-xs font-medium">
                            {item.quantity}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.unitPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <div className="w-full max-w-xs space-y-2 bg-card p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Subtotal:</span>
                  <span className="font-medium">
                    ${shipment.items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Total Items:</span>
                  <span>{shipment.items.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Total SKUs:</span>
                  <span>{shipment.items.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
