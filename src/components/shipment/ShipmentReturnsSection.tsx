
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ArrowLeft, 
  Box, 
  FileText, 
  RefreshCw 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

interface ShipmentReturnsSectionProps {
  shipment: ShipmentType;
}

const returnStatusColors: Record<string, string> = {
  requested: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  approved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  in_transit: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  received: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

export function ShipmentReturnsSection({ shipment }: ShipmentReturnsSectionProps) {
  // We check if return exists in the parent component but TypeScript still needs this check
  if (!shipment.return) return null;
  
  const returnInfo = shipment.return;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="px-6 py-4">
        <div className="flex items-center gap-2">
          <RefreshCw size={18} className="text-primary" />
          <CardTitle className="text-xl">Return Information</CardTitle>
        </div>
        <CardDescription>
          Details about the return request
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Return ID</div>
              <div className="font-medium">{returnInfo.id}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge className={returnStatusColors[returnInfo.status]}>
                {returnInfo.status.replace('_', ' ').charAt(0).toUpperCase() + returnInfo.status.replace('_', ' ').slice(1)}
              </Badge>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Requested On</div>
              <div>{formatDate(returnInfo.requestedAt)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Tracking Number</div>
              <div className="font-mono text-sm">{returnInfo.trackingNumber || "N/A"}</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Return Reason</h4>
            <div className="bg-muted p-3 rounded-md text-sm">
              {returnInfo.reason}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Return Items</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnInfo.returnItems.map((item) => {
                    const originalItem = shipment.items.find(i => i.id === item.itemId);
                    
                    return (
                      <TableRow key={item.itemId}>
                        <TableCell>
                          {originalItem?.name || `Item ${item.itemId}`}
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {returnInfo.refundAmount !== undefined && (
            <div>
              <h4 className="text-sm font-medium mb-2">Refund Information</h4>
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Refund Amount:</span>
                  <span className="text-sm font-medium">
                    ${returnInfo.refundAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
