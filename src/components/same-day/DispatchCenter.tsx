
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, MapPin, Truck, User, Package, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for available drivers
const MOCK_DRIVERS = [
  {
    id: "DRV-01",
    name: "Karel Jančík",
    avatar: "",
    status: "active",
    availableUntil: "8:00 PM",
    currentLocation: "Prague 8",
    completedToday: 7,
    vehicle: {
      id: "VAN-04",
      type: "Electric Van",
      capacity: 85
    }
  },
  {
    id: "DRV-02",
    name: "Tomáš Horák",
    avatar: "",
    status: "active",
    availableUntil: "6:00 PM",
    currentLocation: "Prague 2",
    completedToday: 5,
    vehicle: {
      id: "VAN-02",
      type: "Small Van",
      capacity: 60
    }
  },
  {
    id: "DRV-03",
    name: "Jana Malá",
    avatar: "",
    status: "active",
    availableUntil: "7:00 PM",
    currentLocation: "Prague 1",
    completedToday: 6,
    vehicle: {
      id: "VAN-01",
      type: "Electric Van",
      capacity: 75
    }
  },
  {
    id: "DRV-04",
    name: "Martin Kos",
    avatar: "",
    status: "break",
    availableUntil: "7:30 PM",
    currentLocation: "Prague 2",
    completedToday: 4,
    vehicle: {
      id: "VAN-03",
      type: "Medium Van",
      capacity: 40
    }
  },
  {
    id: "DRV-05",
    name: "Pavel Krejčí",
    avatar: "",
    status: "active",
    availableUntil: "8:00 PM",
    currentLocation: "Prague 4",
    completedToday: 6,
    vehicle: {
      id: "VAN-05",
      type: "Small Van",
      capacity: 65
    }
  }
];

// Mock data for pending deliveries that need to be assigned
const MOCK_PENDING_DELIVERIES = [
  {
    id: "DEL-5428",
    orderId: "ORD-23506",
    customer: "Jakub Zeman",
    items: 2,
    address: "Vinohradská 112, Prague 3, 13000",
    requestedWindow: "4:00 PM - 7:00 PM",
    status: "ready_for_dispatch",
    priority: "normal"
  },
  {
    id: "DEL-5429",
    orderId: "ORD-23507",
    customer: "Hana Vrábová",
    items: 1,
    address: "Anglická 28, Prague 2, 12000",
    requestedWindow: "3:00 PM - 6:00 PM",
    status: "ready_for_dispatch",
    priority: "high"
  },
  {
    id: "DEL-5430",
    orderId: "ORD-23508",
    customer: "Josef Čapek",
    items: 3,
    address: "Korunní 65, Prague 3, 13000",
    requestedWindow: "5:00 PM - 8:00 PM",
    status: "ready_for_dispatch",
    priority: "normal"
  }
];

// Mock data for next batch of deliveries being prepared
const MOCK_PREPARING_DELIVERIES = [
  {
    id: "DEL-5431",
    orderId: "ORD-23511",
    customer: "Helena Kadlecová",
    items: 2,
    address: "Nádražní 45, Prague 5, 15000",
    requestedWindow: "5:00 PM - 8:00 PM",
    status: "picking",
    estimatedReadyTime: "3:30 PM"
  },
  {
    id: "DEL-5432",
    orderId: "ORD-23512",
    customer: "Filip Nový",
    items: 4,
    address: "Vratislavova 12, Prague 2, 12800",
    requestedWindow: "5:00 PM - 8:00 PM",
    status: "packing",
    estimatedReadyTime: "3:15 PM"
  },
  {
    id: "DEL-5433",
    orderId: "ORD-23513",
    customer: "Monika Růžičková",
    items: 1,
    address: "Na Pankráci 86, Prague 4, 14000",
    requestedWindow: "6:00 PM - 9:00 PM",
    status: "waiting",
    estimatedReadyTime: "4:00 PM"
  }
];

// Types
interface Driver {
  id: string;
  name: string;
  avatar: string;
  status: "active" | "break" | "offline";
  availableUntil: string;
  currentLocation: string;
  completedToday: number;
  vehicle: {
    id: string;
    type: string;
    capacity: number;
  };
}

interface PendingDelivery {
  id: string;
  orderId: string;
  customer: string;
  items: number;
  address: string;
  requestedWindow: string;
  status: "ready_for_dispatch";
  priority: "normal" | "high";
  assignedDriver?: string;
}

interface PreparingDelivery {
  id: string;
  orderId: string;
  customer: string;
  items: number;
  address: string;
  requestedWindow: string;
  status: "picking" | "packing" | "waiting";
  estimatedReadyTime: string;
}

