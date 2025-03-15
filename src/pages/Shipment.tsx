
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
import { Loader2, AlertCircle, Package, Boxes, Map, Receipt, History, RotateCcw, FileText } from 'lucide-react';

export default function Shipment() {
  const { id } = useParams<{ id: string }>();
  const { shipment, isLoading, error } = useFetchShipment(id);

  if (isLoading) {
    return (
      <div className="ml-[240px] w-[calc(100%-240px)] flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl bg-blue-200/30 dark:bg-blue-700/20 animate-pulse"></div>
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center shadow-md">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Loading Shipment Details</p>
            <p className="text-slate-500 dark:text-slate-400">Please wait while we retrieve your shipment information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="ml-[240px] w-[calc(100%-240px)] flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="flex flex-col items-center gap-5 p-8 text-center max-w-md">
          <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Unable to Load Shipment</h2>
          <p className="text-slate-600 dark:text-slate-400">{error?.message || 'Shipment not found. Please check the ID and try again.'}</p>
          <div className="w-full max-w-xs border-t border-slate-200 dark:border-slate-700 mt-3 pt-5">
            <a href="/shipments" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium inline-flex items-center">
              ← Return to Shipments
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shipment ${shipment.id} | Logistics TMS`}</title>
      </Helmet>

      <div className="ml-[240px] w-[calc(100%-240px)] flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white/70 dark:from-slate-950 dark:to-slate-900/90 p-4 md:p-6 lg:p-8">
        <ShipmentHeader shipment={shipment} />
        
        <div className="mt-8 space-y-6">
          <Tabs defaultValue="tracking" className="w-full">
            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/40 p-1.5 mb-8">
              <TabsList className="w-full grid grid-cols-4 md:grid-cols-7 h-auto p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg">
                <TabsTrigger value="details" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <Package size={16} className="mr-2" />
                  <span className="hidden sm:inline">Details</span>
                </TabsTrigger>
                <TabsTrigger value="items" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <Boxes size={16} className="mr-2" />
                  <span className="hidden sm:inline">Items</span>
                </TabsTrigger>
                <TabsTrigger value="tracking" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <Map size={16} className="mr-2" />
                  <span className="hidden sm:inline">Tracking</span>
                </TabsTrigger>
                <TabsTrigger value="financials" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <Receipt size={16} className="mr-2" />
                  <span className="hidden sm:inline">Financials</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <History size={16} className="mr-2" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
                <TabsTrigger value="returns" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <RotateCcw size={16} className="mr-2" />
                  <span className="hidden sm:inline">Returns</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm">
                  <FileText size={16} className="mr-2" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
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
              <div className="rounded-xl bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/40 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-5 border-b border-slate-200/60 dark:border-slate-700/40">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-900/40 dark:to-amber-800/30 flex items-center justify-center shadow-sm">
                    <FileText size={18} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Shipment Documents</h3>
                </div>
                <div className="bg-slate-50/70 dark:bg-slate-800/30 rounded-md m-6 p-10 flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    No Documents Available
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
                    Upload shipping documents, invoices, or customs forms for this shipment to keep all paperwork organized.
                  </p>
                  <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 font-medium rounded-lg flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
                    </svg>
                    Upload Document
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
