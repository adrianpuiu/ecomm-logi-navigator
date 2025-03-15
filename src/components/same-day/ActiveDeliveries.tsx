
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Clock, Package, AlertCircle, LocateFixed, Truck } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mock data for active deliveries
const MOCK_ACTIVE_DELIVERIES = [
  {
    id: "DEL-5423",
    orderId: "ORD-23491",
    customer: "David Černý",
    items: 2,
    address: "Sokolovská 42, Prague 8, 18000",
    requestedWindow: "1:00 PM - 4:00 PM",
    estimatedArrival: "2:45 PM",
    status: "in_transit",
    driver: "Karel Jančík",
    vehicleId: "VAN-04",
    currentLocation: {
      latitude: 50.1038,
      longitude: 14.4683
    },
    progress: 65
  },
  {
    id: "DEL-5424",
    orderId: "ORD-23492",
    customer: "Anna Kovářová",
    items: 3,
    address: "Bělehradská 78, Prague 2, 12000",
    requestedWindow: "2:00 PM - 5:00 PM",
    estimatedArrival: "3:15 PM",
    status: "out_for_delivery",
    driver: "Tomáš Horák",
    vehicleId: "VAN-02",
    currentLocation: {
      latitude: 50.0755,
      longitude: 14.4378
    },
    progress: 45
  },
  {
    id: "DEL-5425",
    orderId: "ORD-23495",
    customer: "Petr Svoboda",
    items: 1,
    address: "Na Florenci 35, Prague 1, 11000",
    requestedWindow: "12:00 PM - 3:00 PM",
    estimatedArrival: "2:10 PM",
    status: "delayed",
    driver: "Jana Malá",
    vehicleId: "VAN-01",
    currentLocation: {
      latitude: 50.0891,
      longitude: 14.4376
    },
    progress: 70,
    delayReason: "Heavy traffic near city center"
  },
  {
    id: "DEL-5426",
    orderId: "ORD-23498",
    customer: "Marek Dvořák",
    items: 4,
    address: "Polská 15, Prague 2, 12000",
    requestedWindow: "3:00 PM - 6:00 PM",
    estimatedArrival: "4:00 PM",
    status: "picked_up",
    driver: "Martin Kos",
    vehicleId: "VAN-03",
    currentLocation: {
      latitude: 50.0813,
      longitude: 14.4507
    },
    progress: 25
  },
  {
    id: "DEL-5427",
    orderId: "ORD-23499",
    customer: "Lucie Němcová",
    items: 2,
    address: "Ohradní 65, Prague 4, 14000",
    requestedWindow: "2:00 PM - 5:00 PM",
    estimatedArrival: "4:30 PM",
    status: "exception",
    driver: "Pavel Krejčí",
    vehicleId: "VAN-05",
    currentLocation: {
      latitude: 50.0478,
      longitude: 14.4502
    },
    progress: 40,
    exceptionDetails: "Customer unavailable at delivery address"
  }
];

type DeliveryStatus = "picked_up" | "out_for_delivery" | "in_transit" | "delayed" | "exception" | "delivered";

interface ActiveDelivery {
  id: string;
  orderId: string;
  customer: string;
  items: number;
  address: string;
  requestedWindow: string;
  estimatedArrival: string;
  status: DeliveryStatus;
  driver: string;
  vehicleId: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  progress: number;
  delayReason?: string;
  exceptionDetails?: string;
}

