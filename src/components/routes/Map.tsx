
import { useEffect, useRef, useState } from "react";
import { MapPin, Route, Navigation, AlertTriangle, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";
import { RouteStop } from "@/types/route";

interface MapProps {
  stops?: RouteStop[];
  onAddStop?: (stop: RouteStop) => void;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

export function Map({ stops = [], onAddStop, onRouteCalculated }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem("mapbox_token"));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const [mapStyle, setMapStyle] = useState<string>("mapbox://styles/mapbox/streets-v12");
  const { toast } = useToast();
  
  useEffect(() => {
    if (!mapboxToken || showTokenInput || !mapContainerRef.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: [-95.7129, 37.0902],
        zoom: 3.5,
        attributionControl: true
      });
      
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
      map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
      
      mapRef.current = map;
      
      if (stops.length > 0) {
        addMarkersToMap(map, stops);
      }
      
      map.on('click', (e) => {
        if (onAddStop) {
          const { lng, lat } = e.lngLat;
          reverseGeocode(lng, lat, mapboxToken).then((address) => {
            const newStop: RouteStop = {
              id: `stop-${Date.now()}`,
              address: address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
              latitude: lat,
              longitude: lng,
              type: "waypoint"
            };
            onAddStop(newStop);
          });
        }
      });
      
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
  }, [mapboxToken, showTokenInput, mapStyle, stops, onAddStop, toast]);

  useEffect(() => {
    if (!mapRef.current || !mapboxToken || showTokenInput) return;
    
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    addMarkersToMap(mapRef.current, stops);
    
    if (stops.length >= 2) {
      const coordinates = stops
        .filter(stop => stop.longitude && stop.latitude)
        .map(stop => [stop.longitude, stop.latitude]);
      
      if (coordinates.length >= 2) {
        drawRoute(mapRef.current, coordinates, mapboxToken);
      }
    }
  }, [stops, mapboxToken, showTokenInput]);

  const addMarkersToMap = (map: mapboxgl.Map, stops: RouteStop[]) => {
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
      el.style.backgroundColor = getMarkerColor(stop.type);
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.innerHTML = String(index + 1);
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${getStopTypeLabel(stop.type)}</strong><br>${stop.address}`
      );
      
      new mapboxgl.Marker(el)
        .setLngLat([stop.longitude, stop.latitude])
        .setPopup(popup)
        .addTo(map);
    });
  };

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case "origin": return '#4CAF50';
      case "destination": return '#F44336';
      case "waypoint": return '#2196F3';
      default: return '#9C27B0';
    }
  };

  const getStopTypeLabel = (type: string): string => {
    switch (type) {
      case "origin": return 'Starting Point';
      case "destination": return 'Destination';
      case "waypoint": return 'Stop';
      default: return 'Location';
    }
  };

  const drawRoute = async (map: mapboxgl.Map, coordinates: number[][], token: string) => {
    try {
      if (map.getLayer('route')) map.removeLayer('route');
      if (map.getSource('route')) map.removeSource('route');
      
      // Validate coordinates to ensure they are valid [lng, lat] pairs
      const validCoordinates = coordinates.filter(
        coord => Array.isArray(coord) && coord.length === 2 && 
        !isNaN(coord[0]) && !isNaN(coord[1])
      ) as [number, number][];
      
      if (validCoordinates.length < 2) {
        toast({
          title: "Invalid Route",
          description: "Not enough valid coordinates to draw a route.",
          variant: "destructive"
        });
        return;
      }
      
      const coordString = validCoordinates.map(coord => coord.join(',')).join(';');
      
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordString}?geometries=geojson&access_token=${token}`
      );
      
      if (!response.ok) throw new Error('Direction API request failed');
      
      const data = await response.json();
      
      if (!data.routes || !data.routes.length) {
        toast({
          title: "Route not found",
          description: "Could not find a valid route between the stops.",
          variant: "destructive"
        });
        return;
      }
      
      const route = data.routes[0].geometry;
      const distance = data.routes[0].distance; // Distance in meters
      const duration = data.routes[0].duration; // Duration in seconds
      
      // Call the callback with route metrics if provided
      if (onRouteCalculated) {
        onRouteCalculated(distance, duration);
      }
      
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route
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
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
      
      const bounds = validCoordinates.reduce((bounds, coord) => {
        return bounds.extend(coord as mapboxgl.LngLatLike);
      }, new mapboxgl.LngLatBounds(validCoordinates[0] as mapboxgl.LngLatLike, validCoordinates[0] as mapboxgl.LngLatLike));
      
      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    } catch (error) {
      console.error("Error fetching route:", error);
      toast({
        title: "Routing Error",
        description: "Failed to calculate the route between stops.",
        variant: "destructive"
      });
    }
  };

  const reverseGeocode = async (lng: number, lat: number, token: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
      );
      
      if (!response.ok) throw new Error('Geocoding API request failed');
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      
      return null;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return null;
    }
  };

  const handleSaveToken = () => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
      setShowTokenInput(false);
      toast({
        title: "Mapbox Token Saved",
        description: "Your Mapbox token has been saved and the map has been initialized."
      });
    }
  };

  const handleCenterMap = () => {
    if (!mapRef.current) return;
    
    if (stops.length >= 2) {
      const coordinates = stops
        .filter(stop => stop.longitude && stop.latitude)
        .map(stop => [stop.longitude, stop.latitude] as [number, number]);
      
      if (coordinates.length > 0) {
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord as mapboxgl.LngLatLike);
        }, new mapboxgl.LngLatBounds(coordinates[0] as mapboxgl.LngLatLike, coordinates[0] as mapboxgl.LngLatLike));
        
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
        return;
      }
    }
    
    mapRef.current.flyTo({
      center: [-95.7129, 37.0902],
      zoom: 3.5
    });
  };

  const toggleMapStyle = () => {
    if (mapStyle === "mapbox://styles/mapbox/streets-v12") {
      setMapStyle("mapbox://styles/mapbox/satellite-streets-v12");
    } else {
      setMapStyle("mapbox://styles/mapbox/streets-v12");
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-md overflow-hidden">
      {showTokenInput ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/90">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mapbox API Token Required</h3>
          <p className="text-muted-foreground text-center mb-4">
            To display the interactive map, please enter your Mapbox public token.
            You can get one at <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>.
          </p>
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input 
              id="mapbox-token"
              value={mapboxToken || ''}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUxMjM0In0.example"
            />
            <Button onClick={handleSaveToken} className="w-full">
              Save Token & Initialize Map
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainerRef} className="w-full h-full" />
          <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={toggleMapStyle}>
                <Layers className="h-4 w-4 mr-1" /> Toggle Style
              </Button>
              <Button variant="outline" size="sm" onClick={handleCenterMap}>
                <Navigation className="h-4 w-4 mr-1" /> Center
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
