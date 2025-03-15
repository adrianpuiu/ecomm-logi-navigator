
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
