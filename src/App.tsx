
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
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
                element={
                  <>
                    <Sidebar />
                    <Index />
                  </>
                }
              />
              <Route
                path="/shipments"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager", "customer_service"]}>
                    <Sidebar />
                    <Shipments />
                  </RoleGuard>
                }
              />
              <Route
                path="/shipments/create"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager"]}>
                    <Sidebar />
                    <CreateShipment />
                  </RoleGuard>
                }
              />
              <Route
                path="/shipment/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager", "customer_service", "shipper", "carrier"]}>
                    <Sidebar />
                    <Shipment />
                  </RoleGuard>
                }
              />
              <Route
                path="/carriers"
                element={
                  <RoleGuard allowedRoles={["administrator", "freight_manager", "transportation_manager"]}>
                    <Sidebar />
                    <Carriers />
                  </RoleGuard>
                }
              />
              <Route
                path="/carrier/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "freight_manager", "transportation_manager"]}>
                    <Sidebar />
                    <CarrierDetail />
                  </RoleGuard>
                }
              />
              <Route
                path="/carriers/new"
                element={
                  <RoleGuard allowedRoles={["administrator", "freight_manager"]}>
                    <Sidebar />
                    <AddCarrier />
                  </RoleGuard>
                }
              />
              <Route
                path="/routes"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager"]}>
                    <Sidebar />
                    <RoutePlanning />
                  </RoleGuard>
                }
              />
              <Route
                path="/returns"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "customer_service", "transportation_manager"]}>
                    <Sidebar />
                    <ReturnsManagement />
                  </RoleGuard>
                }
              />
              <Route
                path="/returns/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "customer_service", "transportation_manager"]}>
                    <Sidebar />
                    <ReturnDetail />
                  </RoleGuard>
                }
              />
              <Route
                path="/customers"
                element={
                  <RoleGuard allowedRoles={["administrator", "customer_service", "transportation_manager"]}>
                    <Sidebar />
                    <Customers />
                  </RoleGuard>
                }
              />
              <Route
                path="/customers/:id"
                element={
                  <RoleGuard allowedRoles={["administrator", "customer_service", "transportation_manager"]}>
                    <Sidebar />
                    <CustomerDetail />
                  </RoleGuard>
                }
              />
              <Route
                path="/customers/new"
                element={
                  <RoleGuard allowedRoles={["administrator", "customer_service", "transportation_manager"]}>
                    <Sidebar />
                    <AddCustomer />
                  </RoleGuard>
                }
              />
              <Route
                path="/analytics"
                element={
                  <RoleGuard allowedRoles={["administrator", "transportation_manager", "finance"]}>
                    <Sidebar />
                    <Analytics />
                  </RoleGuard>
                }
              />
              <Route
                path="/same-day-delivery"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "transportation_manager"]}>
                    <Sidebar />
                    <SameDayDelivery />
                  </RoleGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <RoleGuard allowedRoles={["administrator", "dispatcher", "planner", "freight_manager", "master_data_specialist", "finance", "customer_service", "shipper", "carrier", "transportation_manager"]}>
                    <Sidebar />
                    <UserProfile />
                  </RoleGuard>
                }
              />
              {/* Catch-all route */}
              <Route
                path="*"
                element={
                  <>
                    <Sidebar />
                    <NotFound />
                  </>
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
