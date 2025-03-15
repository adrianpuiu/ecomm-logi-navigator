
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
import { Calendar, MapPin, MoreHorizontal, Search, Clock } from "lucide-react";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";

// Mock historical route data
const mockRouteHistory = [
  {
    id: "route-001",
    name: "Downtown Delivery Route",
    date: new Date("2023-06-15"),
    driver: "John Doe",
    stops: 8,
    distance: 56.2,
    duration: 185,
    status: "completed",
  },
  {
    id: "route-002",
    name: "North Suburb Route",
    date: new Date("2023-06-14"),
    driver: "Jane Smith",
    stops: 12,
    distance: 78.5,
    duration: 245,
    status: "completed",
  },
  {
    id: "route-003",
    name: "East Industrial Route",
    date: new Date("2023-06-12"),
    driver: "Mike Johnson",
    stops: 5,
    distance: 42.8,
    duration: 120,
    status: "completed",
  },
  {
    id: "route-004",
    name: "West Mall Deliveries",
    date: new Date("2023-06-10"),
    driver: "John Doe",
    stops: 15,
    distance: 67.2,
    duration: 210,
    status: "cancelled",
  },
  {
    id: "route-005",
    name: "Airport Express Route",
    date: new Date("2023-06-08"),
    driver: "Jane Smith",
    stops: 3,
    distance: 35.6,
    duration: 85,
    status: "completed",
  },
];

export function RouteHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  
  // Filter routes based on search term and date range
  const filteredRoutes = mockRouteHistory.filter(route => {
    const matchesSearch = 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = 
      (!dateRange?.from || route.date >= dateRange.from) &&
      (!dateRange?.to || route.date <= dateRange.to);
    
    return matchesSearch && matchesDateRange;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Route History</h3>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search routes..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DateRangePicker
            dateRange={dateRange}
            onUpdate={setDateRange}
          />
        </div>
      </div>
      
      <Table>
        <TableCaption>A history of past delivery routes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Route Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Stops</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {route.date.toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>{route.driver}</TableCell>
                <TableCell>{route.stops}</TableCell>
                <TableCell>{route.distance.toFixed(1)} km</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {Math.floor(route.duration / 60)}h {route.duration % 60}m
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    route.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {route.status}
                  </span>
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
                      <DropdownMenuItem>Duplicate route</DropdownMenuItem>
                      <DropdownMenuItem>Export data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                No routes found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
