
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Search,
  MoreHorizontal,
  Truck,
  User,
  Clock,
  MapPin,
  CalendarCheck,
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  X,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LocateFixed,
  Route
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    status: "completed"
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
    status: "in_progress"
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
    status: "planned"
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
    status: "planned"
  },
  {
    id: "route-105",
    name: "East Healthcare Supplies",
    date: new Date("2023-07-06"),
    driver: "Sarah Williams",
    vehicle: "Refrigerated 505",
    stops: 7,
    estimatedDistance: 48.6,
    estimatedDuration: 180,
    startTime: "11:30",
    status: "planned"
  },
  {
    id: "route-106",
    name: "Central Business District",
    date: new Date("2023-07-08"),
    driver: "Robert Brown",
    vehicle: "Van 202",
    stops: 20,
    estimatedDistance: 92.7,
    estimatedDuration: 310,
    startTime: "07:45",
    status: "cancelled"
  },
];

// Get unique drivers from the data
const uniqueDrivers = [...new Set(mockScheduledRoutes.map(route => route.driver))];

export function ScheduledRoutes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [driverFilter, setDriverFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  
  // Sort and filter routes
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter routes based on all filters
  const filteredRoutes = mockScheduledRoutes.filter(route => {
    const matchesSearch = 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDriver = driverFilter === "all" || route.driver === driverFilter;
    
    let matchesDate = true;
    if (dateFilter === "today") {
      const today = new Date();
      matchesDate = route.date.toDateString() === today.toDateString();
    } else if (dateFilter === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      matchesDate = route.date.toDateString() === tomorrow.toDateString();
    } else if (dateFilter === "thisWeek") {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      matchesDate = route.date >= today && route.date <= nextWeek;
    }
    
    return matchesSearch && matchesDriver && matchesDate;
  });

  // Sort the filtered routes
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === "date") {
      comparison = a.date.getTime() - b.date.getTime();
    } else if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "driver") {
      comparison = a.driver.localeCompare(b.driver);
    } else if (sortField === "stops") {
      comparison = a.stops - b.stops;
    } else if (sortField === "distance") {
      comparison = a.estimatedDistance - b.estimatedDistance;
    } else if (sortField === "duration") {
      comparison = a.estimatedDuration - b.estimatedDuration;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  // Group routes by date
  const routesByDate = sortedRoutes.reduce((acc, route) => {
    const dateString = route.date.toDateString();
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(route);
    return acc;
  }, {} as Record<string, typeof mockScheduledRoutes>);

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
      case "planned":
        return <Badge variant="outline">Planned</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  
  // Toggle date expansion
  const toggleDateExpansion = (dateString: string) => {
    if (expandedDate === dateString) {
      setExpandedDate(null);
    } else {
      setExpandedDate(dateString);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setDriverFilter("all");
    setDateFilter("all");
  };
  
  return (
    <div className="space-y-6">
      {/* Header with title and stats */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-primary">Scheduled Routes</h3>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-9 gap-2">
              <Route className="h-4 w-4" />
              Create Route
            </Button>
            <Button className="h-9 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <CalendarCheck className="h-4 w-4" />
              Schedule
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Routes</p>
                <p className="text-2xl font-bold">{mockScheduledRoutes.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold">{mockScheduledRoutes.filter(r => r.status === "completed").length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600 font-medium">In Progress</p>
                <p className="text-2xl font-bold">{mockScheduledRoutes.filter(r => r.status === "in_progress").length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Planned</p>
                <p className="text-2xl font-bold">{mockScheduledRoutes.filter(r => r.status === "planned").length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <CalendarCheck className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Advanced search and filter bar */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-[350px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search routes by name, driver, or vehicle..."
              className="pl-10 pr-10 h-10 rounded-lg border-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-3"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-200 bg-white">
              <Select value={driverFilter} onValueChange={setDriverFilter}>
                <SelectTrigger className="w-[180px] border-0 focus:ring-0">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Drivers</SelectItem>
                  {uniqueDrivers.map((driver) => (
                    <SelectItem key={driver} value={driver}>{driver}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center rounded-lg border border-slate-200 bg-white">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px] border-0 focus:ring-0">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(searchTerm !== "" || driverFilter !== "all" || dateFilter !== "all") && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-10 px-3 text-muted-foreground hover:text-foreground"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Active filters display */}
        {(searchTerm !== "" || driverFilter !== "all" || dateFilter !== "all") && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            
            {searchTerm && (
              <Badge variant="outline" className="bg-slate-50 gap-1">
                <Search className="h-3 w-3" />
                {searchTerm}
                <button onClick={() => setSearchTerm("")}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            
            {driverFilter !== "all" && (
              <Badge variant="outline" className="bg-slate-50 gap-1">
                <User className="h-3 w-3" />
                Driver: {driverFilter}
                <button onClick={() => setDriverFilter("all")}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            
            {dateFilter !== "all" && (
              <Badge variant="outline" className="bg-slate-50 gap-1">
                <CalendarIcon className="h-3 w-3" />
                Date: {dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)}
                <button onClick={() => setDateFilter("all")}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
      
      {/* Routes by date sections */}
      {Object.keys(routesByDate).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(routesByDate).map(([dateString, routes]) => (
            <div key={dateString} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              {/* Date header - clickable to expand/collapse */}
              <button 
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                onClick={() => toggleDateExpansion(dateString)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold">
                      {new Date(dateString).toLocaleDateString(undefined, { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <p className="text-sm text-muted-foreground">{routes.length} routes scheduled</p>
                  </div>
                </div>
                <div>
                  {expandedDate === dateString ? 
                    <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </button>
              
              {/* Expanded routes table */}
              {(expandedDate === dateString || expandedDate === null) && (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead 
                          className="cursor-pointer" 
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center gap-2">
                            Route Name
                            {sortField === "name" && (
                              sortDirection === "asc" ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            Start Time
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort("driver")}
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            Driver
                            {sortField === "driver" && (
                              sortDirection === "asc" ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                            Vehicle
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort("stops")}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                            Stops
                            {sortField === "stops" && (
                              sortDirection === "asc" ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort("distance")}
                        >
                          <div className="flex items-center gap-2">
                            <LocateFixed className="h-3.5 w-3.5 text-muted-foreground" />
                            Est. Distance
                            {sortField === "distance" && (
                              sortDirection === "asc" ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort("duration")}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            Est. Duration
                            {sortField === "duration" && (
                              sortDirection === "asc" ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {routes.map((route) => (
                        <TableRow 
                          key={route.id}
                          className={cn(
                            "border-l-4 cursor-pointer transition-colors hover:bg-blue-50/50",
                            {
                              "border-l-green-500": route.status === "completed",
                              "border-l-blue-500": route.status === "in_progress",
                              "border-l-slate-300": route.status === "planned",
                              "border-l-red-500": route.status === "cancelled",
                            }
                          )}
                        >
                          <TableCell className="font-medium">
                            {route.name}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(route.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              {route.startTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center">
                                <User className="h-3.5 w-3.5 text-indigo-600" />
                              </div>
                              {route.driver}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                                <Truck className="h-3.5 w-3.5 text-blue-600" />
                              </div>
                              {route.vehicle}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-50">
                              {route.stops} stops
                            </Badge>
                          </TableCell>
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
                              <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Route className="mr-2 h-4 w-4" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Edit route
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Clock className="mr-2 h-4 w-4" />
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Cancel route
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">No scheduled routes found</h3>
          <p className="text-sm text-muted-foreground mb-6">
            No routes match your current filter criteria
          </p>
          <Button onClick={clearFilters} variant="outline">
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
