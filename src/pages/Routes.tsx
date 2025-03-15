
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/Sidebar";
import { Map } from "@/components/routes/Map";
import { RouteParameters } from "@/components/routes/RouteParameters";
import { DriverSelector } from "@/components/routes/DriverSelector";
import { VehicleSelector } from "@/components/routes/VehicleSelector";
import { RouteOptimizationOptions } from "@/components/routes/RouteOptimizationOptions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export default function Routes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("plan");
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    // Simulate route optimization
    setTimeout(() => {
      setIsOptimizing(false);
      toast({
        title: "Route Optimized",
        description: "The optimal route has been calculated based on your parameters.",
      });
    }, 2000);
  };
  
  const handleSaveRoute = () => {
    toast({
      title: "Route Saved",
      description: "Your route has been saved successfully.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Route Planning | Logistics TMS</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        
        <div className="flex-1 flex flex-col ml-[240px]">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Route Planning & Optimization</h2>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={handleOptimizeRoute} 
                  disabled={isOptimizing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isOptimizing ? "Optimizing..." : "Optimize Route"}
                </Button>
                <Button onClick={handleSaveRoute}>Save Route</Button>
              </div>
            </div>
            
            <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="plan">Plan Route</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled Routes</TabsTrigger>
                <TabsTrigger value="history">Route History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="plan" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardContent className="p-0">
                        <Map />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <RouteParameters />
                    <RouteOptimizationOptions />
                    <div className="grid grid-cols-2 gap-4">
                      <DriverSelector />
                      <VehicleSelector />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Scheduled routes will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Route history will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
