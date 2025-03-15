
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface ReturnCustomerInfoProps {
  customer: Customer;
}

export function ReturnCustomerInfo({ customer }: ReturnCustomerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <User size={16} className="text-primary" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">{customer.name}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">{customer.email}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">{customer.phone}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">Shipping Address</div>
            <div className="text-sm text-muted-foreground">{customer.address.street}</div>
            <div className="text-sm text-muted-foreground">
              {customer.address.city}, {customer.address.state} {customer.address.zipCode}
            </div>
            <div className="text-sm text-muted-foreground">{customer.address.country}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
