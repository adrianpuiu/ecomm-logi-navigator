
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertCircle, 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Truck, 
  RefreshCw,
  Home,
  UserX
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for delivery exceptions
const MOCK_EXCEPTIONS = [
  {
    id: "DEL-5412",
    orderId: "ORD-23476",
    customer: "Kateřina Veselá",
    phone: "+420 777 123 456",
    deliveryWindow: "1:00 PM - 4:00 PM",
    address: "Korunovační 56, Prague 7, 17000",
    exceptionType: "customer_unavailable",
    status: "open",
    timestamp: "1:45 PM",
    driver: "Pavel Krejčí",
    notes: "Customer not answering the door or phone",
    priority: "high"
  },
  {
    id: "DEL-5418",
    orderId: "ORD-23489",
    customer: "Jan Novotný",
    phone: "+420 602 789 012",
    deliveryWindow: "2:00 PM - 5:00 PM",
    address: "Dejvická 24, Prague 6, 16000",
    exceptionType: "address_not_found",
    status: "open",
    timestamp: "2:15 PM",
    driver: "Jana Malá",
    notes: "Street number doesn't exist, need customer verification",
    priority: "high"
  },
  {
    id: "DEL-5421",
    orderId: "ORD-23492",
    customer: "Tomáš Svoboda",
    phone: "+420 731 456 789",
    deliveryWindow: "12:00 PM - 3:00 PM",
    address: "Hybernská 38, Prague 1, 11000",
    exceptionType: "access_issue",
    status: "open",
    timestamp: "12:40 PM",
    driver: "Karel Jančík",
    notes: "Cannot access building, security gate is locked",
    priority: "medium"
  },
  {
    id: "DEL-5410",
    orderId: "ORD-23470",
    customer: "Eva Králová",
    phone: "+420 608 321 654",
    deliveryWindow: "11:00 AM - 2:00 PM",
    address: "Křižíkova 72, Prague 8, 18000",
    exceptionType: "weather_delay",
    status: "in_progress",
    timestamp: "11:30 AM",
    driver: "Tomáš Horák",
    notes: "Heavy rain causing traffic delays, rescheduled for later today",
    priority: "medium"
  },
  {
    id: "DEL-5408",
    orderId: "ORD-23465",
    customer: "Martin Procházka",
    phone: "+420 775 987 654",
    deliveryWindow: "10:00 AM - 1:00 PM",
    address: "Bubenská 5, Prague 7, 17000",
    exceptionType: "damaged_package",
    status: "in_progress",
    timestamp: "10:20 AM",
    driver: "Martin Kos",
    notes: "Package damaged during transit, customer notified and approved delivery",
    priority: "low"
  },
  {
    id: "DEL-5397",
    orderId: "ORD-23442",
    customer: "Lucie Dvořáková",
    phone: "+420 605 111 222",
    deliveryWindow: "9:00 AM - 12:00 PM",
    address: "Lublaňská 48, Prague 2, 12000",
    exceptionType: "customer_unavailable",
    status: "resolved",
    timestamp: "9:45 AM",
    driver: "Pavel Krejčí",
    notes: "Delivered to neighbor with customer's permission",
    resolution: "neighbor_delivery",
    priority: "high"
  },
  {
    id: "DEL-5402",
    orderId: "ORD-23450",
    customer: "Petr Novák",
    phone: "+420 773 333 444",
    deliveryWindow: "10:00 AM - 1:00 PM",
    address: "Slezská 103, Prague 3, 13000",
    exceptionType: "address_not_found",
    status: "resolved",
    timestamp: "10:50 AM",
    driver: "Jana Malá",
    notes: "Customer provided corrected address",
    resolution: "address_corrected",
    priority: "high"
  }
];

