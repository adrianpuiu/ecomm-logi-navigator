
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerDetails } from "@/components/customers/CustomerDetails";
import { CustomerOrderHistory } from "@/components/customers/CustomerOrderHistory";
import { CustomerCommunicationLog } from "@/components/customers/CustomerCommunicationLog";
import { CustomerReturnHistory } from "@/components/customers/CustomerReturnHistory";
import { CustomerNotes } from "@/components/customers/CustomerNotes";

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");

  // Mock function to get customer data
  const getCustomer = (id: string) => {
    return {
      id,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      registrationDate: "2023-01-15",
      segment: "regular",
      addresses: [
        {
          id: "addr1",
          type: "shipping",
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "USA",
          default: true
        },
        {
          id: "addr2",
          type: "billing",
          street: "456 Oak Ave",
          city: "Business City",
          state: "NY",
          zipCode: "67890",
          country: "USA",
          default: true
        }
      ],
      preferences: {
        communication: {
          email: true,
          sms: false,
          phone: true
        },
        marketing: true
      }
    };
  };

  const customer = getCustomer(id || "");

  return (
    <>
      <Helmet>
        <title>{`${customer.firstName} ${customer.lastName} | Customer Details`}</title>
      </Helmet>
      
      {/* Updated container to ensure it doesn't get behind the sidebar */}
      <div className="flex flex-col min-h-screen bg-background ml-[240px] w-[calc(100%-240px)]">
        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-muted-foreground">
              Customer ID: {customer.id}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <CustomerDetails customer={customer} />
            </TabsContent>
            
            <TabsContent value="orders" className="mt-6">
              <CustomerOrderHistory customerId={customer.id} />
            </TabsContent>
            
            <TabsContent value="returns" className="mt-6">
              <CustomerReturnHistory customerId={customer.id} />
            </TabsContent>
            
            <TabsContent value="communication" className="mt-6">
              <CustomerCommunicationLog customerId={customer.id} />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-6">
              <CustomerNotes customerId={customer.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
