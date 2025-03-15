
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { 
  ArrowLeft, 
  PencilLine, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Package, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  FileCheck 
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CarrierPerformanceChart } from "@/components/carriers/CarrierPerformanceChart";
import { CarrierContractsTable } from "@/components/carriers/CarrierContractsTable";
import { formatDate } from "@/lib/utils";

// Mock data until we connect to Supabase
const mockCarrierDetails = {
  id: "car-001",
  name: "FastShip Express",
  scac_code: "FSTE",
  contact_person: "John Smith",
  phone: "123-456-7890",
  email: "john@fastship.com",
  address: "1234 Logistics Way",
  city: "Chicago",
  state: "IL",
  zip_code: "60601",
  country: "USA",
  service_types: ["Truckload", "LTL", "Expedited"],
  equipment_types: ["Dry Van", "Refrigerated"],
  insurance_provider: "Transport Mutual",
  insurance_policy_number: "INS-12345-XYZ",
  insurance_expiration_date: "2024-06-30",
  operating_authority: "MC-987654",
  payment_terms: "Net 30",
  payment_method: "ACH",
  on_time_delivery_rate: 94.5,
  damage_rate: 0.8,
  cost_efficiency_score: 89.2,
  status: "Active",
  notes: "Preferred carrier for time-sensitive shipments. Has excellent track record for refrigerated freight.",
  created_at: "2023-10-15T14:30:00Z",
  updated_at: "2023-11-01T09:45:00Z",
};

const CarrierDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real implementation, we would fetch the carrier details from Supabase
  const carrier = mockCarrierDetails;
  
  return (
    <>
      <Helmet>
        <title>{carrier.name} | Carrier Details | LogiNav</title>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pt-16">
            <div className="container px-4 md:px-6 py-6 md:py-8">
              {/* Back Button and Header */}
              <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link to="/carriers">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {carrier.name}
                      {carrier.on_time_delivery_rate > 93 && (
                        <Badge className="ml-2 bg-yellow-100 text-yellow-800">Top Performer</Badge>
                      )}
                    </h1>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">{carrier.scac_code}</Badge>
                      <Badge className={
                        carrier.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }>
                        {carrier.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" asChild>
                    <Link to={`/carrier/${id}/contracts/new`}>
                      <FileText className="mr-2 h-4 w-4" />
                      New Contract
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to={`/carrier/${id}/edit`}>
                      <PencilLine className="mr-2 h-4 w-4" />
                      Edit Carrier
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Tabs Navigation */}
              <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="contracts">Contracts</TabsTrigger>
                  <TabsTrigger value="shipments">Shipments</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Contact Information Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">{carrier.email}</div>
                            <div className="text-sm text-muted-foreground">Email</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">{carrier.phone}</div>
                            <div className="text-sm text-muted-foreground">Phone</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">
                              {carrier.address}<br />
                              {carrier.city}, {carrier.state} {carrier.zip_code}<br />
                              {carrier.country}
                            </div>
                            <div className="text-sm text-muted-foreground">Address</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Services & Equipment Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Services & Equipment</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <Truck className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="flex flex-wrap gap-1">
                              {carrier.service_types?.map((service) => (
                                <Badge key={service} variant="outline">{service}</Badge>
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Service Types</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Package className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="flex flex-wrap gap-1">
                              {carrier.equipment_types?.map((equipment) => (
                                <Badge key={equipment} variant="outline">{equipment}</Badge>
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Equipment Types</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Insurance & Compliance Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Insurance & Compliance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <ShieldCheck className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">{carrier.insurance_provider}</div>
                            <div className="text-sm">{carrier.insurance_policy_number}</div>
                            <div className="text-sm text-muted-foreground">Insurance Provider</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">
                              {new Date(carrier.insurance_expiration_date).toLocaleDateString()}
                              {new Date(carrier.insurance_expiration_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                <Badge className="ml-2 bg-yellow-100 text-yellow-800">Expiring Soon</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">Insurance Expiration</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FileCheck className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">{carrier.operating_authority}</div>
                            <div className="text-sm text-muted-foreground">Operating Authority</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Performance Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">On-Time Delivery</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                          <span className="text-2xl font-bold">{carrier.on_time_delivery_rate}%</span>
                          <Badge className="ml-2 bg-green-100 text-green-800">Excellent</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Damage Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5 text-muted-foreground" />
                          <span className="text-2xl font-bold">{carrier.damage_rate}%</span>
                          <Badge className="ml-2 bg-green-100 text-green-800">Low</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Cost Efficiency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                          <span className="text-2xl font-bold">{carrier.cost_efficiency_score}</span>
                          <Badge className="ml-2 bg-blue-100 text-blue-800">Good</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Notes Section */}
                  {carrier.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{carrier.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Performance Tab */}
                <TabsContent value="performance" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Historical performance data for this carrier</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <CarrierPerformanceChart carrierId={id!} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analysis</CardTitle>
                      <CardDescription>Detailed breakdown of carrier performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead>Current</TableHead>
                            <TableHead>Previous</TableHead>
                            <TableHead>Change</TableHead>
                            <TableHead>Industry Avg</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">On-Time Delivery</TableCell>
                            <TableCell>{carrier.on_time_delivery_rate}%</TableCell>
                            <TableCell>93.2%</TableCell>
                            <TableCell className="text-green-600">+1.3%</TableCell>
                            <TableCell>89.5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Damage Rate</TableCell>
                            <TableCell>{carrier.damage_rate}%</TableCell>
                            <TableCell>0.9%</TableCell>
                            <TableCell className="text-green-600">-0.1%</TableCell>
                            <TableCell>1.2%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Cost Efficiency</TableCell>
                            <TableCell>{carrier.cost_efficiency_score}</TableCell>
                            <TableCell>87.5</TableCell>
                            <TableCell className="text-green-600">+1.7</TableCell>
                            <TableCell>84.8</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Communication Score</TableCell>
                            <TableCell>92.1</TableCell>
                            <TableCell>90.8</TableCell>
                            <TableCell className="text-green-600">+1.3</TableCell>
                            <TableCell>86.3</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Documentation Accuracy</TableCell>
                            <TableCell>95.4%</TableCell>
                            <TableCell>94.8%</TableCell>
                            <TableCell className="text-green-600">+0.6%</TableCell>
                            <TableCell>91.2%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Contracts Tab */}
                <TabsContent value="contracts" className="mt-6 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Active Contracts</h3>
                    <Button asChild>
                      <Link to={`/carrier/${id}/contracts/new`}>
                        <FileText className="mr-2 h-4 w-4" />
                        New Contract
                      </Link>
                    </Button>
                  </div>
                  <CarrierContractsTable carrierId={id!} />
                </TabsContent>
                
                {/* Shipments Tab */}
                <TabsContent value="shipments" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Shipments</CardTitle>
                      <CardDescription>Shipments handled by this carrier</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground py-8 text-center">
                        Carrier shipment history will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CarrierDetail;
