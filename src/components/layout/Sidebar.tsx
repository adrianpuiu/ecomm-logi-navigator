
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  BarChart3,
  Settings,
  History,
  ChevronRight,
  ArrowLeftRight,
  PanelLeft,
  Map
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex flex-col flex-grow p-2 space-y-1 overflow-y-auto">
        <SidebarItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          to="/" 
          active={location.pathname === "/"} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Package size={20} />} 
          label="Shipments" 
          to="/shipments" 
          active={location.pathname.startsWith("/shipment")} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Truck size={20} />} 
          label="Carriers" 
          to="/carriers" 
          active={location.pathname.startsWith("/carrier")} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Map size={20} />} 
          label="Route Planning" 
          to="/routes" 
          active={location.pathname.startsWith("/routes")} 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={<ArrowLeftRight size={20} />} 
          label="Returns" 
          to="/returns" 
          active={location.pathname.startsWith("/returns")} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          label="Customers" 
          to="/customers" 
          active={location.pathname.startsWith("/customers")} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<BarChart3 size={20} />} 
          label="Analytics" 
          to="/analytics" 
          active={location.pathname.startsWith("/analytics")} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<History size={20} />} 
          label="History" 
          to="/history" 
          active={location.pathname.startsWith("/history")} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          to="/settings" 
          active={location.pathname.startsWith("/settings")} 
          collapsed={collapsed}
        />
      </div>
      
      <div className="p-2 border-t">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 rounded-md hover:bg-accent"
        >
          <PanelLeft size={18} className={cn("transition-transform", collapsed ? "rotate-180" : "")} />
          {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

function SidebarItem({ icon, label, to, active = false, collapsed = false }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-2 py-2.5 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-primary/10 text-primary dark:bg-primary/20" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      {!collapsed && (
        <>
          <span className="ml-2 flex-grow">{label}</span>
          {active && <ChevronRight size={16} />}
        </>
      )}
    </Link>
  );
}
