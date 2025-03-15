
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit,
  Tag,
  Check,
  X 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  default: boolean;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registrationDate: string;
  segment: string;
  addresses: Address[];
  preferences: {
    communication: {
      email: boolean;
      sms: boolean;
      phone: boolean;
    };
    marketing: boolean;
  };
}

interface CustomerDetailsProps {
  customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case "vip":
        return <Badge className="bg-purple-500 hover:bg-purple-600">VIP</Badge>;
      case "regular":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Regular</Badge>;
      case "new":
        return <Badge className="bg-green-500 hover:bg-green-600">New</Badge>;
      default:
        return <Badge>{segment}</Badge>;
    }
  };

  const shippingAddresses = customer.addresses.filter(addr => addr.type === "shipping");
  const billingAddresses = customer.addresses.filter(addr => addr.type === "billing");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl">Customer Information</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{customer.firstName} {customer.lastName}</p>
              <p className="text-sm text-muted-foreground">Customer since {formatDate(customer.registrationDate)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">Segment: {getSegmentBadge(customer.segment)}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{customer.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{customer.phone}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">Registered on {formatDate(customer.registrationDate)}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Communication Preferences</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {customer.preferences.communication.email ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <p className="text-sm">Email</p>
              </div>
              <div className="flex items-center space-x-1">
                {customer.preferences.communication.sms ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <p className="text-sm">SMS</p>
              </div>
              <div className="flex items-center space-x-1">
                {customer.preferences.communication.phone ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <p className="text-sm">Phone</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Marketing Preferences</p>
            <div className="flex items-center space-x-1">
              {customer.preferences.marketing ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <p className="text-sm">Accept marketing communications</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Shipping Addresses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {shippingAddresses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No shipping addresses found.</p>
            ) : (
              shippingAddresses.map(address => (
                <div key={address.id} className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {address.default && (
                          <Badge variant="outline" className="mr-2">Default</Badge>
                        )}
                        Shipping Address
                      </p>
                      <p className="text-sm">{address.street}</p>
                      <p className="text-sm">{address.city}, {address.state} {address.zipCode}</p>
                      <p className="text-sm">{address.country}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Billing Addresses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {billingAddresses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No billing addresses found.</p>
            ) : (
              billingAddresses.map(address => (
                <div key={address.id} className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {address.default && (
                          <Badge variant="outline" className="mr-2">Default</Badge>
                        )}
                        Billing Address
                      </p>
                      <p className="text-sm">{address.street}</p>
                      <p className="text-sm">{address.city}, {address.state} {address.zipCode}</p>
                      <p className="text-sm">{address.country}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
