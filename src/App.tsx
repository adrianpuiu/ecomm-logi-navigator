
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { NewSidebar } from "@/components/layout/NewSidebar";

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

// Layout component with the sidebar
const Layout = () => (
  <div className="flex min-h-screen bg-background">
    <NewSidebar />
    <div className="flex-1 flex flex-col min-h-screen ml-[70px] md:ml-[240px]">
      <Navbar />
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen">
          <Routes>
            {/* Unauthorized route */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Routes with layout */}
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
