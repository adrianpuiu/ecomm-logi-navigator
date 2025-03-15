
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
import { MapPin, Home, Building, Phone, Mail, ChevronUp, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface ShipmentAddressSectionProps {
  shipment: ShipmentType;
}

export function ShipmentAddressSection({ shipment }: ShipmentAddressSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="shadow-sm overflow-hidden border border-border/40 bg-gradient-to-br from-card to-background">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="px-6 py-4 bg-card border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Sender & Recipient</CardTitle>
                <CardDescription className="text-xs">
                  Origin and destination addresses
                </CardDescription>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="px-6 py-5">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-card shadow-sm h-10 w-10 rounded-full flex items-center justify-center border">
                  <ArrowRight className="text-primary h-5 w-5" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                <div className="space-y-4 p-4 rounded-lg bg-card border border-border/40">
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-primary" />
                    <h4 className="font-medium">Sender</h4>
                  </div>
                  
                  <div className="space-y-1 pt-1">
                    <p className="text-sm font-medium">{shipment.sender.name}</p>
                    {shipment.sender.companyName && shipment.sender.name !== shipment.sender.companyName && (
                      <p className="text-sm text-muted-foreground">{shipment.sender.companyName}</p>
                    )}
                    <Separator className="my-2" />
                    <div className="space-y-1 text-sm">
                      <p>{shipment.sender.address.street}</p>
                      <p>
                        {shipment.sender.address.city}, {shipment.sender.address.state} {shipment.sender.address.zipCode}
                      </p>
                      <p>{shipment.sender.address.country}</p>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="pt-1 grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground" />
                        <span className="text-sm">{shipment.sender.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        <span className="text-sm">{shipment.sender.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 p-4 rounded-lg bg-card border border-border/40">
                  <div className="flex items-center gap-2">
                    <Home size={16} className="text-primary" />
                    <h4 className="font-medium">Recipient</h4>
                  </div>
                  
                  <div className="space-y-1 pt-1">
                    <p className="text-sm font-medium">{shipment.recipient.name}</p>
                    {shipment.recipient.companyName && shipment.recipient.name !== shipment.recipient.companyName && (
                      <p className="text-sm text-muted-foreground">{shipment.recipient.companyName}</p>
                    )}
                    <Separator className="my-2" />
                    <div className="space-y-1 text-sm">
                      <p>{shipment.recipient.address.street}</p>
                      <p>
                        {shipment.recipient.address.city}, {shipment.recipient.address.state} {shipment.recipient.address.zipCode}
                      </p>
                      <p>{shipment.recipient.address.country}</p>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="pt-1 grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground" />
                        <span className="text-sm">{shipment.recipient.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        <span className="text-sm">{shipment.recipient.contact.email}</span>
                      </div>
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
