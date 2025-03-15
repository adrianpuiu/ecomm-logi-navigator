
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { Card } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";

interface ShipmentsByRegionMapProps {
  dateRange: DateRange | undefined;
}

// Define a proper type for our region data with correctly typed coordinates
interface RegionData {
  name: string;
  shipments: number;
  percentage: number;
  coordinates: [number, number]; // This ensures it's a tuple of exactly 2 numbers
}

export function ShipmentsByRegionMap({ dateRange }: ShipmentsByRegionMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem("mapbox_token"));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const { toast } = useToast();

  // Mock data - in a real app, this would be fetched based on the date range
  // Ensure our regions data conforms to the RegionData type
  const regions: RegionData[] = [
    { name: "Northeast", shipments: 1245, percentage: 28, coordinates: [-74.0060, 40.7128] }, // NYC
    { name: "Southeast", shipments: 873, percentage: 19, coordinates: [-84.3880, 33.7490] }, // Atlanta
    { name: "Midwest", shipments: 645, percentage: 14, coordinates: [-87.6298, 41.8781] }, // Chicago
    { name: "Southwest", shipments: 522, percentage: 12, coordinates: [-95.3698, 29.7604] }, // Houston
    { name: "West", shipments: 921, percentage: 21, coordinates: [-118.2437, 34.0522] }, // LA
    { name: "Other", shipments: 267, percentage: 6, coordinates: [-122.4194, 37.7749] }, // SF
  ];

  useEffect(() => {
    if (!mapboxToken || showTokenInput || !mapContainerRef.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-95.7129, 37.0902], // Center of US
        zoom: 3,
        attributionControl: true,
        interactive: true
      });
      
      mapRef.current = map;
      
      map.on('load', () => {
        // Add markers for each region
        regions.forEach(region => {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'flex flex-col items-center';
          
          const pinEl = document.createElement('div');
          pinEl.className = 'w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white';
          pinEl.innerHTML = `<span style="font-size: 10px;">${region.percentage}%</span>`;
          
          markerEl.appendChild(pinEl);
          
          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-medium">${region.name}</h3>
                <p>${region.shipments.toLocaleString()} shipments (${region.percentage}%)</p>
              </div>
            `);
          
          // Add marker to map - now using properly typed coordinates that match LngLatLike
          new mapboxgl.Marker(markerEl)
            .setLngLat(region.coordinates)
            .setPopup(popup)
            .addTo(map);
        });
      });
      
      // Clean up on unmount
      return () => {
        map.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "Failed to initialize the map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  }, [mapboxToken, showTokenInput, regions, toast]);

  return (
    <div className="space-y-4">
      {showTokenInput ? (
        <div className="flex justify-center items-center h-36 bg-muted/20 rounded-md border border-dashed">
          <div className="text-center text-muted-foreground">
            <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Mapbox token required to display regional shipment map</p>
            <p className="text-xs mt-2">
              Get your token from <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">mapbox.com</a> 
              and add it on the Routes page
            </p>
          </div>
        </div>
      ) : (
        <div className="h-60 rounded-md overflow-hidden border">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      )}
      
      <div className="space-y-3 mt-4">
        {regions.map((region) => (
          <div key={region.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{region.name}</span>
              <span className="font-medium">{region.shipments.toLocaleString()} shipments ({region.percentage}%)</span>
            </div>
            <Progress 
              value={region.percentage} 
              className="h-2" 
              indicatorClassName={`bg-${region.name === "Northeast" ? "blue" : 
                                   region.name === "Southeast" ? "green" : 
                                   region.name === "Midwest" ? "yellow" : 
                                   region.name === "Southwest" ? "red" : 
                                   region.name === "West" ? "purple" : 
                                   "gray"}-500`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
