
import { ShipmentType } from "@/types/shipment";

export const mockShipment: ShipmentType = {
  id: "SH7842",
  orderId: "ORD-38291",
  createdAt: "2023-10-05T14:30:00Z",
  expectedDelivery: "2023-10-12T17:00:00Z",
  actualDelivery: null,
  status: "in_transit",
  shippingMethod: "express",
  carrier: {
    name: "FastShip Express",
    trackingNumber: "FSE123456789",
    serviceLevel: "Next Day Air"
  },
  weight: {
    value: 5.2,
    unit: "kg"
  },
  dimensions: {
    length: 30,
    width: 20,
    height: 15,
    unit: "cm"
  },
  declaredValue: {
    amount: 499.99,
    currency: "USD"
  },
  specialInstructions: "Handle with care. Leave at front door if no answer.",
  sender: {
    name: "Tech Solutions Inc.",
    companyName: "Tech Solutions Inc.",
    address: {
      street: "123 Tech Blvd",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    contact: {
      email: "shipping@techsolutions.com",
      phone: "+1 (213) 555-1234"
    }
  },
  recipient: {
    name: "Jane Smith",
    companyName: "Home Office",
    address: {
      street: "456 Pine Avenue",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    contact: {
      email: "jane.smith@example.com",
      phone: "+1 (206) 555-5678"
    }
  },
  items: [
    {
      id: "ITEM-001",
      name: "Premium Laptop",
      sku: "LT-PRO-15",
      quantity: 1,
      unitPrice: 399.99,
      totalPrice: 399.99,
      imageUrl: "/placeholder.svg",
      handlingInstructions: "Fragile electronic equipment"
    },
    {
      id: "ITEM-002",
      name: "Wireless Mouse",
      sku: "ACC-MOUSE-01",
      quantity: 2,
      unitPrice: 29.99,
      totalPrice: 59.98,
      imageUrl: "/placeholder.svg",
      handlingInstructions: ""
    },
    {
      id: "ITEM-003",
      name: "Laptop Sleeve",
      sku: "ACC-SLEEVE-15",
      quantity: 1,
      unitPrice: 39.99,
      totalPrice: 39.99,
      imageUrl: "/placeholder.svg",
      handlingInstructions: ""
    }
  ],
  trackingHistory: [
    {
      timestamp: "2023-10-05T14:30:00Z",
      status: "created",
      location: "Los Angeles, CA",
      description: "Shipment created"
    },
    {
      timestamp: "2023-10-06T09:15:00Z",
      status: "processing",
      location: "Los Angeles, CA",
      description: "Shipment processing started"
    },
    {
      timestamp: "2023-10-07T11:45:00Z",
      status: "picked_up",
      location: "Los Angeles, CA",
      description: "Shipment picked up by carrier"
    },
    {
      timestamp: "2023-10-08T03:20:00Z",
      status: "in_transit",
      location: "San Francisco, CA",
      description: "Shipment in transit"
    },
    {
      timestamp: "2023-10-09T14:10:00Z",
      status: "in_transit",
      location: "Portland, OR",
      description: "Shipment in transit to Seattle, WA"
    },
    {
      timestamp: "2023-10-10T08:45:00Z",
      status: "in_transit",
      location: "Seattle, WA",
      description: "Shipment arrived at local facility"
    }
  ],
  events: [
    {
      timestamp: "2023-10-05T14:30:00Z",
      type: "system",
      user: "system",
      description: "Shipment created"
    },
    {
      timestamp: "2023-10-05T14:35:00Z",
      type: "user",
      user: "john.doe@techsolutions.com",
      description: "Label printed"
    },
    {
      timestamp: "2023-10-06T09:10:00Z",
      type: "user",
      user: "sarah.ops@techsolutions.com",
      description: "Added special handling instructions"
    },
    {
      timestamp: "2023-10-07T11:40:00Z",
      type: "system",
      user: "system",
      description: "Carrier assigned: FastShip Express"
    }
  ],
  financials: {
    shippingCost: 42.50,
    insuranceCost: 9.99,
    additionalFees: [
      {
        name: "Fuel Surcharge",
        amount: 4.25
      },
      {
        name: "Residential Delivery",
        amount: 5.00
      }
    ],
    totalCost: 61.74,
    currency: "USD"
  },
  return: null
};
