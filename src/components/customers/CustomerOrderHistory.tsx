
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  items: number;
  total: number;
  trackingNumber?: string;
}

interface CustomerOrderHistoryProps {
  customerId: string;
}

export function CustomerOrderHistory({ customerId }: CustomerOrderHistoryProps) {
  const navigate = useNavigate();
  
  // Mock data for customer orders
  const mockOrders: Order[] = [
    {
      id: "o1",
      orderNumber: "ORD-12345",
      date: "2023-05-15",
      status: "delivered",
      items: 3,
      total: 129.99,
      trackingNumber: "TRK-9876543"
    },
    {
      id: "o2",
      orderNumber: "ORD-12346",
      date: "2023-06-22",
      status: "shipped",
      items: 1,
      total: 49.99,
      trackingNumber: "TRK-9876544"
    },
    {
      id: "o3",
      orderNumber: "ORD-12347",
      date: "2023-07-10",
      status: "processing",
      items: 2,
      total: 89.98
    },
    {
      id: "o4",
      orderNumber: "ORD-12348",
      date: "2023-08-05",
      status: "cancelled",
      items: 4,
      total: 199.96
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Shipped</Badge>;
      case "processing":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Processing</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{formatDate(new Date(order.date))}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.trackingNumber ? order.trackingNumber : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/shipment/${order.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
