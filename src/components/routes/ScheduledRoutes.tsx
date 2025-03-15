
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar, Search, MoreHorizontal, Truck, User, Clock } from "lucide-react";

// Mock scheduled routes data
const mockScheduledRoutes = [
  {
    id: "route-101",
    name: "Downtown Morning Delivery",
    date: new Date("2023-07-05"),
    driver: "John Doe",
    vehicle: "Truck 101",
    stops: 10,
    estimatedDistance: 62.4,
    estimatedDuration: 195,
    startTime: "08:00",
  },
  {
    id: "route-102",
    name: "North Suburb Afternoon Route",
    date: new Date("2023-07-05"),
    driver: "Jane Smith",
    vehicle: "Van 202",
    stops: 15,
    estimatedDistance: 84.3,
    estimatedDuration: 240,
    startTime: "13:30",
  },
  {
    id: "route-103",
    name: "West Industrial Zone",
    date: new Date("2023-07-06"),
    driver: "Mike Johnson",
    vehicle: "Truck 303",
    stops: 8,
    estimatedDistance: 53.8,
    estimatedDuration: 165,
    startTime: "09:15",
  },
  {
    id: "route-104",
    name: "South Retail Delivery",
    date: new Date("2023-07-07"),
    driver: "John Doe",
    vehicle: "Van 202",
    stops: 12,
    estimatedDistance: 71.2,
    estimatedDuration: 210,
    startTime: "10:00",
  },
];

export function ScheduledRoutes() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter routes based on search term
  const filteredRoutes = mockScheduledRoutes.filter(route => {
    return (
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Group routes by date
  const routesByDate = filteredRoutes.reduce((acc, route) => {
    const dateString = route.date.toDateString();
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(route);
    return acc;
  }, {} as Record<string, typeof mockScheduledRoutes>);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Scheduled Routes</h3>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search scheduled routes..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
        </div>
      </div>
      
      {Object.keys(routesByDate).length > 0 ? (
        Object.entries(routesByDate).map(([dateString, routes]) => (
          <div key={dateString} className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(dateString).toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Stops</TableHead>
                  <TableHead>Est. Distance</TableHead>
                  <TableHead>Est. Duration</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {route.startTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {route.driver}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                        {route.vehicle}
                      </div>
                    </TableCell>
                    <TableCell>{route.stops}</TableCell>
                    <TableCell>{route.estimatedDistance.toFixed(1)} km</TableCell>
                    <TableCell>
                      {Math.floor(route.estimatedDuration / 60)}h {route.estimatedDuration % 60}m
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit route</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel route</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No scheduled routes found matching your criteria
        </div>
      )}
    </div>
  );
}