export function ActiveDeliveries() {
  const [deliveries, setDeliveries] = useState<ActiveDelivery[]>(MOCK_ACTIVE_DELIVERIES);
  const [selectedDelivery, setSelectedDelivery] = useState<ActiveDelivery | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem("mapbox_token"));
  const [showTokenInput, setShowTokenInput] = useState<boolean>(!mapboxToken);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [markerInstances, setMarkerInstances] = useState<{[key: string]: mapboxgl.Marker}>({});

  // Status colors for badges and markers
  const statusColors: Record<DeliveryStatus, { bg: string, text: string, marker: string }> = {
    picked_up: { bg: "bg-purple-100", text: "text-purple-800", marker: "#9c27b0" },
    out_for_delivery: { bg: "bg-blue-100", text: "text-blue-800", marker: "#2196f3" },
    in_transit: { bg: "bg-cyan-100", text: "text-cyan-800", marker: "#00bcd4" },
    delayed: { bg: "bg-orange-100", text: "text-orange-800", marker: "#ff9800" },
    exception: { bg: "bg-red-100", text: "text-red-800", marker: "#f44336" },
    delivered: { bg: "bg-green-100", text: "text-green-800", marker: "#4caf50" }
  };

  // Status text for display
  const statusText: Record<DeliveryStatus, string> = {
    picked_up: "Picked Up",
    out_for_delivery: "Out for Delivery",
    in_transit: "In Transit",
    delayed: "Delayed",
    exception: "Exception",
    delivered: "Delivered"
  };

  // Initialize map
  useEffect(() => {
    if (!mapboxToken || showTokenInput || !selectedDelivery) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      const mapContainer = document.getElementById('delivery-map');
      if (!mapContainer) return;
      
      const map = new mapboxgl.Map({
        container: 'delivery-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [14.4378, 50.0755], // Center of Prague
        zoom: 12
      });
      
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      setMapInstance(map);

      // Add markers when map loads
      map.on('load', () => {
        // Clear existing markers
        Object.values(markerInstances).forEach(marker => marker.remove());
        const newMarkers: {[key: string]: mapboxgl.Marker} = {};
        
        // Add markers for all deliveries
        deliveries.forEach(delivery => {
          const { latitude, longitude } = delivery.currentLocation;
          
          // Create marker element
          const el = document.createElement('div');
          el.className = 'delivery-marker';
          el.style.width = '30px';
          el.style.height = '30px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = statusColors[delivery.status].marker;
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
          el.style.cursor = 'pointer';
          
          if (delivery.id === selectedDelivery.id) {
            el.style.width = '40px';
            el.style.height = '40px';
            el.style.zIndex = '10';
          }

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <strong>${delivery.customer}</strong><br>
            ${statusText[delivery.status]}<br>
            ETA: ${delivery.estimatedArrival}
          `);

          // Add marker to map
          const marker = new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);
            
          newMarkers[delivery.id] = marker;
        });
        
        setMarkerInstances(newMarkers);
        
        // Fly to selected delivery
        if (selectedDelivery) {
          const { latitude, longitude } = selectedDelivery.currentLocation;
          map.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true
          });
        }
      });

      return () => {
        map.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapboxToken, showTokenInput, selectedDelivery, deliveries]);

  const handleSaveToken = () => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
      setShowTokenInput(false);
    }
  };

  const handleSelectDelivery = (delivery: ActiveDelivery) => {
    setSelectedDelivery(delivery);
    
    // If map is already initialized, fly to the new location
    if (mapInstance && delivery) {
      const { latitude, longitude } = delivery.currentLocation;
      mapInstance.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        essential: true
      });
    }
  };

  // Filter deliveries based on selected status
  const filteredDeliveries = filterStatus === "all" 
    ? deliveries 
    : deliveries.filter(d => d.status === filterStatus);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Live Deliveries</CardTitle>
            <CardDescription>
              {filteredDeliveries.length} active same-day deliveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={filterStatus} onValueChange={setFilterStatus}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="in_transit">In Transit</TabsTrigger>
                <TabsTrigger value="exception">Issues</TabsTrigger>
              </TabsList>
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredDeliveries.map((delivery) => (
                  <div 
                    key={delivery.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDelivery?.id === delivery.id 
                        ? 'bg-primary/5 border-primary' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => handleSelectDelivery(delivery)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{delivery.customer}</span>
                      <Badge className={`${statusColors[delivery.status].bg} ${statusColors[delivery.status].text}`}>
                        {statusText[delivery.status]}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin size={14} />
                      <span className="truncate">{delivery.address}</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-muted-foreground" />
                        <span>ETA: {delivery.estimatedArrival}</span>
                      </div>
                      <div className="text-xs bg-primary/10 px-2 py-0.5 rounded">
                        {delivery.driver}
                      </div>
                    </div>
                    {(delivery.status === "delayed" || delivery.status === "exception") && (
                      <div className="mt-2 text-xs bg-red-50 text-red-800 p-2 rounded">
                        {delivery.delayReason || delivery.exceptionDetails}
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredDeliveries.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No deliveries matching the selected filter
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2 space-y-6">
        <Card className="h-[600px]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Live Tracking Map</CardTitle>
              {selectedDelivery && (
                <Badge variant="outline">
                  Viewing delivery {selectedDelivery.id}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)]">
            {showTokenInput ? (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <MapPin size={32} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Mapbox API Token Required</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Enter your Mapbox public token to view the interactive delivery map
                </p>
                <div className="w-full max-w-md">
                  <input
                    type="text"
                    value={mapboxToken || ''}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="pk.eyJ1Ijoi..."
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <Button onClick={handleSaveToken} className="w-full">
                    Save Token & Show Map
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {!selectedDelivery ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <LocateFixed size={32} className="mb-2" />
                    <p>Select a delivery to view its location</p>
                  </div>
                ) : (
                  <div className="h-full">
                    <div id="delivery-map" className="h-full rounded-md"></div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
        
        {selectedDelivery && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Delivery Details: {selectedDelivery.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Customer</div>
                    <div className="font-medium">{selectedDelivery.customer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Order ID</div>
                    <div className="font-medium">{selectedDelivery.orderId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Items</div>
                    <div className="font-medium">{selectedDelivery.items} items</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Delivery Window</div>
                    <div className="font-medium">{selectedDelivery.requestedWindow}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">ETA</div>
                    <div className="font-medium">{selectedDelivery.estimatedArrival}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge className={`${statusColors[selectedDelivery.status].bg} ${statusColors[selectedDelivery.status].text}`}>
                      {statusText[selectedDelivery.status]}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Driver</div>
                    <div className="font-medium">{selectedDelivery.driver}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Vehicle</div>
                    <div className="font-medium">{selectedDelivery.vehicleId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Delivery Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{width: `${selectedDelivery.progress}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedDelivery.status === "delayed" && (
                <Alert className="mt-4 bg-orange-50 text-orange-800 border-orange-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {selectedDelivery.delayReason}
                  </AlertDescription>
                </Alert>
              )}
              
              {selectedDelivery.status === "exception" && (
                <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {selectedDelivery.exceptionDetails}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">Contact Driver</Button>
                <Button variant="outline" size="sm">Send Customer Update</Button>
                <Button size="sm">Manage Delivery</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
