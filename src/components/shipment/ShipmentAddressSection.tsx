
import { ShipmentType } from "@/types/shipment";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, MapPin, Home, Building, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShipmentAddressSectionProps {
  shipment: ShipmentType;
}

export function ShipmentAddressSection({ shipment }: ShipmentAddressSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <CardTitle className="text-xl">Sender & Recipient</CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CardDescription>
            Origin and destination addresses
          </CardDescription>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 border rounded-md p-4">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-muted-foreground" />
                  <h4 className="font-medium">Sender</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{shipment.sender.name}</p>
                  {shipment.sender.companyName && shipment.sender.name !== shipment.sender.companyName && (
                    <p className="text-sm">{shipment.sender.companyName}</p>
                  )}
                  <p className="text-sm">{shipment.sender.address.street}</p>
                  <p className="text-sm">
                    {shipment.sender.address.city}, {shipment.sender.address.state} {shipment.sender.address.zipCode}
                  </p>
                  <p className="text-sm">{shipment.sender.address.country}</p>
                  <div className="pt-2 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="text-sm">{shipment.sender.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={14} className="text-muted-foreground" />
                      <span className="text-sm">{shipment.sender.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 border rounded-md p-4">
                <div className="flex items-center gap-2">
                  <Home size={16} className="text-muted-foreground" />
                  <h4 className="font-medium">Recipient</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{shipment.recipient.name}</p>
                  {shipment.recipient.companyName && shipment.recipient.name !== shipment.recipient.companyName && (
                    <p className="text-sm">{shipment.recipient.companyName}</p>
                  )}
                  <p className="text-sm">{shipment.recipient.address.street}</p>
                  <p className="text-sm">
                    {shipment.recipient.address.city}, {shipment.recipient.address.state} {shipment.recipient.address.zipCode}
                  </p>
                  <p className="text-sm">{shipment.recipient.address.country}</p>
                  <div className="pt-2 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="text-sm">{shipment.recipient.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={14} className="text-muted-foreground" />
                      <span className="text-sm">{shipment.recipient.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
