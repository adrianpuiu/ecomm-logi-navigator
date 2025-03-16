
import { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Truck,
  RefreshCw,
  Route,
  Users,
  Timer,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Define navigation items
const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Shipments", path: "/shipments", icon: Package },
  { name: "Carriers", path: "/carriers", icon: Truck },
  { name: "Returns", path: "/returns", icon: RefreshCw },
  { name: "Route Planning", path: "/routes", icon: Route },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Same-Day Delivery", path: "/same-day-delivery", icon: Timer },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
];

export function NewSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  // Check if window width is mobile size and collapse sidebar by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    handleResize(); // Run on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col border-r transition-all duration-300 bg-background",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo section */}
      <div className="p-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Truck className="h-6 w-6 text-primary" />
          {!collapsed && (
            <span className="ml-2 font-semibold text-lg whitespace-nowrap">LogiNav TMS</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="h-8 w-8"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />
      
      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return collapsed ? (
              <Tooltip key={item.path} delayDuration={300}>
                <TooltipTrigger asChild>
                  <NavLink 
                    to={item.path}
                    className={cn(
                      "flex items-center justify-center rounded-md h-10 w-10 mx-auto my-1",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      {/* User section */}
      <div className={cn(
        "p-4 mt-auto border-t",
        collapsed ? "flex justify-center" : ""
      )}>
        <Link to="/profile">
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9 p-0">
            <Avatar className="h-9 w-9">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </div>
    </div>
  );
}
