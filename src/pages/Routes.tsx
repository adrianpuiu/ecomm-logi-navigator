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
import { RouteStop } from "@/types/route";

export default function Routes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("plan");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [stops, setStops] = useState<RouteStop[]>([
    { 
      id: "origin", 
      address: "", 
      type: "origin",
      latitude: undefined,
      longitude: undefined
    },
    { 
      id: "destination", 
      address: "", 
      type: "destination",
      latitude: undefined,
      longitude: undefined
    }
  ]);
  
  const handleAddStop = (stop: RouteStop) => {
    // If this is the first stop and we have an empty origin, use it as origin
    if (stops[0].address === "" && !stops[0].latitude && !stops[0].longitude) {
      const newStops = [...stops];
      newStops[0] = { ...stop, id: "origin", type: "origin" };
      setStops(newStops);
      toast({
        title: "Starting Point Added",
        description: `${stop.address} has been set as the starting point.`
      });
      return;
    }
    
    // If this is the second stop and we have an empty destination, use it as destination
    if (stops[1].address === "" && !stops[1].latitude && !stops[1].longitude) {
      const newStops = [...stops];
      newStops[1] = { ...stop, id: "destination", type: "destination" };
      setStops(newStops);
      toast({
        title: "Destination Added",
        description: `${stop.address} has been set as the destination.`
      });
      return;
    }
    
    // Otherwise, add as waypoint
    const newStops = [...stops];
    // Insert the waypoint before the destination
    newStops.splice(newStops.length - 1, 0, stop);
    setStops(newStops);
    toast({
      title: "Waypoint Added",
      description: `${stop.address} has been added as a waypoint.`
    });
  };
  
  const handleUpdateStop = (stopId: string, updatedStop: Partial<RouteStop>) => {
    setStops(stops.map(stop => 
      stop.id === stopId ? { ...stop, ...updatedStop } : stop
    ));
  };
  
  const handleRemoveStop = (stopId: string) => {
    // Don't allow removing origin or destination
    if (stopId === "origin" || stopId === "destination") {
      const stopType = stopId === "origin" ? "starting point" : "destination";
      toast({
        title: "Cannot Remove Stop",
        description: `The ${stopType} cannot be removed, but you can change its location.`,
        variant: "destructive"
      });
      return;
    }
    
    setStops(stops.filter(stop => stop.id !== stopId));
    toast({
      title: "Waypoint Removed",
      description: "The selected waypoint has been removed from the route."
    });
  };
  
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
                  disabled={isOptimizing || stops.filter(s => s.latitude && s.longitude).length < 2}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isOptimizing ? "Optimizing..." : "Optimize Route"}
                </Button>
                <Button 
                  onClick={handleSaveRoute}
                  disabled={stops.filter(s => s.latitude && s.longitude).length < 2}
                >
                  Save Route
                </Button>
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
                        <Map 
                          stops={stops} 
                          onAddStop={handleAddStop} 
                        />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <RouteParameters 
                      stops={stops}
                      onUpdateStop={handleUpdateStop}
                      onRemoveStop={handleRemoveStop}
                      onAddStop={handleAddStop}
                    />
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
