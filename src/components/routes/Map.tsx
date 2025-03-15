
import { useEffect, useRef, useState } from "react";
import { MapPin, Route, Navigation, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem("mapbox_token"));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);

  // This is a placeholder for the actual map implementation
  // In a real application, you would use the Mapbox GL JS library or similar
  
  const handleSaveToken = () => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
      setShowTokenInput(false);
      // Here you would initialize the map with the token
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
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" /> Add Stop
              </Button>
              <Button variant="outline" size="sm">
                <Route className="h-4 w-4 mr-1" /> Show Route
              </Button>
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-1" /> Center
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
