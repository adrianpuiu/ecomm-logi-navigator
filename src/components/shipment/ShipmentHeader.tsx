
import { ShipmentType } from "@/types/shipment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Printer, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  created: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  picked_up: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  in_transit: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  out_for_delivery: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  delayed: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  exception: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  returned: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300"
};

const statusText: Record<string, string> = {
  created: "Created",
  processing: "Processing",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  out_for_delivery: "Out For Delivery",
  delivered: "Delivered",
  delayed: "Delayed",
  exception: "Exception",
  cancelled: "Cancelled",
  returned: "Returned"
};

interface ShipmentHeaderProps {
  shipment: ShipmentType;
}

export function ShipmentHeader({ shipment }: ShipmentHeaderProps) {
  const { toast } = useToast();

  const handlePrintLabel = () => {
    toast({
      title: "Generating Shipping Label",
      description: "Preparing to print label for " + shipment.id
    });
  };

  const handleCancelShipment = () => {
    toast({
      variant: "destructive",
      title: "Cannot Cancel Shipment",
      description: "This shipment is already in transit and cannot be cancelled."
    });
  };

  const canCancel = ["created", "processing"].includes(shipment.status);

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Shipment {shipment.id}</h1>
            <Badge className={statusColors[shipment.status]}>
              {shipment.status === "delayed" && <AlertCircle className="h-3 w-3 mr-1" />}
              {statusText[shipment.status]}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Order: <span className="font-medium">{shipment.orderId}</span> • 
            Carrier: <span className="font-medium">{shipment.carrier.name}</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintLabel}>
            <Printer size={16} className="mr-1" />
            Print Label
          </Button>
          <Button variant="outline" size="sm">
            <FileText size={16} className="mr-1" />
            Export
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            disabled={!canCancel}
            onClick={handleCancelShipment}
          >
            <AlertCircle size={16} className="mr-1" />
            Cancel Shipment
          </Button>
        </div>
      </div>
    </div>
  );
}
