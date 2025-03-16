
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider as ShadcnSidebarProvider
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth/useAuth";
import { 
  BarChart3, 
  Home, 
  Package, 
  Truck, 
  RefreshCw, 
  Route, 
  Users, 
  Timer, 
  Settings,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Export all shadcn sidebar components for external use
export {
  ShadcnSidebar as Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  ShadcnSidebarProvider as SidebarProvider
};

// This hook handles redirects for unauthenticated users
export function useAuthRedirect() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // All users are authenticated in our simplified version
    // This is just a placeholder if we need to reimplement auth later
  }, [isAuthenticated, isLoading, navigate, location.pathname]);

  return { isAuthenticated: true };
}

// Define the MainSidebar component that will be used in the app
export function MainSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <ShadcnSidebar>
      <SidebarHeader className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 px-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="text-xl font-medium">LogiNav TMS</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/shipments") || isActive("/shipment")}>
                  <Link to="/shipments">
                    <Package className="h-4 w-4" />
                    <span>Shipments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/carriers") || isActive("/carrier")}>
                  <Link to="/carriers">
                    <Truck className="h-4 w-4" />
                    <span>Carriers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/returns")}>
                  <Link to="/returns">
                    <RefreshCw className="h-4 w-4" />
                    <span>Returns</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/routes")}>
                  <Link to="/routes">
                    <Route className="h-4 w-4" />
                    <span>Route Planning</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/customers")}>
                  <Link to="/customers">
                    <Users className="h-4 w-4" />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/same-day-delivery")}>
                  <Link to="/same-day-delivery">
                    <Timer className="h-4 w-4" />
                    <span>Same-Day Delivery</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                  <Link to="/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Link to="/profile">
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9 p-0">
            <Avatar className="h-9 w-9">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
