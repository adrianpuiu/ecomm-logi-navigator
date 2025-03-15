
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider } from "@/components/layout/Sidebar";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Navbar } from "@/components/layout/Navbar";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shipment from "./pages/Shipment";
import Shipments from "./pages/Shipments";
import CreateShipment from "./pages/CreateShipment";
import Carriers from "./pages/Carriers";
import CarrierDetail from "./pages/CarrierDetail";
import AddCarrier from "./pages/AddCarrier";
import RoutePlanning from "./pages/Routes";
import ReturnsManagement from "./pages/ReturnsManagement";
import ReturnDetail from "./pages/ReturnDetail";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import AddCustomer from "./pages/AddCustomer";
import Analytics from "./pages/Analytics";
import SameDayDelivery from "./pages/SameDayDelivery";
import Unauthorized from "./pages/Unauthorized";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

// Layout component with Sidebar
const Layout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen pt-16">
      <Navbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="relative min-h-screen">
              <Routes>
                {/* Unauthorized route */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected routes with layout */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/shipments" element={<Shipments />} />
                  <Route path="/shipments/create" element={<CreateShipment />} />
                  <Route path="/shipment/:id" element={<Shipment />} />
                  <Route path="/carriers" element={<Carriers />} />
                  <Route path="/carrier/:id" element={<CarrierDetail />} />
                  <Route path="/carriers/new" element={<AddCarrier />} />
                  <Route path="/routes" element={<RoutePlanning />} />
                  <Route path="/returns" element={<ReturnsManagement />} />
                  <Route path="/returns/:id" element={<ReturnDetail />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/customers/:id" element={<CustomerDetail />} />
                  <Route path="/customers/new" element={<AddCustomer />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/same-day-delivery" element={<SameDayDelivery />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
