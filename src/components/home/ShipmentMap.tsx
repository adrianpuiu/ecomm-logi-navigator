
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, TruckIcon } from "lucide-react";

export function ShipmentMap() {
  return (
    <Card className="shadow-sm animate-scale-in animation-delay-400">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Shipments Map</CardTitle>
            <CardDescription>Geographic view of shipments in transit</CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">18 Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 aspect-[16/9] sm:aspect-[21/9] overflow-hidden relative">
        {/* Map SVG Background */}
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900">
          <svg
            className="w-full h-full opacity-40 dark:opacity-20"
            viewBox="0 0 800 450"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* US Map Simplified Vector */}
            <path 
              d="M215,160 L245,125 L280,105 L320,85 L350,75 L390,65 L440,60 L490,65 L530,75 L570,90 L600,115 L620,150 L625,190 L615,230 L590,260 L550,285 L500,300 L450,310 L400,315 L350,310 L300,300 L260,280 L230,250 L210,210 L205,185 L215,160 Z" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="1.5" 
              strokeOpacity="0.6" 
            />
            
            {/* Major Cities/Routes */}
            <circle cx="235" cy="175" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="220" y="160" fontSize="10" fill="currentColor" opacity="0.7">Seattle</text>
            
            <circle cx="205" cy="205" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="180" y="200" fontSize="10" fill="currentColor" opacity="0.7">Portland</text>
            
            <circle cx="240" cy="250" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="245" y="255" fontSize="10" fill="currentColor" opacity="0.7">SF</text>
            
            <circle cx="270" cy="280" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="275" y="285" fontSize="10" fill="currentColor" opacity="0.7">LA</text>
            
            <circle cx="330" cy="250" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="335" y="255" fontSize="10" fill="currentColor" opacity="0.7">Vegas</text>
            
            <circle cx="400" cy="260" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="405" y="265" fontSize="10" fill="currentColor" opacity="0.7">Phoenix</text>
            
            <circle cx="450" cy="230" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="455" y="235" fontSize="10" fill="currentColor" opacity="0.7">Denver</text>
            
            <circle cx="480" cy="280" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="485" y="285" fontSize="10" fill="currentColor" opacity="0.7">Dallas</text>
            
            <circle cx="550" cy="290" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="555" y="295" fontSize="10" fill="currentColor" opacity="0.7">Houston</text>
            
            <circle cx="590" cy="250" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="580" y="240" fontSize="10" fill="currentColor" opacity="0.7">Atlanta</text>
            
            <circle cx="615" cy="200" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="620" y="205" fontSize="10" fill="currentColor" opacity="0.7">DC</text>
            
            <circle cx="620" cy="175" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="625" y="180" fontSize="10" fill="currentColor" opacity="0.7">NYC</text>
            
            <circle cx="615" cy="150" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="600" y="140" fontSize="10" fill="currentColor" opacity="0.7">Boston</text>
            
            <circle cx="550" cy="150" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <text x="535" y="140" fontSize="10" fill="currentColor" opacity="0.7">Chicago</text>
            
            {/* Active Shipment Routes */}
            <path 
              d="M240,250 C320,200 400,220 480,280" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="5,3" 
              strokeLinecap="round"
            />
            <path 
              d="M550,150 C580,170 610,190 615,200" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="5,3" 
              strokeLinecap="round"
            />
            <path 
              d="M620,175 C605,210 590,240 590,250" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="5,3" 
              strokeLinecap="round"
            />
            <path 
              d="M270,280 C340,270 410,265 480,280" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="5,3" 
              strokeLinecap="round"
            />
            
            {/* Active Trucks */}
            <g className="animate-float">
              <circle cx="350" cy="235" r="6" fill="#10b981" />
              <TruckIcon x="344" y="229" width="12" height="12" stroke="white" />
            </g>
            
            <g className="animate-float animation-delay-200">
              <circle cx="580" cy="180" r="6" fill="#10b981" />
              <TruckIcon x="574" y="174" width="12" height="12" stroke="white" />
            </g>
            
            <g className="animate-float animation-delay-400">
              <circle cx="350" cy="275" r="6" fill="#10b981" />
              <TruckIcon x="344" y="269" width="12" height="12" stroke="white" />
            </g>
            
            <g className="animate-float animation-delay-600">
              <circle cx="590" cy="230" r="6" fill="#10b981" />
              <TruckIcon x="584" y="224" width="12" height="12" stroke="white" />
            </g>
          </svg>
        </div>
        
        {/* Glass overlay with information */}
        <div className="absolute bottom-4 right-4 glass-morphism p-3 rounded-lg max-w-xs">
          <div className="text-sm font-medium mb-1">Active Routes</div>
          <div className="text-xs text-muted-foreground">
            18 shipments in transit across 12 states
          </div>
          <div className="mt-2 text-xs font-medium text-primary">Click to view detailed map</div>
        </div>
      </CardContent>
    </Card>
  );
}
