
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen">
          <Sidebar />
          <Routes>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
