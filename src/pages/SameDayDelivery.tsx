
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/Sidebar";
import { OrderIntegration } from "@/components/same-day/OrderIntegration";
import { ActiveDeliveries } from "@/components/same-day/ActiveDeliveries";
import { DispatchCenter } from "@/components/same-day/DispatchCenter";
import { DeliveryAnalytics } from "@/components/same-day/DeliveryAnalytics";
import { DeliveryExceptions } from "@/components/same-day/DeliveryExceptions";

export default function SameDayDelivery() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <>
      <Helmet>
        <title>Same-Day Delivery | Logistics TMS</title>
      </Helmet>

      <div className="flex min-h-screen bg-background">
        <Sidebar />
        
        <div className="flex-1 ml-[240px]">
          <div className="p-8 space-y-4">
            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Same-Day Delivery Management</h2>
              <p className="text-muted-foreground">
                Manage, track, and optimize your same-day delivery operations
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="orders">Order Integration</TabsTrigger>
                <TabsTrigger value="active">Active Deliveries</TabsTrigger>
                <TabsTrigger value="dispatch">Dispatch Center</TabsTrigger>
                <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <OrderIntegration />
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                <ActiveDeliveries />
              </TabsContent>

              <TabsContent value="dispatch" className="space-y-4">
                <DispatchCenter />
              </TabsContent>

              <TabsContent value="exceptions" className="space-y-4">
                <DeliveryExceptions />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <DeliveryAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
