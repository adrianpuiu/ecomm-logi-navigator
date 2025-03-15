
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChevronLeft, 
  Package, 
  RefreshCw, 
  Truck, 
  CheckCircle, 
  XCircle,
  Send,
  Printer,
  ReceiptText,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReturnTimeline } from "@/components/returns/ReturnTimeline";
import { ReturnItemsList } from "@/components/returns/ReturnItemsList";
import { ReturnCustomerInfo } from "@/components/returns/ReturnCustomerInfo";
import { ProcessReturnForm } from "@/components/returns/ProcessReturnForm";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

// Mock function to simulate fetching return data
const fetchReturnDetail = (id: string) => {
  return {
    id,
    orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
    requestedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: ["requested", "approved", "in_transit", "received", "completed", "rejected"][Math.floor(Math.random() * 6)],
    reason: "The item arrived damaged. The package had visible dents and the product inside was broken.",
    trackingNumber: Math.random() > 0.5 ? `TRK${900000 + Math.floor(Math.random() * 1000)}` : "",
    returnItems: [
      {
        itemId: `ITEM-${1000 + Math.floor(Math.random() * 100)}`,
        name: "Wireless Headphones",
        quantity: 1,
        price: 79.99,
        reason: "Damaged on arrival"
      }
    ],
    refundAmount: Math.random() > 0.5 ? 79.99 : undefined,
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "USA"
      }
    },
    timeline: [
      {
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "requested",
        description: "Return request submitted by customer"
      },
      {
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        status: "approved",
        description: "Return request approved"
      },
      {
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: "in_transit",
        description: "Return package in transit"
      }
    ]
  };
};

export default function ReturnDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [returnData, setReturnData] = useState<any>(fetchReturnDetail(id || ""));
  
  const statusColors: Record<string, string> = {
    requested: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    approved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    in_transit: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    received: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  
  const handleApproveReturn = () => {
    toast({
      title: "Return Approved",
      description: `Return ${id} has been approved and return label sent to customer.`
    });
    setReturnData({
      ...returnData,
      status: "approved",
      timeline: [
        ...returnData.timeline,
        {
          date: new Date().toISOString(),
          status: "approved",
          description: "Return request approved and return label sent to customer"
        }
      ]
    });
  };
  
  const handleDenyReturn = () => {
    toast({
      title: "Return Denied",
      description: `Return ${id} has been denied.`
    });
    setReturnData({
      ...returnData,
      status: "rejected",
      timeline: [
        ...returnData.timeline,
        {
          date: new Date().toISOString(),
          status: "rejected",
          description: "Return request denied - item not eligible for return"
        }
      ]
    });
  };
  
  const handleReceiveReturn = () => {
    toast({
      title: "Return Received",
      description: `Return ${id} has been marked as received.`
    });
    setReturnData({
      ...returnData,
      status: "received",
      timeline: [
        ...returnData.timeline,
        {
          date: new Date().toISOString(),
          status: "received",
          description: "Return package received at warehouse"
        }
      ]
    });
  };
  
  const handleCompleteReturn = () => {
    toast({
      title: "Return Completed",
      description: `Return ${id} has been completed and refund processed.`
    });
    setReturnData({
      ...returnData,
      status: "completed",
      refundAmount: returnData.returnItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0),
      timeline: [
        ...returnData.timeline,
        {
          date: new Date().toISOString(),
          status: "completed",
          description: "Return processed and refund issued to customer"
        }
      ]
    });
  };
  
  const handlePrintLabel = () => {
    toast({
      title: "Printing Return Label",
      description: "Return shipping label sent to printer"
    });
  };
  
  const handleEmailCustomer = () => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${returnData.customer.email}`
    });
  };
  
  return (
    <div className="min-h-screen bg-background antialiased">
      <Navbar />
      <Sidebar />
      
      <main className="transition-all duration-300 pt-16 pl-[240px]">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              asChild 
              className="mb-4"
            >
              <Link to="/returns" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <ChevronLeft size={16} />
                Back to Returns
              </Link>
            </Button>
            
            <div className="bg-card rounded-lg border shadow-sm mb-6">
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw size={20} className="text-primary" />
                    <h1 className="text-2xl font-bold">Return {returnData.id}</h1>
                    <Badge className={statusColors[returnData.status]}>
                      {returnData.status.replace('_', ' ').charAt(0).toUpperCase() + returnData.status.replace('_', ' ').slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="text-muted-foreground">
                    <span>Order: {returnData.orderId}</span>
                    <span className="mx-2">•</span>
                    <span>Requested on: {formatDate(returnData.requestedAt)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {returnData.status === "requested" && (
                    <>
                      <Button onClick={handleApproveReturn} variant="default">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Return
                      </Button>
                      <Button onClick={handleDenyReturn} variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Deny Return
                      </Button>
                    </>
                  )}
                  
                  {returnData.status === "in_transit" && (
                    <Button onClick={handleReceiveReturn} variant="default">
                      <Package className="mr-2 h-4 w-4" />
                      Mark as Received
                    </Button>
                  )}
                  
                  {returnData.status === "received" && (
                    <Button onClick={handleCompleteReturn} variant="default">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete & Process Refund
                    </Button>
                  )}
                  
                  <Button variant="outline" onClick={handlePrintLabel}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Label
                  </Button>
                  
                  <Button variant="outline" onClick={handleEmailCustomer}>
                    <Send className="mr-2 h-4 w-4" />
                    Email Customer
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Package size={18} className="text-primary" />
                      Return Details
                    </CardTitle>
                    <CardDescription>
                      Information about this return request
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Return Reason</h3>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        {returnData.reason}
                      </div>
                    </div>
                    
                    <ReturnItemsList items={returnData.returnItems} />
                    
                    {returnData.status !== "requested" && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Return Tracking</h3>
                        <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Truck size={16} />
                            <span className="font-mono">{returnData.trackingNumber || "Not available"}</span>
                          </div>
                          {returnData.trackingNumber && (
                            <Button variant="ghost" size="sm">Track Package</Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {returnData.refundAmount !== undefined && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Refund Information</h3>
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex justify-between items-center">
                            <span>Refund Amount:</span>
                            <span className="font-medium">${returnData.refundAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <ReturnTimeline timeline={returnData.timeline} />
                
                {returnData.status === "received" && (
                  <ProcessReturnForm onComplete={handleCompleteReturn} />
                )}
              </div>
              
              <div className="lg:col-span-1">
                <ReturnCustomerInfo customer={returnData.customer} />
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <ReceiptText size={16} className="text-primary" />
                      Return Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li>• Items must be returned within 30 days of purchase</li>
                      <li>• Items must be in original condition</li>
                      <li>• Original packaging must be included</li>
                      <li>• Damaged items may be eligible for partial refund</li>
                      <li>• Shipping costs are non-refundable</li>
                    </ul>
                    <Button variant="link" className="p-0 h-auto mt-2">
                      View full return policy
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare size={16} className="text-primary" />
                      Customer Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Customer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