export function DispatchCenter() {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [pendingDeliveries, setPendingDeliveries] = useState<PendingDelivery[]>(MOCK_PENDING_DELIVERIES);
  const [preparingDeliveries] = useState<PreparingDelivery[]>(MOCK_PREPARING_DELIVERIES);
  const [selectedDelivery, setSelectedDelivery] = useState<PendingDelivery | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  
  const handleAssignDelivery = () => {
    if (!selectedDelivery || !selectedDriver) return;
    
    // Update the pending delivery with the assigned driver
    setPendingDeliveries(
      pendingDeliveries.map(delivery => 
        delivery.id === selectedDelivery.id 
          ? { ...delivery, assignedDriver: selectedDriver.id } 
          : delivery
      )
    );
    
    toast({
      title: "Delivery Assigned",
      description: `Delivery ${selectedDelivery.id} has been assigned to ${selectedDriver.name}`,
    });
    
    // Reset selections
    setSelectedDelivery(null);
    setSelectedDriver(null);
  };
  
  const handleRunOptimization = () => {
    setOptimizationInProgress(true);
    
    // Simulate optimization process
    setTimeout(() => {
      // Automatically assign deliveries based on "optimal" assignment
      const updatedDeliveries = pendingDeliveries.map((delivery, index) => {
        // Simple round-robin assignment for demo purposes
        const driverIndex = index % drivers.length;
        return { 
          ...delivery, 
          assignedDriver: drivers[driverIndex].id 
        };
      });
      
      setPendingDeliveries(updatedDeliveries);
      setOptimizationInProgress(false);
      
      toast({
        title: "Route Optimization Complete",
        description: `${updatedDeliveries.length} deliveries have been optimally assigned to drivers`,
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Dispatch Stats</CardTitle>
            <CardDescription>Today's delivery metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-500 flex items-center gap-2 mb-2">
                  <Package size={20} />
                  <span className="font-medium">Assigned</span>
                </div>
                <div className="text-2xl font-bold">28</div>
                <div className="text-sm text-muted-foreground">Total today</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-500 flex items-center gap-2 mb-2">
                  <Truck size={20} />
                  <span className="font-medium">Active Drivers</span>
                </div>
                <div className="text-2xl font-bold">
                  {drivers.filter(d => d.status === "active").length}
                </div>
                <div className="text-sm text-muted-foreground">Currently on duty</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-500 flex items-center gap-2 mb-2">
                  <Clock size={20} />
                  <span className="font-medium">Avg. Delivery</span>
                </div>
                <div className="text-2xl font-bold">32m</div>
                <div className="text-sm text-muted-foreground">Per package</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="text-amber-500 flex items-center gap-2 mb-2">
                  <MapPin size={20} />
                  <span className="font-medium">Coverage</span>
                </div>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Prague area</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Available Drivers</CardTitle>
                <CardDescription>Drivers currently available for assignments</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <RefreshCw size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Vehicle</TableHead>
                    <TableHead className="hidden lg:table-cell">Completed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id} className={selectedDriver?.id === driver.id ? "bg-muted/50" : ""}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={driver.avatar} />
                            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{driver.name}</div>
                            <div className="text-xs text-muted-foreground">Until {driver.availableUntil}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {driver.status === "active" && (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        )}
                        {driver.status === "break" && (
                          <Badge className="bg-amber-100 text-amber-800">On Break</Badge>
                        )}
                        {driver.status === "offline" && (
                          <Badge className="bg-gray-100 text-gray-800">Offline</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{driver.currentLocation}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{driver.vehicle.type}</div>
                        <div className="text-xs text-muted-foreground">{driver.vehicle.id}</div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{driver.completedToday} today</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant={selectedDriver?.id === driver.id ? "default" : "outline"} 
                          onClick={() => setSelectedDriver(driver)}
                          disabled={driver.status !== "active"}
                        >
                          {selectedDriver?.id === driver.id ? "Selected" : "Select"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Deliveries Ready for Dispatch</CardTitle>
                <CardDescription>Packages ready to be assigned to drivers</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleRunOptimization}
                  disabled={optimizationInProgress || pendingDeliveries.length === 0}
                >
                  {optimizationInProgress && <RefreshCw size={14} className="animate-spin" />}
                  Auto-Optimize Routes
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAssignDelivery}
                  disabled={!selectedDelivery || !selectedDriver}
                >
                  Assign Delivery
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Requested Window</TableHead>
                    <TableHead className="hidden lg:table-cell">Items</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDeliveries.map((delivery) => (
                    <TableRow key={delivery.id} className={selectedDelivery?.id === delivery.id ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>
                        <div>{delivery.customer}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {delivery.address}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {delivery.requestedWindow}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{delivery.items}</TableCell>
                      <TableCell>
                        {delivery.priority === "high" ? (
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {delivery.assignedDriver ? (
                          <div className="flex items-center justify-end gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              Assigned to {drivers.find(d => d.id === delivery.assignedDriver)?.name}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <RefreshCw size={14} />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant={selectedDelivery?.id === delivery.id ? "default" : "outline"} 
                            onClick={() => setSelectedDelivery(delivery)}
                          >
                            {selectedDelivery?.id === delivery.id ? "Selected" : "Select"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Preparing for Dispatch</CardTitle>
            <CardDescription>Next batch of deliveries being prepared</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {preparingDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-3 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{delivery.customer}</span>
                    {delivery.status === "picking" && (
                      <Badge className="bg-amber-100 text-amber-800">Picking</Badge>
                    )}
                    {delivery.status === "packing" && (
                      <Badge className="bg-purple-100 text-purple-800">Packing</Badge>
                    )}
                    {delivery.status === "waiting" && (
                      <Badge className="bg-blue-100 text-blue-800">Waiting</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    <span className="truncate">{delivery.address}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Package size={14} className="text-muted-foreground" />
                      <span>{delivery.items} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span>Ready by: {delivery.estimatedReadyTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
