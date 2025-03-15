
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Navigation, 
  Milestone, 
  Compass, 
  ArrowUpRight, 
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface ShipmentTrackingSectionProps {
  shipment: ShipmentType;
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'delivered':
      return <CheckCircle size={16} className="text-emerald-500" />;
    case 'delayed':
    case 'exception':
      return <AlertCircle size={16} className="text-orange-500" />;
    case 'in_transit':
      return <Truck size={16} className="text-blue-500" />;
    case 'out_for_delivery':
      return <Navigation size={16} className="text-indigo-500" />;
    case 'picked_up':
      return <Milestone size={16} className="text-purple-500" />;
    case 'processing':
      return <Clock size={16} className="text-amber-500" />;
    case 'created':
      return <Compass size={16} className="text-slate-500" />;
    default:
      return <Clock size={16} className="text-slate-500" />;
  }
}

export function ShipmentTrackingSection({ shipment }: ShipmentTrackingSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'timeline' | 'map'>('map'); // Default to map view
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem("mapbox_token"));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  
  const sortedTrackingHistory = [...shipment.trackingHistory].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const statusColors = {
    created: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    processing: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50",
    picked_up: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/50",
    in_transit: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
    out_for_delivery: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50",
    delivered: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50",
    delayed: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/50",
    exception: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50",
  };

  // Initialize Mapbox map when component mounts
  useEffect(() => {
    if (!mapboxToken || showTokenInput || !mapContainerRef.current || viewMode !== 'map') return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-95.7129, 37.0902], // Center of US
        zoom: 3,
        attributionControl: true
      });
      
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
          showCompass: true,
        }),
        'top-left'
      );
      
      // Add terrain and sky layer for more visual appeal
      map.current.on('style.load', () => {
        // Add custom sky layer
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 210, 255)',
          'horizon-blend': 0.1,
        });
      });

      // Mock coordinates for each event (normally these would come from the API)
      const mockCoordinates = [
        [-118.2437, 34.0522],  // Los Angeles
        [-122.3301, 37.8270],  // San Francisco 
        [-122.6765, 45.5231],  // Portland
        [-122.3321, 47.6062],  // Seattle
      ];

      // Create markers and add them to the map
      const chronologicalEvents = [...shipment.trackingHistory].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      chronologicalEvents.forEach((event, index) => {
        if (index < mockCoordinates.length) {
          const [lng, lat] = mockCoordinates[index];
          
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.width = '24px';
          el.style.height = '24px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = getMarkerColor(event.status);
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
          
          if (index === mockCoordinates.length - 1) {
            // Add pulse animation for the latest marker
            const pulse = document.createElement('div');
            pulse.className = 'marker-pulse';
            pulse.style.position = 'absolute';
            pulse.style.width = '50px';
            pulse.style.height = '50px';
            pulse.style.borderRadius = '50%';
            pulse.style.backgroundColor = `${getMarkerColor(event.status)}50`;
            pulse.style.transform = 'translate(-13px, -13px)';
            pulse.style.animation = 'pulse 2s infinite';
            el.appendChild(pulse);
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
              @keyframes pulse {
                0% { transform: translate(-13px, -13px) scale(1); opacity: 0.8; }
                70% { transform: translate(-13px, -13px) scale(2); opacity: 0; }
                100% { transform: translate(-13px, -13px) scale(1); opacity: 0; }
              }
            `;
            document.head.appendChild(style);
          }

          // Create popup with improved styling
          const popup = new mapboxgl.Popup({ 
            offset: 25,
            closeButton: false,
            maxWidth: '300px',
            className: 'custom-popup' // For custom CSS
          }).setHTML(`
            <div style="padding: 4px">
              <div style="font-weight: bold; margin-bottom: 4px; color: #334155;">${formatDate(event.timestamp)}</div>
              <div style="margin-bottom: 4px;">${event.description}</div>
              <div style="font-size: 12px; color: #64748b;">${event.location}</div>
            </div>
          `);

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map.current!);
        }
      });

      // Draw route line between points
      if (mockCoordinates.length >= 2 && map.current) {
        map.current.on('load', () => {
          map.current?.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': mockCoordinates
              }
            }
          });
          
          // Add animated line for routes
          map.current?.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#4F46E5',
              'line-width': 4,
              'line-opacity': 0.75,
              'line-dasharray': [0, 4, 3],
            }
          });

          // Add glow effect
          map.current?.addLayer({
            'id': 'route-glow',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#818CF8',
              'line-width': 8,
              'line-opacity': 0.15,
            }
          }, 'route');

          // Animated line dash
          let step = 0;
          function animateDashArray(timestamp) {
            // Update line-dasharray
            step = (step + 1) % 60;
            map.current?.setPaintProperty('route', 'line-dasharray', [
              0,
              4 + step/4,
              3,
            ]);
            
            window.requestAnimationFrame(animateDashArray);
          }
          
          window.requestAnimationFrame(animateDashArray);

          // Fit map to show all markers
          const bounds = new mapboxgl.LngLatBounds();
          mockCoordinates.forEach(coord => {
            bounds.extend(new mapboxgl.LngLat(coord[0], coord[1]));
          });
          map.current?.fitBounds(bounds, { padding: 60 });
        });
      }

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapboxToken, showTokenInput, viewMode, shipment.trackingHistory]);
  
  const getMarkerColor = (status: string): string => {
    switch (status) {
      case 'created': return '#64748b';
      case 'processing': return '#f59e0b';
      case 'picked_up': return '#8b5cf6';
      case 'in_transit': return '#3b82f6';
      case 'out_for_delivery': return '#4f46e5';
      case 'delivered': return '#10b981';
      case 'delayed': return '#f97316';
      case 'exception': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const handleSaveToken = () => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
      setShowTokenInput(false);
    }
  };
  
  return (
    <Card className="shadow-md overflow-hidden border border-indigo-100/40 dark:border-slate-700/40 bg-white dark:bg-slate-900/60 backdrop-blur-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4 bg-gradient-to-r from-indigo-50/80 to-blue-50/50 dark:from-indigo-950/30 dark:to-slate-800/30 border-b border-indigo-100/30 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
                <Globe size={18} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Shipment Tracking</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time location and delivery updates
                </CardDescription>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent className="animate-fade-in">
          <CardContent className="px-6 pb-6 pt-4">
            <div className="flex justify-end mb-4">
              <div className="flex space-x-2 bg-slate-100/70 dark:bg-slate-800/50 p-1 rounded-lg">
                <Button 
                  variant={viewMode === 'timeline' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                  className={viewMode === 'timeline' 
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }
                >
                  <Clock size={15} className="mr-1.5" /> Timeline
                </Button>
                <Button 
                  variant={viewMode === 'map' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={viewMode === 'map' 
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }
                >
                  <MapPin size={15} className="mr-1.5" /> Map View
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50/20 dark:from-slate-800/50 dark:to-blue-900/10 rounded-xl p-5 mb-6 border border-slate-200/60 dark:border-slate-700/40 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">Current Location</span>
                        <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                          {sortedTrackingHistory[0]?.location || "Unknown"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 ml-11">
                      <Clock size={12} />
                      Last updated: {formatDate(sortedTrackingHistory[0]?.timestamp || "")}
                    </div>
                    
                    <div className="mt-4 ml-11">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                        <Truck size={12} />
                        <span>Delivery Progress</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-800/60 rounded-lg p-3 border border-slate-200/70 dark:border-slate-700/40 flex flex-col">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</div>
                      <div className="flex justify-between items-center">
                        <Badge className={cn(
                          "font-medium text-xs", 
                          statusColors[shipment.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                        )}>
                          {getStatusIcon(shipment.status)}
                          <span className="ml-1.5 capitalize">{shipment.status.replace('_', ' ')}</span>
                        </Badge>
                        <a href="#tracking-details" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-xs font-medium flex items-center">
                          Details <ArrowUpRight size={12} className="ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-slate-800/60 rounded-lg p-3 border border-slate-200/70 dark:border-slate-700/40">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Expected Delivery</div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{formatDate(shipment.expectedDelivery)}</div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800/60 rounded-lg p-3 border border-slate-200/70 dark:border-slate-700/40">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Carrier</div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{shipment.carrier.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {viewMode === 'timeline' ? (
                <div id="tracking-details" className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200/70 dark:border-slate-700/40 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Clock size={15} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">Shipment Timeline</h3>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-3 top-1.5 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-slate-200 dark:from-indigo-500 dark:via-blue-500 dark:to-slate-700" />
                    
                    {sortedTrackingHistory.map((event, index) => (
                      <div key={index} className="flex gap-4 mb-6 last:mb-0 relative">
                        <div className="z-10 mt-1.5">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            index === 0 
                              ? "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-md" 
                              : "bg-slate-200 dark:bg-slate-700"
                          )}>
                            {index === 0 
                              ? <span className="text-white">{getStatusIcon(event.status)}</span>
                              : <span className="text-slate-500 dark:text-slate-400">{getStatusIcon(event.status)}</span>
                            }
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className={cn(
                            "p-4 rounded-lg border transition-all", 
                            index === 0 
                              ? "bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-indigo-900/20 border-indigo-100 dark:border-indigo-900/30 shadow-sm" 
                              : "bg-white dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/40"
                          )}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                              <span className={cn(
                                "font-medium capitalize", 
                                index === 0 ? "text-indigo-700 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"
                              )}>
                                {event.status.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 sm:text-right">
                                {formatDate(event.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{event.description}</p>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <MapPin size={10} className="text-slate-400" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[600px] bg-slate-100 dark:bg-slate-800/50 rounded-xl flex flex-col overflow-hidden border border-slate-200/70 dark:border-slate-700/40 shadow-sm">
                  {showTokenInput ? (
                    <div className="h-full flex flex-col items-center justify-center p-6">
                      <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                        <MapPin size={28} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">Interactive Map</h3>
                      <p className="text-center text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                        Enter your Mapbox public token to view the interactive shipment tracking map
                      </p>
                      <div className="w-full max-w-md space-y-3">
                        <input
                          type="text"
                          value={mapboxToken || ''}
                          onChange={(e) => setMapboxToken(e.target.value)}
                          placeholder="pk.eyJ1Ijoi..."
                          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        />
                        <Button onClick={handleSaveToken} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5">
                          <Globe size={16} className="mr-2" />
                          Save Token & Show Map
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div ref={mapContainerRef} className="h-full w-full rounded-lg" />
                  )}
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200/70 dark:border-slate-700/40 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">Shipping Details</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-lg p-4 border border-slate-200/70 dark:border-slate-700/40">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Origin</span>
                    </div>
                    <div className="ml-6">
                      <div className="text-sm text-slate-800 dark:text-slate-200 font-medium mb-1">{shipment.sender.companyName}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{`${shipment.sender.address.street}, ${shipment.sender.address.city}`}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{`${shipment.sender.address.state} ${shipment.sender.address.zipCode}, ${shipment.sender.address.country}`}</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-lg p-4 border border-slate-200/70 dark:border-slate-700/40">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Destination</span>
                    </div>
                    <div className="ml-6">
                      <div className="text-sm text-slate-800 dark:text-slate-200 font-medium mb-1">{shipment.recipient.companyName}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{`${shipment.recipient.address.street}, ${shipment.recipient.address.city}`}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{`${shipment.recipient.address.state} ${shipment.recipient.address.zipCode}, ${shipment.recipient.address.country}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
