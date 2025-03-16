
import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCw, ClipboardList, PackageCheck, PackageX, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReturnsTable } from "@/components/returns/ReturnsTable";
import { ReturnStatusFilter } from "@/components/returns/ReturnStatusFilter";
import { DateRangeFilter } from "@/components/shipment/DateRangeFilter";
import { CreateReturnDialog } from "@/components/returns/CreateReturnDialog";

export default function ReturnsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("all");
    setStartDate(undefined);
    setEndDate(undefined);
  };
  
  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || startDate || endDate;

  return (
    <>
      <Helmet>
        <title>Returns Management | LogiNav</title>
      </Helmet>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Returns Management</h1>
          <p className="text-muted-foreground">Process and track customer returns</p>
        </div>
        
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Return
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by RMA or order ID..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ReturnStatusFilter 
          onStatusChange={setSelectedStatus}
          selectedStatus={selectedStatus}
        />
        
        <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <ClipboardList size={16} />
            <span>Pending Returns</span>
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex items-center gap-2">
            <RefreshCw size={16} />
            <span>In Process</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <PackageCheck size={16} />
            <span>Completed</span>
          </TabsTrigger>
          <TabsTrigger value="denied" className="flex items-center gap-2">
            <PackageX size={16} />
            <span>Denied</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <ClipboardList size={18} className="text-primary" />
                Pending Returns
              </CardTitle>
              <CardDescription>
                Review and approve new return requests
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ReturnsTable 
                status="requested" 
                searchQuery={searchQuery}
                startDate={startDate}
                endDate={endDate}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <RefreshCw size={18} className="text-primary" />
                Returns In Process
              </CardTitle>
              <CardDescription>
                Track returns that are currently being processed
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ReturnsTable 
                status="in_transit,approved" 
                searchQuery={searchQuery}
                startDate={startDate}
                endDate={endDate}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <PackageCheck size={18} className="text-primary" />
                Completed Returns
              </CardTitle>
              <CardDescription>
                View all completed and processed returns
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ReturnsTable 
                status="completed,received" 
                searchQuery={searchQuery}
                startDate={startDate}
                endDate={endDate}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="denied" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <PackageX size={18} className="text-primary" />
                Denied Returns
              </CardTitle>
              <CardDescription>
                View returns that were rejected or denied
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ReturnsTable 
                status="rejected" 
                searchQuery={searchQuery}
                startDate={startDate}
                endDate={endDate}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <CreateReturnDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </>
  );
}
