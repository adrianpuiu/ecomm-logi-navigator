
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  RotateCcw,
  Truck,
  Users,
  Route,
  Timer,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Shipments", href: "/shipments", icon: Boxes },
    { name: "Carriers", href: "/carriers", icon: Truck },
    { name: "Routes", href: "/routes", icon: Route },
    { name: "Returns", href: "/returns", icon: RotateCcw },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Same-Day Delivery", href: "/same-day-delivery", icon: Timer },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-0 z-20 flex h-full w-[240px] flex-col border-r bg-background">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span className="text-xl">Logistics TMS</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              isActive(item.href)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            <item.icon
              className={cn(
                isActive(item.href)
                  ? "text-accent-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
                "mr-3 h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
