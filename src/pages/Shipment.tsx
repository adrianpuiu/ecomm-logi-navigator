
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

export default function Shipment() {
  const { id } = useParams<{ id: string }>();
  const { shipment, isLoading, error } = useFetchShipment(id);

  if (isLoading) {
    return <div className="ml-[240px] p-6">Loading shipment details...</div>;
  }

  if (error || !shipment) {
    return <div className="ml-[240px] p-6">Error loading shipment: {error?.message || 'Shipment not found'}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`Shipment ${shipment.carrier.trackingNumber} | Logistics TMS`}</title>
      </Helmet>

      <div className="ml-[240px] flex flex-col min-h-screen bg-background p-6">
        <ShipmentHeader shipment={shipment} />
        
        <div className="mt-6 space-y-6">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShipmentDetailsSection shipment={shipment} />
                <ShipmentAddressSection shipment={shipment} />
              </div>
            </TabsContent>
            
            <TabsContent value="items" className="pt-4">
              <ShipmentItemsSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="tracking" className="pt-4">
              <ShipmentTrackingSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="financials" className="pt-4">
              <ShipmentFinancialsSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="history" className="pt-4">
              <ShipmentHistorySection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="returns" className="pt-4">
              <ShipmentReturnsSection shipment={shipment} />
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-medium">Shipment Documents</h3>
                <p className="text-muted-foreground mt-2">
                  No documents available for this shipment.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
