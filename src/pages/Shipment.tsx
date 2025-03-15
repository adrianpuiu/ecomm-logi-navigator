
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFetchShipment } from '@/hooks/useFetchShipment';
import { ShipmentHeader } from '@/components/shipment/ShipmentHeader';
import { ShipmentDetailsSection } from '@/components/shipment/ShipmentDetailsSection';
import { ShipmentAddressSection } from '@/components/shipment/ShipmentAddressSection';
import { ShipmentItemsSection } from '@/components/shipment/ShipmentItemsSection';
import { ShipmentFinancialsSection } from '@/components/shipment/ShipmentFinancialsSection';
import { ShipmentTrackingSection } from '@/components/shipment/ShipmentTrackingSection';
import { ShipmentHistorySection } from '@/components/shipment/ShipmentHistorySection';
import { ShipmentReturnsSection } from '@/components/shipment/ShipmentReturnsSection';
import { Separator } from '@/components/ui/separator';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Shipment() {
  const { id } = useParams<{ id: string }>();
  const { shipment, isLoading, error } = useFetchShipment(id);

  if (isLoading) {
    return (
      <div className="ml-[240px] w-[calc(100%-240px)] flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Loading shipment details...</p>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="ml-[240px] w-[calc(100%-240px)] flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 p-8 text-center max-w-md">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold">Unable to load shipment</h2>
          <p className="text-muted-foreground">{error?.message || 'Shipment not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shipment ${shipment.carrier.trackingNumber} | Logistics TMS`}</title>
      </Helmet>

      <div className="ml-[240px] w-[calc(100%-240px)] flex flex-col min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <ShipmentHeader shipment={shipment} />
        
        <div className="mt-6 space-y-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-4 md:grid-cols-7 mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ShipmentDetailsSection shipment={shipment} />
                <ShipmentAddressSection shipment={shipment} />
              </div>
            </TabsContent>
            
            <TabsContent value="items" className="pt-2 animate-fade-in">
              <ShipmentItemsSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="tracking" className="pt-2 animate-fade-in">
              <ShipmentTrackingSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="financials" className="pt-2 animate-fade-in">
              <ShipmentFinancialsSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="history" className="pt-2 animate-fade-in">
              <ShipmentHistorySection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="returns" className="pt-2 animate-fade-in">
              <ShipmentReturnsSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="documents" className="pt-2 animate-fade-in">
              <div className="rounded-lg border bg-card shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <h3 className="text-lg font-medium">Shipment Documents</h3>
                </div>
                <div className="bg-muted/40 rounded-md p-8 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-3">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <path d="M12 13V7" />
                    <path d="M9 10l3 3 3-3" />
                  </svg>
                  <p className="text-muted-foreground mb-1">
                    No documents available for this shipment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Upload shipping documents, invoices, or custom forms
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
