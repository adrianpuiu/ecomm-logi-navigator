
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Package, Truck, CheckCircle2, AlertCircle } from "lucide-react";

// Mock data for incoming orders
const MOCK_ORDERS = [
  {
    id: "ORD-23498",
    customer: "Emily Johnson",
    items: 3,
    orderValue: 89.97,
    address: "Musílkova 123, Prague 5, 15000",
    orderTime: "10:25 AM",
    requestedDelivery: "Today, 2-5 PM",
    status: "pending",
    source: "website"
  },
  {
    id: "ORD-23499",
    customer: "Martin Novák",
    items: 1,
    orderValue: 149.99,
    address: "Pražského 45, Prague 3, 13000",
    orderTime: "10:28 AM",
    requestedDelivery: "Today, 3-6 PM",
    status: "processing",
    source: "mobile_app"
  },
  {
    id: "ORD-23500",
    customer: "Sophia Chen",
    items: 2,
    orderValue: 67.50,
    address: "Národní 8, Prague 1, 11000",
    orderTime: "10:30 AM",
    requestedDelivery: "Today, 5-8 PM",
    status: "pending",
    source: "website"
  },
  {
    id: "ORD-23501",
    customer: "Jan Svoboda",
    items: 4,
    orderValue: 125.45,
    address: "Vinohradská 78, Prague 2, 12000",
    orderTime: "10:35 AM",
    requestedDelivery: "Today, 4-7 PM",
    status: "pending",
    source: "marketplace"
  },
  {
    id: "ORD-23502",
    customer: "Eva Procházková",
    items: 2,
    orderValue: 56.80,
    address: "Budějovická 12, Prague 4, 14000",
    orderTime: "10:40 AM",
    requestedDelivery: "Today, 1-4 PM",
    status: "validation_error",
    source: "website"
  }
];

export function OrderIntegration() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [integration, setIntegration] = useState<string>("all");

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "processing" } : order
    ));
    
    toast({
      title: "Order Accepted",
      description: `Order ${orderId} accepted for same-day delivery processing.`,
    });
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "rejected" } : order
    ));
    
    toast({
      title: "Order Rejected",
      description: `Order ${orderId} rejected for same-day delivery.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>Connectivity with order sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>E-Commerce Platform</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Order Management System</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Warehouse Management System</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Marketplace Integration</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Order Flow Status</CardTitle>
            <CardDescription>Current order processing metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-500 flex items-center gap-2 mb-2">
                  <Package size={20} />
                  <span className="font-medium">Pending Orders</span>
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Ready for processing</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="text-amber-500 flex items-center gap-2 mb-2">
                  <Clock size={20} />
                  <span className="font-medium">Processing</span>
                </div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Currently in fulfillment</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-500 flex items-center gap-2 mb-2">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">Completed</span>
                </div>
                <div className="text-2xl font-bold">34</div>
                <div className="text-sm text-muted-foreground">Today's deliveries</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-red-500 flex items-center gap-2 mb-2">
                  <AlertCircle size={20} />
                  <span className="font-medium">Exceptions</span>
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Require attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Incoming Same-Day Orders</CardTitle>
              <CardDescription>New orders awaiting validation and processing</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={integration} onValueChange={setIntegration}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile_app">Mobile App</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">Refresh</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Delivery Window</TableHead>
                  <TableHead className="hidden md:table-cell">Order Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders
                  .filter(order => integration === "all" || order.source === integration)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>{order.customer}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {order.address}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.requestedDelivery}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{order.orderTime}</TableCell>
                      <TableCell>
                        {order.status === "pending" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Pending
                          </Badge>
                        )}
                        {order.status === "processing" && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Processing
                          </Badge>
                        )}
                        {order.status === "rejected" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Rejected
                          </Badge>
                        )}
                        {order.status === "validation_error" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Address Error
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {order.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAcceptOrder(order.id)}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => handleRejectOrder(order.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {order.status === "validation_error" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                            >
                              Fix Address
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
