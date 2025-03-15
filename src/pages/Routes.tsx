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
import { RouteStop, OptimizationPriority, RouteConstraint, Driver, Vehicle } from "@/types/route";
import { saveRoute, validateRouteData } from "@/utils/routeUtils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Routes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("plan");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [optimizationPriority, setOptimizationPriority] = useState<OptimizationPriority>("fastest");
  const [routeConstraints, setRouteConstraints] = useState<RouteConstraint>({
    avoidTolls: false,
    avoidHighways: false,
    useRealTimeTraffic: true,
    allowUTurns: false,
  });
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [timeWindowStart, setTimeWindowStart] = useState<string>("");
  const [timeWindowEnd, setTimeWindowEnd] = useState<string>("");
  const [routeDistance, setRouteDistance] = useState<number>(0);
  const [routeDuration, setRouteDuration] = useState<number>(0);
  
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
  
  const handleSaveRoute = async () => {
    // Show the save dialog to collect the route name
    setShowSaveDialog(true);
  };
  
  const handleConfirmSave = async () => {
    setIsSaving(true);
    
    const validation = validateRouteData(stops, routeName);
    if (!validation.isValid) {
      toast({
        title: "Cannot Save Route",
        description: validation.message,
        variant: "destructive"
      });
      setIsSaving(false);
      return;
    }
    
    // Calculate dates from string inputs
    let timeWindow = undefined;
    if (deliveryDate && (timeWindowStart || timeWindowEnd)) {
      const dateBase = new Date(deliveryDate);
      timeWindow = {
        start: timeWindowStart 
          ? new Date(`${deliveryDate}T${timeWindowStart}`) 
          : dateBase,
        end: timeWindowEnd 
          ? new Date(`${deliveryDate}T${timeWindowEnd}`) 
          : dateBase,
      };
    }
    
    // Construct the route object
    const route = {
      name: routeName,
      date: deliveryDate ? new Date(deliveryDate) : new Date(),
      timeWindow,
      stops,
      driver: selectedDriver,
      vehicle: selectedVehicle,
      optimizationPriority,
      constraints: routeConstraints,
      status: "planned",
      distance: routeDistance,
      duration: routeDuration,
      estimatedCost: calculateEstimatedCost(routeDistance, routeDuration),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const savedRoute = await saveRoute(route);
    
    if (savedRoute) {
      toast({
        title: "Route Saved",
        description: `"${routeName}" has been saved successfully.`,
      });
      setShowSaveDialog(false);
      // Optionally reset the form or redirect to the saved route
    } else {
      toast({
        title: "Error Saving Route",
        description: "There was a problem saving your route. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsSaving(false);
  };
  
  const calculateEstimatedCost = (distance: number, duration: number): number => {
    // Basic cost calculation logic
    const baseRate = 1.5; // $ per mile
    const timeRate = 30; // $ per hour
    
    const distanceCost = (distance / 1000) * baseRate; // Convert meters to km
    const timeCost = (duration / 3600) * timeRate; // Convert seconds to hours
    
    return Math.round((distanceCost + timeCost) * 100) / 100; // Round to 2 decimal places
  };
  
  // Update route metrics when the map calculates them
  const handleRouteCalculated = (distance: number, duration: number) => {
    setRouteDistance(distance);
    setRouteDuration(duration);
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
                          onRouteCalculated={handleRouteCalculated}
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
                      deliveryDate={deliveryDate}
                      setDeliveryDate={setDeliveryDate}
                      timeWindowStart={timeWindowStart}
                      setTimeWindowStart={setTimeWindowStart}
                      timeWindowEnd={timeWindowEnd}
                      setTimeWindowEnd={setTimeWindowEnd}
                    />
                    <RouteOptimizationOptions 
                      optimizationPriority={optimizationPriority}
                      setOptimizationPriority={setOptimizationPriority}
                      routeConstraints={routeConstraints}
                      setRouteConstraints={setRouteConstraints}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <DriverSelector onSelectDriver={setSelectedDriver} />
                      <VehicleSelector onSelectVehicle={setSelectedVehicle} />
                    </div>
                    
                    {/* Route Summary Card */}
                    {routeDistance > 0 && (
                      <Card>
                        <CardContent className="pt-4">
                          <h3 className="text-lg font-semibold mb-2">Route Summary</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Distance:</span>
                              <span className="font-medium">{(routeDistance / 1000).toFixed(1)} km</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="font-medium">{Math.floor(routeDuration / 3600)}h {Math.floor((routeDuration % 3600) / 60)}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Estimated Cost:</span>
                              <span className="font-medium">${calculateEstimatedCost(routeDistance, routeDuration)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
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
      
      {/* Save Route Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Route</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="route-name">Route Name</Label>
              <Input 
                id="route-name" 
                placeholder="Enter a name for this route" 
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
              />
            </div>
            
            {routeDistance > 0 && (
              <div className="space-y-2 border rounded-md p-3 bg-muted/20">
                <h4 className="font-medium">Route Summary</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Distance:</span>
                  <span>{(routeDistance / 1000).toFixed(1)} km</span>
                  
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{Math.floor(routeDuration / 3600)}h {Math.floor((routeDuration % 3600) / 60)}m</span>
                  
                  <span className="text-muted-foreground">Stops:</span>
                  <span>{stops.length}</span>
                  
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span>${calculateEstimatedCost(routeDistance, routeDuration)}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleConfirmSave} 
              disabled={!routeName.trim() || isSaving}
            >
              {isSaving ? "Saving..." : "Save Route"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
