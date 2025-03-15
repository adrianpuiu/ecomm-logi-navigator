
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardStatsCard } from "@/components/home/DashboardStatsCard";
import { ShipmentsTable } from "@/components/home/ShipmentsTable";
import { PerformanceChart } from "@/components/home/PerformanceChart";
import { CarrierPerformance } from "@/components/home/CarrierPerformance";
import { QuickActions } from "@/components/home/QuickActions";
import { ShipmentMap } from "@/components/home/ShipmentMap";
import { DeliveryStatus } from "@/components/home/DeliveryStatus";
import { 
  Truck, 
  Package, 
  Clock, 
  Users 
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background antialiased">
      <Navbar />
      <Sidebar />
      
      <main className="transition-all duration-300 pt-16 pl-[240px]">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Logistics Dashboard</h1>
            <p className="text-muted-foreground mt-1 animate-fade-in animation-delay-200">
              Monitor and manage your e-commerce logistics operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <DashboardStatsCard
              title="Active Shipments"
              value="248"
              description="18 more than yesterday"
              trend="up"
              trendValue="+7.8%"
              icon={<Truck size={18} />}
              className="animate-scale-in"
            />
            <DashboardStatsCard
              title="Delivered Today"
              value="186"
              description="12 less than yesterday"
              trend="down"
              trendValue="-6.1%"
              icon={<Package size={18} />}
              className="animate-scale-in animation-delay-200"
            />
            <DashboardStatsCard
              title="On-Time Delivery"
              value="94.2%"
              description="2.1% improvement this week"
              trend="up"
              trendValue="+2.1%"
              icon={<Clock size={18} />}
              className="animate-scale-in animation-delay-400"
            />
            <DashboardStatsCard
              title="New Customers"
              value="27"
              description="5 more than yesterday"
              trend="up"
              trendValue="+22.7%"
              icon={<Users size={18} />}
              className="animate-scale-in animation-delay-600"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <QuickActions />
            </div>
            <div>
              <DeliveryStatus />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PerformanceChart />
            <CarrierPerformance />
          </div>
          
          <div className="mb-6">
            <ShipmentMap />
          </div>
          
          <div className="mb-6">
            <ShipmentsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
