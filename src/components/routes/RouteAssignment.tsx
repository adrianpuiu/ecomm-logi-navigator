
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Search,
  Filter,
} from "lucide-react";

// Mock data for routes pending assignment
const mockPendingRoutes = [
  {
    id: "route-201",
    name: "Downtown Express",
    date: new Date("2023-07-10"),
    timeWindow: "08:00 - 12:00",
    stops: 8,
    estimatedDistance: 58.4,
    estimatedDuration: 180,
    priority: "high",
    specialRequirements: ["refrigerated", "hazmat"]
  },
  {
    id: "route-202",
    name: "North Suburb Delivery",
    date: new Date("2023-07-10"),
    timeWindow: "09:00 - 14:00",
    stops: 12,
    estimatedDistance: 72.6,
    estimatedDuration: 210,
    priority: "medium",
    specialRequirements: []
  },
  {
    id: "route-203",
    name: "East Industrial Zone",
    date: new Date("2023-07-11"),
    timeWindow: "10:00 - 15:00",
    stops: 6,
    estimatedDistance: 45.2,
    estimatedDuration: 150,
    priority: "low",
    specialRequirements: ["hazmat"]
  },
  {
    id: "route-204",
    name: "South Mall Delivery",
    date: new Date("2023-07-12"),
    timeWindow: "08:30 - 12:30",
    stops: 10,
    estimatedDistance: 63.8,
    estimatedDuration: 195,
    priority: "high",
    specialRequirements: ["refrigerated"]
  },
];

// Mock data for available drivers
const mockAvailableDrivers = [
  { 
    id: "d1", 
    name: "John Doe", 
    status: "available", 
    certifications: ["hazmat", "refrigerated"] 
  },
  { 
    id: "d2", 
    name: "Jane Smith", 
    status: "available", 
    certifications: ["refrigerated"] 
  },
  { 
    id: "d3", 
    name: "Mike Johnson", 
    status: "on_route", 
    certifications: ["hazmat"] 
  },
  { 
    id: "d4", 
    name: "Sara Williams", 
    status: "available", 
    certifications: [] 
  },
];

// Mock data for available vehicles
const mockAvailableVehicles = [
  { 
    id: "v1", 
    name: "Truck 101", 
    type: "semi", 
    status: "available", 
    features: ["refrigerated", "hazmat"] 
  },
  { 
    id: "v2", 
    name: "Van 202", 
    type: "van", 
    status: "available", 
    features: [] 
  },
  { 
    id: "v3", 
    name: "Truck 303", 
    type: "box", 
    status: "maintenance", 
    features: ["refrigerated"] 
  },
  { 
    id: "v4", 
    name: "Van 404", 
    type: "van", 
    status: "available", 
    features: ["hazmat"] 
  },
];

export function RouteAssignment() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [driverFilter, setDriverFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get the selected route
  const selectedRoute = mockPendingRoutes.find(route => route.id === selectedRouteId);
  
  // Filter drivers based on filter and search
  const filteredDrivers = mockAvailableDrivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      driverFilter === "all" || 
      (driverFilter === "available" && driver.status === "available") ||
      (driverFilter === "certified" && 
       selectedRoute?.specialRequirements.every(req => driver.certifications.includes(req)));
    
    return matchesSearch && matchesFilter;
  });
  
  // Filter vehicles based on filter and search
  const filteredVehicles = mockAvailableVehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      vehicleFilter === "all" || 
      (vehicleFilter === "available" && vehicle.status === "available") ||
      (vehicleFilter === "suitable" && 
       selectedRoute?.specialRequirements.every(req => vehicle.features.includes(req)));
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Pending Routes */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Pending Routes</CardTitle>
          <CardDescription>Routes waiting for driver and vehicle assignment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPendingRoutes.map((route) => (
            <div 
              key={route.id}
              className={`rounded-lg border p-3 cursor-pointer hover:bg-muted transition-colors ${
                selectedRouteId === route.id ? 'bg-muted border-primary' : ''
              }`}
              onClick={() => setSelectedRouteId(route.id)}
            >
              <div className="font-medium">{route.name}</div>
              
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {route.date.toLocaleDateString()}
              </div>
              
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {route.timeWindow}
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-sm">{route.stops} stops</span>
                <Badge variant={
                  route.priority === "high" 
                    ? "destructive" 
                    : route.priority === "medium" 
                      ? "default" 
                      : "secondary"
                }>
                  {route.priority} priority
                </Badge>
              </div>
              
              {route.specialRequirements.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {route.specialRequirements.map(req => (
                    <Badge key={req} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Driver and Vehicle Assignment */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Assign Resources</CardTitle>
          <CardDescription>
            {selectedRoute 
              ? `Assign driver and vehicle to "${selectedRoute.name}"`
              : "Select a route from the left panel to assign resources"}
          </CardDescription>
        </CardHeader>
        
        {selectedRoute ? (
          <CardContent className="space-y-6">
            {/* Resource Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search drivers and vehicles..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={driverFilter} onValueChange={setDriverFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter drivers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Drivers</SelectItem>
                  <SelectItem value="available">Available Drivers</SelectItem>
                  <SelectItem value="certified">Certified Drivers</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="available">Available Vehicles</SelectItem>
                  <SelectItem value="suitable">Suitable Vehicles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Available Drivers */}
            <div>
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <User className="h-4 w-4" />
                Available Drivers
              </h4>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Compatibility</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver) => {
                      const isCompatible = selectedRoute.specialRequirements.every(
                        req => driver.certifications.includes(req)
                      );
                      
                      return (
                        <TableRow key={driver.id}>
                          <TableCell className="font-medium">{driver.name}</TableCell>
                          <TableCell>
                            <Badge variant={driver.status === "available" ? "default" : "secondary"}>
                              {driver.status === "available" ? "Available" : "On Route"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {driver.certifications.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {driver.certifications.map(cert => (
                                  <Badge key={cert} variant="outline" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">None</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isCompatible ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Compatible
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                Missing certifications
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              disabled={driver.status !== "available" || !isCompatible}
                            >
                              Assign
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                        No drivers found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Available Vehicles */}
            <div>
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4" />
                Available Vehicles
              </h4>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Compatibility</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => {
                      const isCompatible = selectedRoute.specialRequirements.every(
                        req => vehicle.features.includes(req)
                      );
                      
                      return (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">{vehicle.name}</TableCell>
                          <TableCell>{vehicle.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                vehicle.status === "available" 
                                  ? "default" 
                                  : vehicle.status === "maintenance" 
                                    ? "destructive" 
                                    : "secondary"
                              }
                            >
                              {vehicle.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {vehicle.features.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {vehicle.features.map(feature => (
                                  <Badge key={feature} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">None</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isCompatible ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Compatible
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                Missing features
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              disabled={vehicle.status !== "available" || !isCompatible}
                            >
                              Assign
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        No vehicles found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        ) : (
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            Select a route from the left panel to assign drivers and vehicles
          </CardContent>
        )}
      </Card>
    </div>
  );
}
