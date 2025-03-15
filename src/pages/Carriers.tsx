
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  Search, 
  Plus, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Star, 
  FileText, 
  Truck, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle, 
  MoreHorizontal 
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CarriersTable } from "@/components/carriers/CarriersTable";
import { useIsMobile } from "@/hooks/use-mobile";

const Carriers = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <Helmet>
        <title>Carriers | LogiNav</title>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pt-16">
            <div className="container px-4 md:px-6 py-6 md:py-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Carrier Management</h1>
                  <p className="text-muted-foreground mt-1">Manage your transportation carriers and track their performance</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <Button asChild className="hidden md:flex">
                    <Link to="/carriers/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Carrier
                    </Link>
                  </Button>
                  <Button size="icon" variant="outline" className="hidden md:flex">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="animate-fade-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Active Carriers</CardTitle>
                    <CardDescription>Total carriers in your network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span className="text-2xl font-bold">43</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="animate-fade-in animation-delay-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">On-Time Performance</CardTitle>
                    <CardDescription>Average across all carriers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span className="text-2xl font-bold">91.4%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="animate-fade-in animation-delay-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Active Contracts</CardTitle>
                    <CardDescription>Contracts needing review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span className="text-2xl font-bold">26</span>
                      <Badge variant="outline" className="ml-2">
                        3 expiring soon
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search carriers..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SortAsc className="h-4 w-4" />
                </Button>
                <Button asChild className="md:hidden shrink-0">
                  <Link to="/carriers/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Link>
                </Button>
              </div>

              <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Carriers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="top">Top Performers</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <CarriersTable />
                </TabsContent>
                <TabsContent value="active" className="mt-4">
                  <CarriersTable filterStatus="Active" />
                </TabsContent>
                <TabsContent value="top" className="mt-4">
                  <CarriersTable topPerformers={true} />
                </TabsContent>
                <TabsContent value="issues" className="mt-4">
                  <CarriersTable filterStatus="Issues" />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Carriers;
