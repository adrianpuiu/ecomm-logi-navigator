import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Search, Truck, Phone, Clock, RefreshCw, CheckCircle2 } from "lucide-react";

// Define exception status type for type safety
type ExceptionStatus = "open" | "in_progress" | "resolved";

// Mock data for delivery exceptions
const MOCK_EXCEPTIONS = [
  {
    id: "EXC-5823",
    orderId: "ORD-23491",
    customer: "David Černý",
    phone: "+420 777 123 456",
    deliveryWindow: "1:00 PM - 4:00 PM",
    address: "Sokolovská 42, Prague 8, 18000",
    exceptionType: "customer_unavailable",
    status: "open" as ExceptionStatus,
    timestamp: "12:45 PM",
    driver: "Karel Jančík",
    notes: "Customer not responding to phone calls or doorbell. Attempted delivery twice within 10 minutes.",
    priority: "high"
  },
  {
    id: "EXC-5824",
    orderId: "ORD-23495",
    customer: "Petr Svoboda",
    phone: "+420 777 234 567",
    deliveryWindow: "12:00 PM - 3:00 PM",
    address: "Na Florenci 35, Prague 1, 11000",
    exceptionType: "traffic_delay",
    status: "in_progress" as ExceptionStatus,
    timestamp: "1:15 PM",
    driver: "Jana Malá",
    notes: "Heavy traffic near city center due to road construction. Estimated delay of 25-30 minutes.",
    priority: "medium"
  },
  {
    id: "EXC-5825",
    orderId: "ORD-23499",
    customer: "Lucie Němcová",
    phone: "+420 777 345 678",
    deliveryWindow: "2:00 PM - 5:00 PM",
    address: "Ohradní 65, Prague 4, 14000",
    exceptionType: "address_issue",
    status: "open" as ExceptionStatus,
    timestamp: "2:20 PM",
    driver: "Pavel Krejčí",
    notes: "Building number doesn't match. Contacting customer for clarification.",
    priority: "high"
  },
  {
    id: "EXC-5826",
    orderId: "ORD-23502",
    customer: "Martin Horák",
    phone: "+420 777 456 789",
    deliveryWindow: "1:00 PM - 4:00 PM",
    address: "Korunní 88, Prague 3, 13000",
    exceptionType: "package_damaged",
    status: "in_progress" as ExceptionStatus,
    timestamp: "1:40 PM",
    driver: "Tomáš Novák",
    notes: "Package appears to have been damaged during transport. Customer has been notified and offered a replacement.",
    priority: "high"
  },
  {
    id: "EXC-5827",
    orderId: "ORD-23505",
    customer: "Jana Dvořáková",
    phone: "+420 777 567 890",
    deliveryWindow: "11:00 AM - 2:00 PM",
    address: "Vinohradská 112, Prague 3, 13000",
    exceptionType: "customer_unavailable",
    status: "resolved" as ExceptionStatus,
    timestamp: "11:30 AM",
    driver: "Martin Kos",
    notes: "Customer was initially unavailable. Contacted by phone and returned to make delivery at 1:15 PM.",
    priority: "medium",
    resolution: "Successfully delivered on second attempt after customer returned home."
  }
];

// Types
interface DeliveryException {
  id: string;
  orderId: string;
  customer: string;
  phone: string;
  deliveryWindow: string;
  address: string;
  exceptionType: string;
  status: ExceptionStatus;
  timestamp: string;
  driver: string;
  notes: string;
  priority: string;
  resolution?: string;
}

export function DeliveryExceptions() {
  const { toast } = useToast();
  const [exceptions, setExceptions] = useState<DeliveryException[]>(MOCK_EXCEPTIONS);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedException, setSelectedException] = useState<DeliveryException | null>(null);
  const [resolutionNote, setResolutionNote] = useState<string>("");

  const handleResolveException = (exceptionId: string) => {
    if (!resolutionNote) {
      toast({
        title: "Missing Resolution Note",
        description: "Please add a resolution note before resolving the exception.",
        variant: "destructive",
      });
      return;
    }

    setExceptions(exceptions.map(exception =>
      exception.id === exceptionId ? { ...exception, status: "resolved", resolution: resolutionNote } : exception
    ));

    toast({
      title: "Exception Resolved",
      description: `Exception ${exceptionId} has been marked as resolved.`,
    });

    // Clear selected exception and resolution note
    setSelectedException(null);
    setResolutionNote("");
  };

  const getFilteredExceptions = () => {
    if (filterStatus === "all") {
      return exceptions;
    } else {
      return exceptions.filter(exception => exception.status === filterStatus);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Delivery Exceptions</h3>
          <p className="text-sm text-muted-foreground">
            Manage and resolve delivery exceptions in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search exceptions..."
            className="md:w-[200px]"
          />
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Search size={16} />
            <span className="hidden md:inline">Search</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Open Exceptions</CardTitle>
                <CardDescription>
                  Active exceptions requiring immediate attention
                </CardDescription>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exceptions</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exception ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Delivery Window</TableHead>
                    <TableHead className="hidden lg:table-cell">Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredExceptions().map((exception) => (
                    <TableRow
                      key={exception.id}
                      className={selectedException?.id === exception.id ? "bg-muted/50" : ""}
                    >
                      <TableCell className="font-medium">{exception.id}</TableCell>
                      <TableCell>
                        <div>{exception.customer}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {exception.address}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {exception.deliveryWindow}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{exception.driver}</TableCell>
                      <TableCell>
                        {exception.status === "open" && (
                          <Badge className="bg-red-100 text-red-800">Open</Badge>
                        )}
                        {exception.status === "in_progress" && (
                          <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                        )}
                        {exception.status === "resolved" && (
                          <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={selectedException?.id === exception.id ? "default" : "outline"}
                          onClick={() => setSelectedException(exception)}
                        >
                          {selectedException?.id === exception.id ? "Selected" : "View Details"}
                        </Button>
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
            <CardTitle>Exception Details</CardTitle>
            <CardDescription>
              Detailed information and resolution options
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedException ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Customer</div>
                    <div className="font-medium">{selectedException.customer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Order ID</div>
                    <div className="font-medium">{selectedException.orderId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      {selectedException.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Delivery Window</div>
                    <div className="font-medium flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      {selectedException.deliveryWindow}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Delivery Address</div>
                  <div className="font-medium">{selectedException.address}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Exception Notes</div>
                  <div className="font-medium">{selectedException.notes}</div>
                </div>

                {selectedException.status !== "resolved" ? (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground">Resolution Notes</div>
                      <Textarea
                        placeholder="Add resolution notes..."
                        value={resolutionNote}
                        onChange={(e) => setResolutionNote(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleResolveException(selectedException.id)}
                    >
                      Resolve Exception
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground">Resolution Notes</div>
                      <div className="font-medium">{selectedException.resolution}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <CheckCircle2 size={16} />
                      This exception has been resolved
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select an exception to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
