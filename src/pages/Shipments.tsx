
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Package, 
  Search, 
  Plus, 
  ArrowUpDown, 
  RefreshCw, 
  History,
  FileText,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ShipmentType, ShipmentStatus } from "@/types/shipment";
import { mockShipment } from "@/data/mockShipment";

// Create mock data for shipment listings
const mockShipments: ShipmentType[] = Array(10).fill(null).map((_, index) => {
  const status: ShipmentStatus[] = [
    "created", 
    "processing", 
    "picked_up", 
    "in_transit", 
    "out_for_delivery", 
    "delivered", 
    "delayed",
    "returned"
  ];
  
  const baseShipment = {...mockShipment};
  return {
    ...baseShipment,
    id: `SHIP-${10000 + index}`,
    orderId: `ORD-${20000 + index}`,
    status: status[Math.floor(Math.random() * status.length)],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  };
});

// Filter shipments by status
const activeShipments = mockShipments.filter(s => 
  ["created", "processing", "picked_up", "in_transit", "out_for_delivery", "delayed"].includes(s.status)
);

const deliveredShipments = mockShipments.filter(s => s.status === "delivered");

const returnShipments = mockShipments.filter(s => s.status === "returned");

// Status badge colors
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

const statusIcons: Record<string, React.ReactNode> = {
  created: <Clock size={14} />,
  processing: <Clock size={14} />,
  picked_up: <Truck size={14} />,
  in_transit: <Truck size={14} />,
  out_for_delivery: <Truck size={14} />,
  delivered: <CheckCircle size={14} />,
  delayed: <AlertCircle size={14} />,
  exception: <AlertCircle size={14} />,
  cancelled: <AlertCircle size={14} />,
  returned: <RefreshCw size={14} />
};

export default function Shipments() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const handleDownloadCSV = () => {
    toast({
      title: "Export Started",
      description: "Your shipments data is being exported to CSV"
    });
  };
  
  const renderShipmentTable = (shipments: ShipmentType[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">ID</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No shipments found
              </TableCell>
            </TableRow>
          ) : (
            shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell>{shipment.orderId}</TableCell>
                <TableCell>{formatDate(shipment.createdAt)}</TableCell>
                <TableCell>
                  <Badge className={`flex items-center gap-1 ${statusColors[shipment.status]}`}>
                    {statusIcons[shipment.status]}
                    <span className="capitalize">{shipment.status.replace('_', ' ')}</span>
                  </Badge>
                </TableCell>
                <TableCell>{shipment.carrier.name}</TableCell>
                <TableCell>{`${shipment.recipient.address.city}, ${shipment.recipient.address.state}`}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/shipment/${shipment.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-background antialiased">
      <Helmet>
        <title>Shipments | LogiNav</title>
      </Helmet>
      <Navbar />
      <Sidebar />
      
      <main className="transition-all duration-300 pt-16 pl-[240px]">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
              <p className="text-muted-foreground">Manage and track all your shipments</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-[280px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search shipments..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button asChild>
                <Link to="/shipments/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Link>
              </Button>
              
              <Button variant="outline" onClick={handleDownloadCSV}>
                <FileText className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Truck size={16} />
                <span>Active Shipments</span>
                <Badge variant="secondary" className="ml-1 rounded-full px-2">{activeShipments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History size={16} />
                <span>History</span>
                <Badge variant="secondary" className="ml-1 rounded-full px-2">{deliveredShipments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="returns" className="flex items-center gap-2">
                <RefreshCw size={16} />
                <span>Returns</span>
                <Badge variant="secondary" className="ml-1 rounded-full px-2">{returnShipments.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Truck size={18} className="text-primary" />
                    Active Shipments
                  </CardTitle>
                  <CardDescription>
                    View all shipments currently in progress
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {renderShipmentTable(activeShipments)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <History size={18} className="text-primary" />
                    Shipment History
                  </CardTitle>
                  <CardDescription>
                    Review past shipment data
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {renderShipmentTable(deliveredShipments)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <RefreshCw size={18} className="text-primary" />
                    Return Shipments
                  </CardTitle>
                  <CardDescription>
                    Manage return logistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {renderShipmentTable(returnShipments)}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
