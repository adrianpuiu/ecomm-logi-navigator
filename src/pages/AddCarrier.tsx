
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Save } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ServiceType, EquipmentType, CarrierStatus, PaymentMethod } from "@/types/carrier";
import { supabase } from "@/integrations/supabase/client";

// Create schema for form validation
const carrierFormSchema = z.object({
  name: z.string().min(3, { message: "Carrier name must be at least 3 characters long" }),
  scac_code: z.string().optional(),
  contact_person: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  country: z.string().optional(),
  service_types: z.array(z.string()).optional(),
  equipment_types: z.array(z.string()).optional(),
  insurance_provider: z.string().optional(),
  insurance_policy_number: z.string().optional(),
  insurance_expiration_date: z.string().optional(),
  operating_authority: z.string().optional(),
  payment_terms: z.string().optional(),
  payment_method: z.string().optional(),
  status: z.string().default("Active"),
  notes: z.string().optional(),
});

type CarrierFormValues = z.infer<typeof carrierFormSchema>;

const defaultValues: Partial<CarrierFormValues> = {
  name: "",
  status: "Active",
  service_types: [],
  equipment_types: [],
};

const AddCarrier = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define the form
  const form = useForm<CarrierFormValues>({
    resolver: zodResolver(carrierFormSchema),
    defaultValues,
  });
  
  // Define service and equipment types for checkboxes
  const serviceTypes: ServiceType[] = [
    "Truckload", "LTL", "Parcel", "Air", "Ocean", "Rail", "Intermodal", "Expedited", "Courier", "Drayage"
  ];
  
  const equipmentTypes: EquipmentType[] = [
    "Dry Van", "Refrigerated", "Flatbed", "Tanker", "Container", "Step Deck", "Lowboy", "Double Drop", "Straight Truck", "Box Truck"
  ];
  
  const paymentMethods: PaymentMethod[] = [
    "ACH", "Check", "Wire Transfer", "Credit Card", "Quick Pay", "Net 30", "Net 60", "Net 90"
  ];
  
  const carrierStatuses: CarrierStatus[] = [
    "Active", "Inactive", "Pending", "Suspended"
  ];
  
  // Submit handler
  const onSubmit = async (data: CarrierFormValues) => {
    setIsSubmitting(true);
    
    try {
      // This is where we would insert the data into Supabase
      // In a real implementation, we would use the supabase client
      
      // Example:
      // const { data: insertedCarrier, error } = await supabase
      //   .from('carriers')
      //   .insert([data])
      //   .select('id')
      //   .single();
      
      // if (error) {
      //   throw error;
      // }
      
      // For now, we'll simulate a successful insert
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Carrier Added",
        description: `${data.name} has been added to your carrier network.`,
      });
      
      navigate("/carriers");
    } catch (error) {
      console.error("Error adding carrier:", error);
      toast({
        title: "Error",
        description: "There was an error adding the carrier. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Add New Carrier | LogiNav</title>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pt-16">
            <div className="container px-4 md:px-6 py-6 md:py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link to="/carriers">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Add New Carrier</h1>
                    <p className="text-muted-foreground mt-1">Add a new transportation carrier to your network</p>
                  </div>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="basic" className="space-y-6">
                    <TabsList>
                      <TabsTrigger value="basic">Basic Information</TabsTrigger>
                      <TabsTrigger value="contact">Contact & Address</TabsTrigger>
                      <TabsTrigger value="services">Services & Equipment</TabsTrigger>
                      <TabsTrigger value="compliance">Compliance & Payment</TabsTrigger>
                    </TabsList>
                    
                    {/* Basic Information Tab */}
                    <TabsContent value="basic">
                      <Card>
                        <CardHeader>
                          <CardTitle>Basic Information</CardTitle>
                          <CardDescription>Enter the basic information about the carrier</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Carrier Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter carrier name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="scac_code"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SCAC Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., ABCD" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    {...field}
                                  >
                                    {carrierStatuses.map((status) => (
                                      <option key={status} value={status}>{status}</option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter any additional notes about this carrier" 
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Contact & Address Tab */}
                    <TabsContent value="contact">
                      <Card>
                        <CardHeader>
                          <CardTitle>Contact & Address Information</CardTitle>
                          <CardDescription>Enter the contact details and address of the carrier</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="contact_person"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Person</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 123-456-7890" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Separator />
                          
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter street address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State/Province</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter state or province" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="zip_code"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP/Postal Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter ZIP or postal code" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter country" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Services & Equipment Tab */}
                    <TabsContent value="services">
                      <Card>
                        <CardHeader>
                          <CardTitle>Services & Equipment</CardTitle>
                          <CardDescription>Select the services and equipment types offered by this carrier</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h3 className="text-md font-medium mb-2">Service Types</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {serviceTypes.map((service) => (
                                <div key={service} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`service-${service}`}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    value={service}
                                    onChange={(e) => {
                                      const current = form.getValues("service_types") || [];
                                      if (e.target.checked) {
                                        form.setValue("service_types", [...current, service]);
                                      } else {
                                        form.setValue(
                                          "service_types",
                                          current.filter((val) => val !== service)
                                        );
                                      }
                                    }}
                                  />
                                  <label htmlFor={`service-${service}`} className="text-sm">{service}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-md font-medium mb-2">Equipment Types</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {equipmentTypes.map((equipment) => (
                                <div key={equipment} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`equipment-${equipment}`}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    value={equipment}
                                    onChange={(e) => {
                                      const current = form.getValues("equipment_types") || [];
                                      if (e.target.checked) {
                                        form.setValue("equipment_types", [...current, equipment]);
                                      } else {
                                        form.setValue(
                                          "equipment_types",
                                          current.filter((val) => val !== equipment)
                                        );
                                      }
                                    }}
                                  />
                                  <label htmlFor={`equipment-${equipment}`} className="text-sm">{equipment}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    {/* Compliance & Payment Tab */}
                    <TabsContent value="compliance">
                      <Card>
                        <CardHeader>
                          <CardTitle>Compliance & Payment Information</CardTitle>
                          <CardDescription>Enter insurance, compliance, and payment information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="insurance_provider"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance Provider</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter insurance provider" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="insurance_policy_number"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance Policy Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter policy number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="insurance_expiration_date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance Expiration Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="operating_authority"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Operating Authority</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., MC-123456" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="payment_terms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Payment Terms</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Net 30" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="payment_method"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Payment Method</FormLabel>
                                  <FormControl>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                      {...field}
                                    >
                                      <option value="">Select payment method</option>
                                      {paymentMethods.map((method) => (
                                        <option key={method} value={method}>{method}</option>
                                      ))}
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      variant="outline" 
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => navigate("/carriers")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Carrier"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddCarrier;