// Exception type definitions
const exceptionTypeMap: Record<string, { icon: React.ReactNode, label: string, color: string }> = {
  customer_unavailable: { 
    icon: <UserX size={16} />, 
    label: "Customer Unavailable", 
    color: "bg-red-100 text-red-800" 
  },
  address_not_found: { 
    icon: <MapPin size={16} />, 
    label: "Address Not Found", 
    color: "bg-orange-100 text-orange-800" 
  },
  access_issue: { 
    icon: <Home size={16} />, 
    label: "Access Issue", 
    color: "bg-amber-100 text-amber-800" 
  },
  weather_delay: { 
    icon: <AlertCircle size={16} />, 
    label: "Weather Delay", 
    color: "bg-blue-100 text-blue-800" 
  },
  damaged_package: { 
    icon: <AlertCircle size={16} />, 
    label: "Damaged Package", 
    color: "bg-purple-100 text-purple-800" 
  }
};

// Resolution type definitions
const resolutionTypeMap: Record<string, { label: string }> = {
  neighbor_delivery: { 
    label: "Delivered to neighbor"
  },
  address_corrected: { 
    label: "Address corrected" 
  },
  rescheduled: { 
    label: "Rescheduled"
  },
  returned: { 
    label: "Returned to warehouse"
  }
};

// Types
interface DeliveryException {
  id: string;
  orderId: string;
  customer: string;
  phone: string;
  deliveryWindow: string;
  address: string;
  exceptionType: string;
  status: "open" | "in_progress" | "resolved";
  timestamp: string;
  driver: string;
  notes: string;
  priority: "low" | "medium" | "high";
  resolution?: string;
}

