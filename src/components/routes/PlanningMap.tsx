
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RouteStop } from "@/types/route";
import { Globe, Navigation, Layers } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface PlanningMapProps {
  stops: RouteStop[];
  onAddStop?: (stop: RouteStop) => void;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

export function PlanningMap({ 
  stops, 
  onAddStop,
  onRouteCalculated 
}: PlanningMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(
    localStorage.getItem("mapbox_token")
  );
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");
  const { toast } = useToast();

  // Initialize map
  useEffect(() => {
    if (!mapboxToken || showTokenInput || !mapContainerRef.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: [-95.7129, 37.0902], // Center of US
        zoom: 3.5,
        attributionControl: true
      });
      
      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }), 
        'top-left'
      );
      
      mapRef.current = map;
      
      // Handle map click for adding stops
      map.on('click', (e) => {
        if (onAddStop) {
          const { lng, lat } = e.lngLat;
          reverseGeocode(lng, lat).then(address => {
            const newStop: RouteStop = {
              id: `stop-${Date.now()}`,
              address: address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
              type: "waypoint",
              latitude: lat,
              longitude: lng
            };
            onAddStop(newStop);
          });
        }
      });
      
      return () => map.remove();
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "Failed to initialize the map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  }, [mapboxToken, showTokenInput, mapStyle, onAddStop, toast]);

  // Update markers and route when stops change
  useEffect(() => {
    if (!mapRef.current || !mapboxToken || showTokenInput) return;
    
    const map = mapRef.current;
    
    // Clear existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    // Add markers for stops
    stops.forEach((stop, index) => {
      if (!stop.latitude || !stop.longitude) return;
      
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      // Set color based on stop type
      switch (stop.type) {
        case "origin":
          el.style.backgroundColor = '#22c55e'; // Green
          break;
        case "destination":
          el.style.backgroundColor = '#ef4444'; // Red
          break;
        default:
          el.style.backgroundColor = '#3b82f6'; // Blue
      }
      
      el.innerHTML = String(index + 1);
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${stop.type === 'origin' ? 'Start' : 
                   stop.type === 'destination' ? 'End' : 
                   'Stop'} ${index + 1}</strong>
         <p>${stop.address}</p>`
      );
      
      new mapboxgl.Marker(el)
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(popup)
        .addTo(map);
    });
    
    // Draw route if we have at least 2 stops with coordinates
    const validStops = stops.filter(stop => stop.latitude && stop.longitude);
    if (validStops.length >= 2) {
      drawRoute(validStops);
    }
  }, [stops, mapboxToken, showTokenInput, toast]);

  // Draw route between stops
  const drawRoute = async (validStops: RouteStop[]) => {
    if (!mapRef.current || !mapboxToken) return;
    
    const map = mapRef.current;
    
    try {
      // Remove existing route
      if (map.getLayer('route')) map.removeLayer('route');
      if (map.getSource('route')) map.removeSource('route');
      
      // Create coordinates string for API call
      const coordinates = validStops
        .map(stop => `${stop.longitude},${stop.latitude}`)
        .join(';');
      
      // Get route from Mapbox API
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxToken}`
      );
      
      if (!response.ok) throw new Error('Direction API request failed');
      
      const data = await response.json();
      
      if (!data.routes?.[0]) {
        throw new Error('No route found');
      }
      
      const route = data.routes[0];
      
      // Add route to map
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route.geometry
        }
      });
      
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
      
      // Fit bounds to show all stops
      const bounds = validStops.reduce((bounds, stop) => {
        return bounds.extend([stop.longitude, stop.latitude] as [number, number]);
      }, new mapboxgl.LngLatBounds([validStops[0].longitude, validStops[0].latitude], [validStops[0].longitude, validStops[0].latitude]));
      
      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
      
      // Report route metrics
      if (onRouteCalculated) {
        onRouteCalculated(route.distance, route.duration);
      }
    } catch (error) {
      console.error('Error drawing route:', error);
      toast({
        title: "Route Error",
        description: "Failed to calculate the route between stops.",
        variant: "destructive"
      });
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = async (lng: number, lat: number): Promise<string | null> => {
    if (!mapboxToken) return null;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) throw new Error('Geocoding API request failed');
      
      const data = await response.json();
      
      if (data.features?.[0]) {
        return data.features[0].place_name;
      }
      
      return null;
    } catch (error) {
      console.error('Error geocoding:', error);
      return null;
    }
  };

  const handleSaveToken = (token: string) => {
    if (token) {
      localStorage.setItem("mapbox_token", token);
      setMapboxToken(token);
      setShowTokenInput(false);
      toast({
        title: "Token Saved",
        description: "Your Mapbox token has been saved successfully."
      });
    }
  };

  const toggleMapStyle = () => {
    const newStyle = mapStyle === "mapbox://styles/mapbox/streets-v12"
      ? "mapbox://styles/mapbox/satellite-streets-v12"
      : "mapbox://styles/mapbox/streets-v12";
    setMapStyle(newStyle);
  };

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardContent className="p-0 relative h-full">
        {showTokenInput ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 p-8">
            <div className="text-center space-y-4 max-w-md">
              <Globe className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-lg font-semibold">Mapbox Token Required</h3>
              <p className="text-sm text-muted-foreground">
                Please provide your Mapbox public token to enable the interactive map.
                You can get one at{" "}
                <a 
                  href="https://www.mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <input
                type="text"
                placeholder="Enter your Mapbox token"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button 
                onClick={() => handleSaveToken(mapboxToken || "")}
                disabled={!mapboxToken}
              >
                Save Token
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute top-4 right-4 bg-background/95 p-2 rounded-lg shadow-lg">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={toggleMapStyle}>
                  <Layers className="h-4 w-4 mr-2" />
                  Toggle Style
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
