import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save, RotateCw, Calendar, FileText, FileBarChart } from "lucide-react";
import { PlanningMap } from "@/components/routes/PlanningMap";
import { RouteStops } from "@/components/routes/RouteStops";
import { RouteSettings } from "@/components/routes/RouteSettings";
import { RouteDriverVehicle } from "@/components/routes/RouteDriverVehicle";
import { RouteSummary } from "@/components/routes/RouteSummary";
import { SaveRouteDialog } from "@/components/routes/SaveRouteDialog";
import { RouteHistory } from "@/components/routes/RouteHistory";
import { ScheduledRoutes } from "@/components/routes/ScheduledRoutes";
import { RouteAnalytics } from "@/components/routes/RouteAnalytics";
import { RouteAssignment } from "@/components/routes/RouteAssignment";
import { 
  RouteStop, 
  OptimizationPriority, 
  RouteConstraint,
  Route as RouteType,
} from "@/types/route";
import { calculateRouteCost } from "@/utils/routeUtils";

export default function Routes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("plan");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // Route data states
  const [routeStops, setRouteStops] = useState<RouteStop[]>([
    { id: "origin", address: "", type: "origin", latitude: undefined, longitude: undefined },
    { id: "destination", address: "", type: "destination", latitude: undefined, longitude: undefined }
  ]);
  
  const [routeName, setRouteName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [timeWindowStart, setTimeWindowStart] = useState("");
  const [timeWindowEnd, setTimeWindowEnd] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [routeDistance, setRouteDistance] = useState(0);
  const [routeDuration, setRouteDuration] = useState(0);
  
  // Route optimization settings
  const [optimizationPriority, setOptimizationPriority] = useState<OptimizationPriority>("fastest");
  const [routeConstraints, setRouteConstraints] = useState<RouteConstraint>({
    avoidTolls: false,
    avoidHighways: false,
    useRealTimeTraffic: true,
    allowUTurns: false,
  });
  const [efficiencyBalance, setEfficiencyBalance] = useState(50);
  
  // Handle adding a new stop to the route
  const handleAddStop = (stop: RouteStop) => {
    // If origin is empty, use as origin
    if (!routeStops[0].address && !routeStops[0].latitude && !routeStops[0].longitude) {
      const newStops = [...routeStops];
      newStops[0] = { ...stop, id: "origin", type: "origin" };
      setRouteStops(newStops);
      toast({
        title: "Origin Added",
        description: `${stop.address} has been set as the origin point.`
      });
      return;
    }
    
    // If destination is empty, use as destination
    if (!routeStops[routeStops.length - 1].address && !routeStops[routeStops.length - 1].latitude) {
      const newStops = [...routeStops];
      newStops[newStops.length - 1] = { ...stop, id: "destination", type: "destination" };
      setRouteStops(newStops);
      toast({
        title: "Destination Added",
        description: `${stop.address} has been set as the destination.`
      });
      return;
    }
    
    // Otherwise, add as waypoint before destination
    const newStops = [...routeStops];
    newStops.splice(newStops.length - 1, 0, { ...stop, type: "waypoint" });
    setRouteStops(newStops);
    toast({
      title: "Waypoint Added",
      description: `${stop.address} has been added as a waypoint.`
    });
  };
  
  // Handle optimizing the route
  const handleOptimizeRoute = async () => {
    setIsOptimizing(true);
    try {
      // Here you would call your route optimization service
      // For now, we'll simulate the optimization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Route Optimized",
        description: "The route has been optimized based on your preferences."
      });
    } catch (error) {
      toast({
        title: "Optimization Failed",
        description: "There was an error optimizing the route. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
  // Handle route metrics update
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
        
        <div className="flex-1 ml-[240px]">
          <div className="p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Route Planning & Optimization</h2>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleOptimizeRoute}
                  disabled={isOptimizing || routeStops.length < 2}
                >
                  {isOptimizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {!isOptimizing && <RotateCw className="mr-2 h-4 w-4" />}
                  {isOptimizing ? "Optimizing..." : "Optimize Route"}
                </Button>
                
                <Button 
                  onClick={() => setShowSaveDialog(true)}
                  disabled={routeStops.length < 2}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Route
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="plan" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Plan Route
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Scheduled Routes
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <FileBarChart className="h-4 w-4" />
                  Route History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="plan" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {/* Left Column: Map */}
                  <div className="col-span-2">
                    <PlanningMap
                      stops={routeStops}
                      onAddStop={handleAddStop}
                      onRouteCalculated={handleRouteCalculated}
                    />
                  </div>
                  
                  {/* Right Column: Route Configuration */}
                  <div className="space-y-4">
                    <RouteStops
                      stops={routeStops}
                      onUpdateStop={(id, stop) => {
                        setRouteStops(routeStops.map(s => 
                          s.id === id ? { ...s, ...stop } : s
                        ));
                      }}
                      onRemoveStop={(id) => {
                        if (id !== "origin" && id !== "destination") {
                          setRouteStops(routeStops.filter(s => s.id !== id));
                        }
                      }}
                      onAddStop={handleAddStop}
                      deliveryDate={deliveryDate}
                      setDeliveryDate={setDeliveryDate}
                      timeWindowStart={timeWindowStart}
                      setTimeWindowStart={setTimeWindowStart}
                      timeWindowEnd={timeWindowEnd}
                      setTimeWindowEnd={setTimeWindowEnd}
                    />
                    
                    <RouteSettings
                      optimizationPriority={optimizationPriority}
                      setOptimizationPriority={setOptimizationPriority}
                      routeConstraints={routeConstraints}
                      setRouteConstraints={setRouteConstraints}
                      efficiencyBalance={efficiencyBalance}
                      setEfficiencyBalance={setEfficiencyBalance}
                    />
                    
                    <RouteDriverVehicle
                      selectedDriver={selectedDriver}
                      setSelectedDriver={setSelectedDriver}
                      selectedVehicle={selectedVehicle}
                      setSelectedVehicle={setSelectedVehicle}
                    />
                    
                    <RouteSummary
                      distance={routeDistance}
                      duration={routeDuration}
                      stops={routeStops}
                      vehicle={selectedVehicle}
                      constraints={routeConstraints}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled">
                <ScheduledRoutes />
              </TabsContent>
              
              <TabsContent value="history">
                <RouteHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <SaveRouteDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        routeData={{
          stops: routeStops,
          driver: selectedDriver,
          vehicle: selectedVehicle,
          optimizationPriority,
          constraints: routeConstraints,
          distance: routeDistance,
          duration: routeDuration,
          deliveryDate,
          timeWindowStart,
          timeWindowEnd,
        }}
      />
    </>
  );
}
