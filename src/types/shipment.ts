
export type ShipmentStatus = 
  "created" | 
  "processing" | 
  "picked_up" | 
  "in_transit" | 
  "out_for_delivery" | 
  "delivered" | 
  "delayed" | 
  "exception" | 
  "cancelled" | 
  "returned";

export type TrackingEventStatus = 
  "created" | 
  "processing" | 
  "picked_up" | 
  "in_transit" | 
  "out_for_delivery" | 
  "delivered" | 
  "delayed" | 
  "exception" |
  "cancelled" | 
  "returned";

export type EventType = "system" | "user";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Party {
  name: string;
  companyName: string;
  address: Address;
  contact: Contact;
}

export interface CarrierInfo {
  name: string;
  trackingNumber: string;
  serviceLevel: string;
}

export interface Dimension {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "in";
}

export interface Weight {
  value: number;
  unit: "kg" | "lb";
}

export interface MonetaryValue {
  amount: number;
  currency: string;
}

export interface ShipmentItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
  handlingInstructions: string;
}

export interface TrackingEvent {
  timestamp: string;
  status: TrackingEventStatus;
  location: string;
  description: string;
}

export interface ShipmentEvent {
  timestamp: string;
  type: EventType;
  user: string;
  description: string;
}

export interface AdditionalFee {
  name: string;
  amount: number;
}

export interface ShipmentFinancials {
  shippingCost: number;
  insuranceCost: number;
  additionalFees: AdditionalFee[];
  totalCost: number;
  currency: string;
}

export interface ReturnInfo {
  id: string;
  requestedAt: string;
  status: "requested" | "approved" | "in_transit" | "received" | "completed" | "rejected";
  reason: string;
  trackingNumber: string;
  returnItems: {
    itemId: string;
    quantity: number;
    reason: string;
  }[];
  refundAmount?: number;
}

export interface ShipmentType {
  id: string;
  orderId: string;
  createdAt: string;
  expectedDelivery: string;
  actualDelivery: string | null;
  status: ShipmentStatus;
  shippingMethod: string;
  carrier: CarrierInfo;
  weight: Weight;
  dimensions: Dimension;
  declaredValue: MonetaryValue;
  specialInstructions: string;
  sender: Party;
  recipient: Party;
  items: ShipmentItem[];
  trackingHistory: TrackingEvent[];
  events: ShipmentEvent[];
  financials: ShipmentFinancials;
  return: ReturnInfo | null;
}
