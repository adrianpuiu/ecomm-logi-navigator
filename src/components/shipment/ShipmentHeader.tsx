
import { ShipmentType } from "@/types/shipment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Printer, AlertCircle, Package, ChevronRight, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const statusColors: Record<string, string> = {
  created: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300",
  processing: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300",
  picked_up: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-300",
  in_transit: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300",
  out_for_delivery: "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-300",
  delivered: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300",
  delayed: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300",
  exception: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300",
  cancelled: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300",
  returned: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900 dark:text-rose-300"
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

  const statusBg = statusColors[shipment.status] || "bg-gray-100 text-gray-800";

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 rounded-xl border shadow-sm animate-fade-in">
      <div className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 translate-y-16 -translate-x-16 bg-blue-500/5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package size={16} className="text-primary" />
                </div>
                <h1 className="text-2xl font-bold">Shipment {shipment.id}</h1>
              </div>
              
              <Badge className={`${statusBg} border px-3 py-1 font-medium text-xs`}>
                {shipment.status === "delayed" && <AlertCircle className="h-3 w-3 mr-1" />}
                {statusText[shipment.status]}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Order:</span>
                <a href={`/orders/${shipment.orderId}`} className="font-medium text-primary hover:underline flex items-center">
                  {shipment.orderId}
                  <ArrowUpRight size={12} className="ml-1" />
                </a>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Carrier:</span>
                <span className="font-medium">{shipment.carrier.name}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Tracking:</span>
                <a href={`https://example.com/track/${shipment.carrier.trackingNumber}`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline flex items-center">
                  {shipment.carrier.trackingNumber}
                  <ArrowUpRight size={12} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <Button variant="outline" size="sm" onClick={handlePrintLabel} className="h-9">
              <Printer size={15} className="mr-1.5" />
              Print Label
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <FileText size={15} className="mr-1.5" />
              Export
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              disabled={!canCancel}
              onClick={handleCancelShipment}
              className="h-9"
            >
              <AlertCircle size={15} className="mr-1.5" />
              Cancel Shipment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
