
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
        <CardTitle>Optimization Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Route Priority</h4>
          <RadioGroup 
            value={optimizationPriority} 
            onValueChange={(value) => handlePriorityChange(value as OptimizationPriority)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fastest" id="fastest" />
              <Label htmlFor="fastest">Fastest Route</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shortest" id="shortest" />
              <Label htmlFor="shortest">Shortest Distance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cost" id="cost" />
              <Label htmlFor="cost">Lowest Cost</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Additional Options</h4>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="avoid-tolls">Avoid Toll Roads</Label>
            <Switch 
              id="avoid-tolls" 
              checked={routeConstraints.avoidTolls}
              onCheckedChange={(checked) => handleConstraintChange('avoidTolls', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="avoid-highways">Avoid Highways</Label>
            <Switch 
              id="avoid-highways" 
              checked={routeConstraints.avoidHighways}
              onCheckedChange={(checked) => handleConstraintChange('avoidHighways', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="real-time-traffic">Use Real-time Traffic</Label>
            <Switch 
              id="real-time-traffic" 
              checked={routeConstraints.useRealTimeTraffic}
              onCheckedChange={(checked) => handleConstraintChange('useRealTimeTraffic', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-uturn">Allow U-turns</Label>
            <Switch 
              id="allow-uturn" 
              checked={routeConstraints.allowUTurns}
              onCheckedChange={(checked) => handleConstraintChange('allowUTurns', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
