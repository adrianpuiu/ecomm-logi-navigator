
import { OptimizationPriority, RouteConstraint } from "@/types/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Clock, Route, Calculator } from "lucide-react";

interface RouteSettingsProps {
  optimizationPriority: OptimizationPriority;
  setOptimizationPriority: (priority: OptimizationPriority) => void;
  routeConstraints: RouteConstraint;
  setRouteConstraints: (constraints: RouteConstraint) => void;
  efficiencyBalance: number;
  setEfficiencyBalance: (value: number) => void;
}

export function RouteSettings({
  optimizationPriority,
  setOptimizationPriority,
  routeConstraints,
  setRouteConstraints,
  efficiencyBalance,
  setEfficiencyBalance,
}: RouteSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm font-medium">Optimization Priority</div>
          <RadioGroup 
            value={optimizationPriority}
            onValueChange={(value) => setOptimizationPriority(value as OptimizationPriority)}
            className="gap-2"
          >
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
              <RadioGroupItem value="fastest" id="fastest" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="fastest" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Fastest Route
                </Label>
                <p className="text-sm text-muted-foreground">
                  Prioritize speed and minimize travel time
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
              <RadioGroupItem value="shortest" id="shortest" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="shortest" className="flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  Shortest Distance
                </Label>
                <p className="text-sm text-muted-foreground">
                  Minimize total distance traveled
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
              <RadioGroupItem value="cost" id="cost" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="cost" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Lowest Cost
                </Label>
                <p className="text-sm text-muted-foreground">
                  Balance time, distance, and operational costs
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm font-medium">Route Constraints</div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Avoid Toll Roads</Label>
                <p className="text-xs text-muted-foreground">May increase travel time</p>
              </div>
              <Switch
                checked={routeConstraints.avoidTolls}
                onCheckedChange={(checked) =>
                  setRouteConstraints({ ...routeConstraints, avoidTolls: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Avoid Highways</Label>
                <p className="text-xs text-muted-foreground">Use local roads when possible</p>
              </div>
              <Switch
                checked={routeConstraints.avoidHighways}
                onCheckedChange={(checked) =>
                  setRouteConstraints({ ...routeConstraints, avoidHighways: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Use Real-time Traffic</Label>
                <p className="text-xs text-muted-foreground">Consider current conditions</p>
              </div>
              <Switch
                checked={routeConstraints.useRealTimeTraffic}
                onCheckedChange={(checked) =>
                  setRouteConstraints({ ...routeConstraints, useRealTimeTraffic: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow U-turns</Label>
                <p className="text-xs text-muted-foreground">Enable when needed</p>
              </div>
              <Switch
                checked={routeConstraints.allowUTurns}
                onCheckedChange={(checked) =>
                  setRouteConstraints({ ...routeConstraints, allowUTurns: checked })
                }
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="text-sm font-medium">Algorithm Efficiency</div>
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Faster Calculation</span>
              <span>Higher Quality</span>
            </div>
            <Slider
              value={[efficiencyBalance]}
              onValueChange={([value]) => setEfficiencyBalance(value)}
              max={100}
              step={10}
            />
            <p className="text-xs text-muted-foreground text-center">
              Balance between calculation speed and optimization quality
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
