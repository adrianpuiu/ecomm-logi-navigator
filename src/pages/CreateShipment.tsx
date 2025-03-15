
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  ChevronLeft, 
  Truck, 
  User, 
  MapPin, 
  Info,
  Check
} from "lucide-react";

export default function CreateShipment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(false);
  
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    shippingMethod: "ground",
    carrier: "fedex",
    serviceLevel: "standard",
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValue: "",
    specialInstructions: "",
  });
  
  const [sender, setSender] = useState({
    name: "",
    companyName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    email: "",
    phone: "",
  });
  
  const [recipient, setRecipient] = useState({
    name: "",
    companyName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    email: "",
    phone: "",
  });
  
  const [items, setItems] = useState([
    { id: "1", name: "", sku: "", quantity: "1", unitPrice: "", totalPrice: "", imageUrl: "" }
  ]);
  
  const handleSubmit = () => {
    // Validate form
    if (!orderDetails.orderId) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter an order ID"
      });
      return;
    }
    
    if (!sender.name || !sender.street || !sender.city || !sender.state || !sender.zipCode) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please complete the sender information"
      });
      setActiveTab("sender");
      return;
    }
    
    if (!recipient.name || !recipient.street || !recipient.city || !recipient.state || !recipient.zipCode) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please complete the recipient information"
      });
      setActiveTab("recipient");
      return;
    }
    
    // Process form submission
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Shipment Created",
        description: "Your new shipment has been successfully created",
        action: (
          <Button variant="outline" size="sm" onClick={() => navigate('/shipments')}>
            View Shipments
          </Button>
        ),
      });
      
      navigate('/shipments');
    }, 1500);
  };
  
  const handleAddItem = () => {
    setItems([
      ...items,
      { id: (items.length + 1).toString(), name: "", sku: "", quantity: "1", unitPrice: "", totalPrice: "", imageUrl: "" }
    ]);
  };
  
  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const handleItemChange = (id: string, field: string, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate total price
        if (field === 'unitPrice' || field === 'quantity') {
          const unitPrice = parseFloat(field === 'unitPrice' ? value : item.unitPrice) || 0;
          const quantity = parseInt(field === 'quantity' ? value : item.quantity) || 0;
          updatedItem.totalPrice = (unitPrice * quantity).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };
  
  return (
    <div className="min-h-screen bg-background antialiased">
      <Helmet>
        <title>Create Shipment | LogiNav</title>
      </Helmet>
      <Navbar />
      <Sidebar />
      
      <main className="transition-all duration-300 pt-16 pl-[240px]">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/shipments')}
                className="mb-2"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Shipments
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Create New Shipment</h1>
              <p className="text-muted-foreground">Create a new shipment to send packages to your customers</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-4 h-auto">
                  <TabsTrigger value="details" className="py-2 data-[state=active]:bg-primary/10">
                    <Package size={16} className="mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="sender" className="py-2 data-[state=active]:bg-primary/10">
                    <User size={16} className="mr-2" />
                    Sender
                  </TabsTrigger>
                  <TabsTrigger value="recipient" className="py-2 data-[state=active]:bg-primary/10">
                    <MapPin size={16} className="mr-2" />
                    Recipient
                  </TabsTrigger>
                  <TabsTrigger value="items" className="py-2 data-[state=active]:bg-primary/10">
                    <Truck size={16} className="mr-2" />
                    Items
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        Shipment Details
                      </CardTitle>
                      <CardDescription>
                        Enter the basic information about this shipment
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="orderId">Order ID <span className="text-red-500">*</span></Label>
                          <Input 
                            id="orderId" 
                            placeholder="Enter order ID" 
                            value={orderDetails.orderId}
                            onChange={(e) => setOrderDetails({...orderDetails, orderId: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="shippingMethod">Shipping Method <span className="text-red-500">*</span></Label>
                          <Select 
                            value={orderDetails.shippingMethod}
                            onValueChange={(value) => setOrderDetails({...orderDetails, shippingMethod: value})}
                          >
                            <SelectTrigger id="shippingMethod">
                              <SelectValue placeholder="Select shipping method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ground">Ground</SelectItem>
                              <SelectItem value="express">Express</SelectItem>
                              <SelectItem value="overnight">Overnight</SelectItem>
                              <SelectItem value="international">International</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="carrier">Carrier <span className="text-red-500">*</span></Label>
                          <Select 
                            value={orderDetails.carrier}
                            onValueChange={(value) => setOrderDetails({...orderDetails, carrier: value})}
                          >
                            <SelectTrigger id="carrier">
                              <SelectValue placeholder="Select carrier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fedex">FedEx</SelectItem>
                              <SelectItem value="ups">UPS</SelectItem>
                              <SelectItem value="usps">USPS</SelectItem>
                              <SelectItem value="dhl">DHL</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="serviceLevel">Service Level <span className="text-red-500">*</span></Label>
                          <Select 
                            value={orderDetails.serviceLevel}
                            onValueChange={(value) => setOrderDetails({...orderDetails, serviceLevel: value})}
                          >
                            <SelectTrigger id="serviceLevel">
                              <SelectValue placeholder="Select service level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="priority">Priority</SelectItem>
                              <SelectItem value="express">Express</SelectItem>
                              <SelectItem value="next_day">Next Day Air</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg) <span className="text-red-500">*</span></Label>
                          <Input 
                            id="weight" 
                            type="number" 
                            placeholder="0.0" 
                            value={orderDetails.weight}
                            onChange={(e) => setOrderDetails({...orderDetails, weight: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="length">Length (cm)</Label>
                          <Input 
                            id="length" 
                            type="number" 
                            placeholder="0.0" 
                            value={orderDetails.length}
                            onChange={(e) => setOrderDetails({...orderDetails, length: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="width">Width (cm)</Label>
                          <Input 
                            id="width" 
                            type="number" 
                            placeholder="0.0" 
                            value={orderDetails.width}
                            onChange={(e) => setOrderDetails({...orderDetails, width: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input 
                            id="height" 
                            type="number" 
                            placeholder="0.0" 
                            value={orderDetails.height}
                            onChange={(e) => setOrderDetails({...orderDetails, height: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="declaredValue">Declared Value (USD)</Label>
                        <Input 
                          id="declaredValue" 
                          type="number" 
                          placeholder="0.00" 
                          value={orderDetails.declaredValue}
                          onChange={(e) => setOrderDetails({...orderDetails, declaredValue: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialInstructions">Special Instructions</Label>
                        <Textarea 
                          id="specialInstructions" 
                          placeholder="Enter any special handling instructions..." 
                          rows={3}
                          value={orderDetails.specialInstructions}
                          onChange={(e) => setOrderDetails({...orderDetails, specialInstructions: e.target.value})}
                        />
                      </div>
                    </CardContent>
                    
                    <CardFooter className="justify-between">
                      <Button 
                        variant="ghost" 
                        onClick={() => navigate('/shipments')}
                      >
                        Cancel
                      </Button>
                      
                      <Button onClick={() => setActiveTab("sender")}>
                        Continue to Sender
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="sender">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <User size={18} className="text-primary" />
                        Sender Information
                      </CardTitle>
                      <CardDescription>
                        Enter sender address and contact information
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderName">Full Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="senderName" 
                            placeholder="Enter full name" 
                            value={sender.name}
                            onChange={(e) => setSender({...sender, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="senderCompany">Company Name</Label>
                          <Input 
                            id="senderCompany" 
                            placeholder="Enter company name" 
                            value={sender.companyName}
                            onChange={(e) => setSender({...sender, companyName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="senderStreet">Street Address <span className="text-red-500">*</span></Label>
                        <Input 
                          id="senderStreet" 
                          placeholder="Enter street address" 
                          value={sender.street}
                          onChange={(e) => setSender({...sender, street: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderCity">City <span className="text-red-500">*</span></Label>
                          <Input 
                            id="senderCity" 
                            placeholder="Enter city" 
                            value={sender.city}
                            onChange={(e) => setSender({...sender, city: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="senderState">State <span className="text-red-500">*</span></Label>
                          <Input 
                            id="senderState" 
                            placeholder="Enter state" 
                            value={sender.state}
                            onChange={(e) => setSender({...sender, state: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="senderZip">Zip Code <span className="text-red-500">*</span></Label>
                          <Input 
                            id="senderZip" 
                            placeholder="Enter zip code" 
                            value={sender.zipCode}
                            onChange={(e) => setSender({...sender, zipCode: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="senderCountry">Country <span className="text-red-500">*</span></Label>
                        <Select 
                          value={sender.country}
                          onValueChange={(value) => setSender({...sender, country: value})}
                        >
                          <SelectTrigger id="senderCountry">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="CAN">Canada</SelectItem>
                            <SelectItem value="MEX">Mexico</SelectItem>
                            <SelectItem value="GBR">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderEmail">Email</Label>
                          <Input 
                            id="senderEmail" 
                            type="email" 
                            placeholder="Enter email" 
                            value={sender.email}
                            onChange={(e) => setSender({...sender, email: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="senderPhone">Phone Number</Label>
                          <Input 
                            id="senderPhone" 
                            placeholder="Enter phone number" 
                            value={sender.phone}
                            onChange={(e) => setSender({...sender, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("details")}
                      >
                        Back
                      </Button>
                      
                      <Button onClick={() => setActiveTab("recipient")}>
                        Continue to Recipient
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recipient">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin size={18} className="text-primary" />
                        Recipient Information
                      </CardTitle>
                      <CardDescription>
                        Enter recipient address and contact information
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipientName">Full Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="recipientName" 
                            placeholder="Enter full name" 
                            value={recipient.name}
                            onChange={(e) => setRecipient({...recipient, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipientCompany">Company Name</Label>
                          <Input 
                            id="recipientCompany" 
                            placeholder="Enter company name" 
                            value={recipient.companyName}
                            onChange={(e) => setRecipient({...recipient, companyName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="recipientStreet">Street Address <span className="text-red-500">*</span></Label>
                        <Input 
                          id="recipientStreet" 
                          placeholder="Enter street address" 
                          value={recipient.street}
                          onChange={(e) => setRecipient({...recipient, street: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipientCity">City <span className="text-red-500">*</span></Label>
                          <Input 
                            id="recipientCity" 
                            placeholder="Enter city" 
                            value={recipient.city}
                            onChange={(e) => setRecipient({...recipient, city: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipientState">State <span className="text-red-500">*</span></Label>
                          <Input 
                            id="recipientState" 
                            placeholder="Enter state" 
                            value={recipient.state}
                            onChange={(e) => setRecipient({...recipient, state: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipientZip">Zip Code <span className="text-red-500">*</span></Label>
                          <Input 
                            id="recipientZip" 
                            placeholder="Enter zip code" 
                            value={recipient.zipCode}
                            onChange={(e) => setRecipient({...recipient, zipCode: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="recipientCountry">Country <span className="text-red-500">*</span></Label>
                        <Select 
                          value={recipient.country}
                          onValueChange={(value) => setRecipient({...recipient, country: value})}
                        >
                          <SelectTrigger id="recipientCountry">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="CAN">Canada</SelectItem>
                            <SelectItem value="MEX">Mexico</SelectItem>
                            <SelectItem value="GBR">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipientEmail">Email <span className="text-red-500">*</span></Label>
                          <Input 
                            id="recipientEmail" 
                            type="email" 
                            placeholder="Enter email" 
                            value={recipient.email}
                            onChange={(e) => setRecipient({...recipient, email: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipientPhone">Phone Number <span className="text-red-500">*</span></Label>
                          <Input 
                            id="recipientPhone" 
                            placeholder="Enter phone number" 
                            value={recipient.phone}
                            onChange={(e) => setRecipient({...recipient, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("sender")}
                      >
                        Back
                      </Button>
                      
                      <Button onClick={() => setActiveTab("items")}>
                        Continue to Items
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="items">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        Package Items
                      </CardTitle>
                      <CardDescription>
                        Add items to the shipment package
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {items.map((item, index) => (
                        <div key={item.id} className="border rounded-md p-4 space-y-4 relative">
                          <div className="absolute top-3 right-3 text-muted-foreground">
                            Item {index + 1}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`item-name-${item.id}`}>Item Name <span className="text-red-500">*</span></Label>
                              <Input 
                                id={`item-name-${item.id}`} 
                                placeholder="Enter item name" 
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`item-sku-${item.id}`}>SKU/Product ID</Label>
                              <Input 
                                id={`item-sku-${item.id}`} 
                                placeholder="Enter SKU or product ID" 
                                value={item.sku}
                                onChange={(e) => handleItemChange(item.id, 'sku', e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`item-quantity-${item.id}`}>Quantity <span className="text-red-500">*</span></Label>
                              <Input 
                                id={`item-quantity-${item.id}`} 
                                type="number" 
                                min="1"
                                placeholder="1" 
                                value={item.quantity}
                                onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`item-price-${item.id}`}>Unit Price ($) <span className="text-red-500">*</span></Label>
                              <Input 
                                id={`item-price-${item.id}`} 
                                type="number" 
                                step="0.01" 
                                placeholder="0.00" 
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`item-total-${item.id}`}>Total Price ($)</Label>
                              <Input 
                                id={`item-total-${item.id}`} 
                                readOnly 
                                value={item.totalPrice || "0.00"}
                                className="bg-muted"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`item-image-${item.id}`}>Image URL</Label>
                            <Input 
                              id={`item-image-${item.id}`} 
                              placeholder="Enter image URL" 
                              value={item.imageUrl}
                              onChange={(e) => handleItemChange(item.id, 'imageUrl', e.target.value)}
                            />
                          </div>
                          
                          {items.length > 1 && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="mt-2"
                            >
                              Remove Item
                            </Button>
                          )}
                        </div>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={handleAddItem}
                        className="w-full"
                      >
                        Add Another Item
                      </Button>
                    </CardContent>
                    
                    <CardFooter className="justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("recipient")}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Create Shipment
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Info size={18} className="text-primary" />
                    Shipment Summary
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Order ID</h3>
                    <p className="text-sm">{orderDetails.orderId || "Not specified"}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Shipping Details</h3>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="capitalize">{orderDetails.shippingMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carrier:</span>
                        <span className="uppercase">{orderDetails.carrier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="capitalize">{orderDetails.serviceLevel.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {(sender.name || sender.companyName) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">From</h3>
                      <div className="text-sm">
                        <p className="font-medium">{sender.name}</p>
                        {sender.companyName && <p>{sender.companyName}</p>}
                        {sender.street && <p>{sender.street}</p>}
                        {(sender.city || sender.state || sender.zipCode) && (
                          <p>
                            {sender.city && `${sender.city}, `}
                            {sender.state && `${sender.state} `}
                            {sender.zipCode}
                          </p>
                        )}
                        {sender.country && <p>{sender.country}</p>}
                      </div>
                    </div>
                  )}
                  
                  {(recipient.name || recipient.companyName) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">To</h3>
                      <div className="text-sm">
                        <p className="font-medium">{recipient.name}</p>
                        {recipient.companyName && <p>{recipient.companyName}</p>}
                        {recipient.street && <p>{recipient.street}</p>}
                        {(recipient.city || recipient.state || recipient.zipCode) && (
                          <p>
                            {recipient.city && `${recipient.city}, `}
                            {recipient.state && `${recipient.state} `}
                            {recipient.zipCode}
                          </p>
                        )}
                        {recipient.country && <p>{recipient.country}</p>}
                      </div>
                    </div>
                  )}
                  
                  {items.some(item => item.name) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Items</h3>
                      <ul className="text-sm space-y-1">
                        {items.filter(item => item.name).map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.name} {item.quantity && `(x${item.quantity})`}</span>
                            <span>${item.totalPrice || "0.00"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Package Value:</span>
                      <span>
                        ${items.reduce((total, item) => {
                          return total + (parseFloat(item.totalPrice) || 0);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
