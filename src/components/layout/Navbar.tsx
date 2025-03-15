
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Truck, 
  ChevronDown, 
  BarChart3, 
  Package, 
  Settings,
  Search 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium">LogiNav</span>
          </Link>
          
          <div className="hidden md:flex ml-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Dashboard</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link to="/" className="glass-card flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md">
                            <BarChart3 className="h-6 w-6 text-primary" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Analytics Dashboard
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Get real-time insights into your logistics performance
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <NavItem href="/" title="Performance" icon={<BarChart3 className="h-4 w-4 mr-2" />}>
                        Monitor key performance indicators
                      </NavItem>
                      <NavItem href="/" title="Shipments" icon={<Package className="h-4 w-4 mr-2" />}>
                        Track and manage your active shipments
                      </NavItem>
                      <NavItem href="/" title="Settings" icon={<Settings className="h-4 w-4 mr-2" />}>
                        Configure your logistics preferences
                      </NavItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Shipments</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <NavItem href="/" title="Create New" icon={<Package className="h-4 w-4 mr-2" />}>
                        Start a new shipment workflow
                      </NavItem>
                      <NavItem href="/" title="Active Shipments" icon={<Truck className="h-4 w-4 mr-2" />}>
                        View all shipments in progress
                      </NavItem>
                      <NavItem href="/" title="History" icon={<BarChart3 className="h-4 w-4 mr-2" />}>
                        Review past shipment data
                      </NavItem>
                      <NavItem href="/" title="Returns" icon={<Package className="h-4 w-4 mr-2" />}>
                        Manage return logistics
                      </NavItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Carriers
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Analytics
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search shipments, orders..." 
              className="w-full rounded-full pl-8 pr-4 bg-secondary/50" 
            />
          </div>
          <Link 
            to="/" 
            className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-sm font-medium transition-colors"
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function NavItem({ href, title, children, icon }: NavItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