export function DeliveryExceptions() {
  const { toast } = useToast();
  const [exceptions, setExceptions] = useState<DeliveryException[]>(MOCK_EXCEPTIONS);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedException, setSelectedException] = useState<DeliveryException | null>(null);
  
  const filteredExceptions = exceptions.filter(exception => {
    if (activeTab === "open") return exception.status === "open";
    if (activeTab === "in_progress") return exception.status === "in_progress";
    if (activeTab === "resolved") return exception.status === "resolved";
    return true;
  });

  const handleAssignException = () => {
    if (!selectedException) return;
    
    setExceptions(exceptions.map(exception => 
      exception.id === selectedException.id 
        ? { ...exception, status: "in_progress" } 
        : exception
    ));
    
    setSelectedException(null);
    
    toast({
      title: "Exception Assigned",
      description: `Exception for delivery ${selectedException.id} has been marked as in progress`,
    });
  };
  
  const handleResolveException = (id: string, resolution: string) => {
    setExceptions(exceptions.map(exception => 
      exception.id === id 
        ? { ...exception, status: "resolved", resolution } 
        : exception
    ));
    
    toast({
      title: "Exception Resolved",
      description: `Exception for delivery ${id} has been resolved`,
    });
  };
  
  const handleContactCustomer = (id: string) => {
    toast({
      title: "Customer Contact Initiated",
      description: `Connecting to customer for delivery ${id}`,
    });
  };
  
  const handleRefreshExceptions = () => {
    toast({
      title: "Refreshing Exceptions",
      description: "Getting the latest exception data...",
    });
    
    // In a real app, this would fetch updated data from the server
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Delivery Exceptions Management</CardTitle>
                <CardDescription>Handle issues with same-day deliveries</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={handleRefreshExceptions}
              >
                <RefreshCw size={14} />
                Refresh Exceptions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="open" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="open" className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500" />
                  Open ({exceptions.filter(e => e.status === "open").length})
                </TabsTrigger>
                <TabsTrigger value="in_progress" className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" />
                  In Progress ({exceptions.filter(e => e.status === "in_progress").length})
                </TabsTrigger>
                <TabsTrigger value="resolved" className="flex items-center gap-2">
                  <RefreshCw size={16} className="text-green-500" />
                  Resolved ({exceptions.filter(e => e.status === "resolved").length})
                </TabsTrigger>
              </TabsList>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exception</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Driver</TableHead>
                      <TableHead className="hidden md:table-cell">Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExceptions.length > 0 ? (
                      filteredExceptions.map((exception) => (
                        <TableRow key={exception.id} className={selectedException?.id === exception.id ? "bg-muted/50" : ""}>
                          <TableCell className="font-medium">
                            <div>{exception.id}</div>
                            <div className="text-xs text-muted-foreground">Order: {exception.orderId}</div>
                          </TableCell>
                          <TableCell>
                            <div>{exception.customer}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {exception.address}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={exceptionTypeMap[exception.exceptionType]?.color || "bg-gray-100 text-gray-800"}>
                              <span className="flex items-center gap-1">
                                {exceptionTypeMap[exception.exceptionType]?.icon}
                                <span className="hidden lg:inline">{exceptionTypeMap[exception.exceptionType]?.label}</span>
                              </span>
                            </Badge>
                            {exception.priority === "high" && (
                              <Badge className="ml-2 bg-red-100 text-red-800">High</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{exception.driver}</TableCell>
                          <TableCell className="hidden md:table-cell">{exception.timestamp}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {exception.status === "open" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="hidden sm:inline-flex"
                                    onClick={() => handleContactCustomer(exception.id)}
                                  >
                                    <Phone size={14} className="mr-1" />
                                    Contact
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant={selectedException?.id === exception.id ? "default" : "outline"} 
                                    onClick={() => setSelectedException(exception)}
                                  >
                                    {selectedException?.id === exception.id ? "Selected" : "Handle"}
                                  </Button>
                                </>
                              )}
                              
                              {exception.status === "in_progress" && (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleContactCustomer(exception.id)}
                                  >
                                    <Phone size={14} className="mr-1" />
                                    Contact
                                  </Button>
                                  <div className="flex gap-1">
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleResolveException(exception.id, "rescheduled")}
                                    >
                                      Resolve
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {exception.status === "resolved" && (
                                <Badge className="bg-green-100 text-green-800">
                                  {resolutionTypeMap[exception.resolution || ""]?.label || "Resolved"}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No exceptions found in this category
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {selectedException && (
        <Card>
          <CardHeader>
            <CardTitle>Exception Details: {selectedException.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Alert className={exceptionTypeMap[selectedException.exceptionType]?.color || "bg-gray-100"}>
                  {exceptionTypeMap[selectedException.exceptionType]?.icon}
                  <AlertDescription>
                    {exceptionTypeMap[selectedException.exceptionType]?.label}: {selectedException.notes}
                  </AlertDescription>
                </Alert>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Customer</div>
                      <div className="font-medium">{selectedException.customer}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">{selectedException.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Delivery Window</div>
                      <div className="font-medium">{selectedException.deliveryWindow}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Exception Time</div>
                      <div className="font-medium">{selectedException.timestamp}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Address</h3>
                  <div className="p-3 rounded-lg border">
                    {selectedException.address}
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Resolution Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAssignException()}
                    >
                      Handle Exception
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleContactCustomer(selectedException.id)}
                    >
                      <Phone size={14} className="mr-2" />
                      Contact Customer
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Resolution Actions</h3>
                  <div className="space-y-2">
                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-amber-500" />
                          <div className="font-medium">Reschedule Delivery</div>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6 mt-1">
                          Arrange a new delivery time with the customer
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-green-500" />
                          <div className="font-medium">Update Delivery Address</div>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6 mt-1">
                          Correct or update the delivery location
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Home size={16} className="text-blue-500" />
                          <div className="font-medium">Deliver to Neighbor</div>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6 mt-1">
                          Arrange delivery to a neighboring address
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Truck size={16} className="text-purple-500" />
                          <div className="font-medium">Return to Warehouse</div>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6 mt-1">
                          Cancel delivery attempt and return package
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Communication</h3>
                  <div className="rounded-lg border p-4 space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add a note or message..." 
                        className="flex-1 p-2 rounded-md border"
                      />
                      <Button size="sm">
                        <MessageSquare size={14} className="mr-2" />
                        Send
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 rounded-md bg-muted/50">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">System</div>
                          <div className="text-xs text-muted-foreground">2:15 PM</div>
                        </div>
                        <div className="text-sm">Exception reported by driver {selectedException.driver}</div>
                      </div>
                      <div className="p-2 rounded-md bg-muted/50">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{selectedException.driver}</div>
                          <div className="text-xs text-muted-foreground">2:16 PM</div>
                        </div>
                        <div className="text-sm">{selectedException.notes}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
