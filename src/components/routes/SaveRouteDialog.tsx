
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RouteStop, RouteConstraint, OptimizationPriority, Driver, Vehicle } from "@/types/route";
import { saveRoute } from "@/utils/routeUtils";
import { Loader2 } from "lucide-react";

interface SaveRouteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routeData: {
    stops: RouteStop[];
    driver: Driver | null;
    vehicle: Vehicle | null;
    optimizationPriority: OptimizationPriority;
    constraints: RouteConstraint;
    distance: number;
    duration: number;
    deliveryDate: string;
    timeWindowStart: string;
    timeWindowEnd: string;
  };
}

export function SaveRouteDialog({
  open,
  onOpenChange,
  routeData
}: SaveRouteDialogProps) {
  const [routeName, setRouteName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Calculate time window dates if provided
      let timeWindow = undefined;
      if (routeData.deliveryDate && (routeData.timeWindowStart || routeData.timeWindowEnd)) {
        const dateBase = new Date(routeData.deliveryDate);
        timeWindow = {
          start: routeData.timeWindowStart 
            ? new Date(`${routeData.deliveryDate}T${routeData.timeWindowStart}`)
            : dateBase,
          end: routeData.timeWindowEnd
            ? new Date(`${routeData.deliveryDate}T${routeData.timeWindowEnd}`)
            : dateBase,
        };
      }
      
      const savedRoute = await saveRoute({
        name: routeName,
        date: routeData.deliveryDate ? new Date(routeData.deliveryDate) : new Date(),
        timeWindow,
        stops: routeData.stops,
        driver: routeData.driver,
        vehicle: routeData.vehicle,
        optimizationPriority: routeData.optimizationPriority,
        constraints: routeData.constraints,
        status: "planned",
        distance: routeData.distance,
        duration: routeData.duration,
      });
      
      if (savedRoute) {
        toast({
          title: "Route Saved",
          description: `Route "${routeName}" has been saved successfully.`
        });
        onOpenChange(false);
        setRouteName("");
      }
    } catch (error) {
      console.error("Error saving route:", error);
      toast({
        title: "Error",
        description: "Failed to save the route. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Route</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="route-name">Route Name</Label>
            <Input
              id="route-name"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Enter a name for this route"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Route Summary</Label>
            <div className="bg-muted/20 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance:</span>
                <span>{(routeData.distance / 1000).toFixed(1)} km</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>
                  {Math.floor(routeData.duration / 3600)}h {Math.floor((routeData.duration % 3600) / 60)}m
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stops:</span>
                <span>{routeData.stops.length}</span>
              </div>
              
              {routeData.deliveryDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Date:</span>
                  <span>{new Date(routeData.deliveryDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {routeData.driver && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Driver:</span>
                  <span>{routeData.driver.name}</span>
                </div>
              )}
              
              {routeData.vehicle && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span>{routeData.vehicle.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!routeName.trim() || isSaving}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Route"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
