
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, Eye, FileText, AlertTriangle } from "lucide-react";

type ShipmentStatus = "in_transit" | "delivered" | "processing" | "delayed";

interface Shipment {
  id: string;
  orderNumber: string;
  customer: string;
  origin: string;
  destination: string;
  carrier: string;
  status: ShipmentStatus;
  estimatedDelivery: string;
}

const mockShipments: Shipment[] = [
  {
    id: "SH7842",
    orderNumber: "ORD-38291",
    customer: "Tech Solutions Inc.",
    origin: "Los Angeles, CA",
    destination: "Seattle, WA",
    carrier: "FastShip Express",
    status: "in_transit",
    estimatedDelivery: "Oct 12, 2023"
  },
  {
    id: "SH7843",
    orderNumber: "ORD-38292",
    customer: "Global Retailers Co.",
    origin: "New York, NY",
    destination: "Boston, MA",
    carrier: "Premier Logistics",
    status: "processing",
    estimatedDelivery: "Oct 14, 2023"
  },
  {
    id: "SH7844",
    orderNumber: "ORD-38293",
    customer: "Eco Goods Ltd.",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    carrier: "FastShip Express",
    status: "delivered",
    estimatedDelivery: "Oct 10, 2023"
  },
  {
    id: "SH7845",
    orderNumber: "ORD-38294",
    customer: "Modern Furniture",
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    carrier: "Reliable Transport",
    status: "delayed",
    estimatedDelivery: "Oct 13, 2023"
  },
  {
    id: "SH7846",
    orderNumber: "ORD-38295",
    customer: "Fashion Forward",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    carrier: "FastShip Express",
    status: "in_transit",
    estimatedDelivery: "Oct 11, 2023"
  }
];

const statusColors: Record<ShipmentStatus, string> = {
  in_transit: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  delayed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const statusText: Record<ShipmentStatus, string> = {
  in_transit: "In Transit",
  delivered: "Delivered",
  processing: "Processing",
  delayed: "Delayed"
};

export function ShipmentsTable() {
  const [shipments] = useState<Shipment[]>(mockShipments);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Shipments</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Origin</TableHead>
                <TableHead className="hidden md:table-cell">Destination</TableHead>
                <TableHead className="hidden lg:table-cell">Carrier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Est. Delivery</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow 
                  key={shipment.id}
                  className="group animate-slide-in-bottom opacity-0"
                  style={{ 
                    animationDelay: `${shipments.indexOf(shipment) * 100}ms`, 
                    animationFillMode: "forwards" 
                  }}
                >
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{shipment.customer}</div>
                      <div className="text-xs text-muted-foreground">{shipment.orderNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.origin}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.destination}</TableCell>
                  <TableCell className="hidden lg:table-cell">{shipment.carrier}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[shipment.status]}>
                      {shipment.status === "delayed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {statusText[shipment.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.estimatedDelivery}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Documentation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
