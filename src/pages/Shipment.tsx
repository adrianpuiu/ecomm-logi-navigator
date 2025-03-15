
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ShipmentHeader } from "@/components/shipment/ShipmentHeader";
import { ShipmentDetailsSection } from "@/components/shipment/ShipmentDetailsSection";
import { ShipmentAddressSection } from "@/components/shipment/ShipmentAddressSection";
import { ShipmentItemsSection } from "@/components/shipment/ShipmentItemsSection";
import { ShipmentTrackingSection } from "@/components/shipment/ShipmentTrackingSection";
import { ShipmentHistorySection } from "@/components/shipment/ShipmentHistorySection";
import { ShipmentReturnsSection } from "@/components/shipment/ShipmentReturnsSection";
import { ShipmentFinancialsSection } from "@/components/shipment/ShipmentFinancialsSection";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchShipment } from "@/hooks/useFetchShipment";

export default function Shipment() {
  const { id } = useParams();
  const { shipment, isLoading, error } = useFetchShipment(id || "");
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <div className="min-h-screen bg-background antialiased">
      <Navbar />
      <Sidebar />
      
      <main className="transition-all duration-300 pt-16 pl-[240px]">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              asChild 
              className="mb-4"
            >
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <ChevronLeft size={16} />
                Back to Dashboard
              </Link>
            </Button>
            
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 p-4 rounded-md text-destructive">
                Error loading shipment details. Please try again.
              </div>
            ) : shipment ? (
              <>
                <ShipmentHeader shipment={shipment} />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  <div className="lg:col-span-2 space-y-6">
                    {activeTab === "details" && (
                      <>
                        <ShipmentDetailsSection shipment={shipment} />
                        <ShipmentAddressSection shipment={shipment} />
                        <ShipmentItemsSection shipment={shipment} />
                        <ShipmentTrackingSection shipment={shipment} />
                      </>
                    )}
                    {activeTab === "history" && (
                      <ShipmentHistorySection shipment={shipment} />
                    )}
                    {activeTab === "returns" && shipment.return && (
                      <ShipmentReturnsSection shipment={shipment} />
                    )}
                    {activeTab === "financial" && (
                      <ShipmentFinancialsSection shipment={shipment} />
                    )}
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-card rounded-lg border shadow-sm sticky top-20">
                      <div className="p-4 border-b">
                        <h3 className="font-medium">Shipment Navigation</h3>
                      </div>
                      <div className="p-2">
                        <ul className="space-y-1">
                          <li>
                            <Button 
                              variant={activeTab === "details" ? "default" : "ghost"} 
                              className="w-full justify-start"
                              onClick={() => setActiveTab("details")}
                            >
                              Shipment Details
                            </Button>
                          </li>
                          <li>
                            <Button 
                              variant={activeTab === "history" ? "default" : "ghost"} 
                              className="w-full justify-start"
                              onClick={() => setActiveTab("history")}
                            >
                              History & Logs
                            </Button>
                          </li>
                          {shipment.return && (
                            <li>
                              <Button 
                                variant={activeTab === "returns" ? "default" : "ghost"} 
                                className="w-full justify-start"
                                onClick={() => setActiveTab("returns")}
                              >
                                Returns
                              </Button>
                            </li>
                          )}
                          <li>
                            <Button 
                              variant={activeTab === "financial" ? "default" : "ghost"} 
                              className="w-full justify-start"
                              onClick={() => setActiveTab("financial")}
                            >
                              Financial Details
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-muted p-4 rounded-md">
                No shipment found with ID: {id}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
