
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptimizationPriority, RouteConstraint } from "@/types/route";

interface RouteOptimizationOptionsProps {
  optimizationPriority: OptimizationPriority;
  setOptimizationPriority: (priority: OptimizationPriority) => void;
  routeConstraints: RouteConstraint;
  setRouteConstraints: (constraints: RouteConstraint) => void;
}

export function RouteOptimizationOptions({
  optimizationPriority = "fastest",
  setOptimizationPriority = () => {},
  routeConstraints = {
    avoidTolls: false,
    avoidHighways: false,
    useRealTimeTraffic: true,
    allowUTurns: false,
  },
  setRouteConstraints = () => {},
}: RouteOptimizationOptionsProps) {
  
  const handlePriorityChange = (value: OptimizationPriority) => {
    setOptimizationPriority(value);
  };
  
  const handleConstraintChange = (key: keyof RouteConstraint, value: boolean) => {
    setRouteConstraints({
      ...routeConstraints,
      [key]: value,
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Route Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="priorities" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="priorities">Optimization Priority</TabsTrigger>
            <TabsTrigger value="constraints">Route Constraints</TabsTrigger>
          </TabsList>
          
          <TabsContent value="priorities" className="space-y-4 pt-4">
            <div className="space-y-4">
              <RadioGroup 
                value={optimizationPriority} 
                onValueChange={(value) => handlePriorityChange(value as OptimizationPriority)}
              >
                <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
                  <RadioGroupItem value="fastest" id="fastest" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="fastest" className="font-medium">Fastest Route</Label>
                    <p className="text-sm text-muted-foreground">
                      Prioritizes the quickest route by minimizing travel time. Best for time-sensitive deliveries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
                  <RadioGroupItem value="shortest" id="shortest" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="shortest" className="font-medium">Shortest Distance</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimizes the total distance traveled. Best for reducing fuel consumption and vehicle wear.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
                  <RadioGroupItem value="cost" id="cost" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="cost" className="font-medium">Lowest Cost</Label>
                    <p className="text-sm text-muted-foreground">
                      Balances time, distance, fuel, and toll costs to minimize overall expenses.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="constraints" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="avoid-tolls">Avoid Toll Roads</Label>
                  <p className="text-xs text-muted-foreground">May increase travel time or distance</p>
                </div>
                <Switch 
                  id="avoid-tolls" 
                  checked={routeConstraints.avoidTolls}
                  onCheckedChange={(checked) => handleConstraintChange('avoidTolls', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="avoid-highways">Avoid Highways</Label>
                  <p className="text-xs text-muted-foreground">Use local roads instead of highways</p>
                </div>
                <Switch 
                  id="avoid-highways" 
                  checked={routeConstraints.avoidHighways}
                  onCheckedChange={(checked) => handleConstraintChange('avoidHighways', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="real-time-traffic">Use Real-time Traffic</Label>
                  <p className="text-xs text-muted-foreground">Consider current traffic conditions</p>
                </div>
                <Switch 
                  id="real-time-traffic" 
                  checked={routeConstraints.useRealTimeTraffic}
                  onCheckedChange={(checked) => handleConstraintChange('useRealTimeTraffic', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-uturn">Allow U-turns</Label>
                  <p className="text-xs text-muted-foreground">Enable or restrict U-turns along the route</p>
                </div>
                <Switch 
                  id="allow-uturn" 
                  checked={routeConstraints.allowUTurns}
                  onCheckedChange={(checked) => handleConstraintChange('allowUTurns', checked)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-2">Algorithm Efficiency Balance</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Speed</span>
              <span>Quality</span>
            </div>
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={10}
              disabled={false}
            />
            <p className="text-xs text-muted-foreground text-center">
              Adjust the balance between quick calculations and higher quality optimization
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
