
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar, SidebarProvider } from "@/components/layout/Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleGuard } from "@/components/auth/RoleGuard";

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
import Auth from "./pages/Auth";
import Unauthorized from "./pages/Unauthorized";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

// Helper component to wrap routes with SidebarProvider
const WithSidebar = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <Sidebar />
    {children}
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen">
            <Routes>
              {/* Auth routes */}
              <Route path="/auth/login" element={<Auth />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected routes with sidebar */}
              <Route
                path="/"
                element={<WithSidebar><Index /></WithSidebar>}
              />
              <Route
                path="/shipments"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager", "customer_service"]}>
                    <WithSidebar><Shipments /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/shipments/create"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager"]}>
                    <WithSidebar><CreateShipment /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/shipment/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager", "customer_service", "shipper", "carrier"]}>
                    <WithSidebar><Shipment /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/carriers"
                element={
                  <RoleGuard allowedRoles={["administrator", "freight_manager", "transportation_manager"]}>
                    <WithSidebar><Carriers /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/carrier/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "freight_manager", "transportation_manager"]}>
                    <WithSidebar><CarrierDetail /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/carriers/new"
                element={
                  <RoleGuard allowedRoles={["administrator", "freight_manager"]}>
                    <WithSidebar><AddCarrier /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/routes"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager"]}>
                    <WithSidebar><RoutePlanning /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/returns"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "customer_service", "transportation_manager"]}>
                    <WithSidebar><ReturnsManagement /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/returns/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "customer_service", "transportation_manager"]}>
                    <WithSidebar><ReturnDetail /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/customers"
                element={
                  <RoleGuard allowedRoles={["administrator", "customer_service", "transportation_manager"]}>
                    <WithSidebar><Customers /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/customers/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "customer_service", "transportation_manager"]}>
                    <WithSidebar><CustomerDetail /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/customers/new"
                element={
                  <RoleGuard allowedRoles={["administrator", "customer_service", "transportation_manager"]}>
                    <WithSidebar><AddCustomer /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/analytics"
                element={
                  <RoleGuard allowedRoles={["administrator", "transportation_manager", "finance"]}>
                    <WithSidebar><Analytics /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/same-day-delivery"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager"]}>
                    <WithSidebar><SameDayDelivery /></WithSidebar>
                  </RoleGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "freight_manager", "master_data_specialist", "finance", "customer_service", "shipper", "carrier", "transportation_manager"]}>
                    <WithSidebar><UserProfile /></WithSidebar>
                  </RoleGuard>
                }
              />
              {/* Catch-all route */}
              <Route
                path="*"
                element={
                  <WithSidebar><NotFound /></WithSidebar>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
