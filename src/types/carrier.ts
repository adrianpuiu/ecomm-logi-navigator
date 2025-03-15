
export type CarrierStatus = "Active" | "Inactive" | "Pending" | "Suspended";

export type ServiceType = 
  "Truckload" | 
  "LTL" | 
  "Parcel" | 
  "Air" | 
  "Ocean" | 
  "Rail" | 
  "Intermodal" | 
  "Expedited" | 
  "Courier" | 
  "Drayage";

export type EquipmentType = 
  "Dry Van" | 
  "Refrigerated" | 
  "Flatbed" | 
  "Tanker" | 
  "Container" | 
  "Step Deck" | 
  "Lowboy" | 
  "Double Drop" | 
  "Straight Truck" | 
  "Box Truck";

export type PaymentMethod = 
  "ACH" | 
  "Check" | 
  "Wire Transfer" | 
  "Credit Card" | 
  "Quick Pay" | 
  "Net 30" |
  "Net 60" |
  "Net 90";

export interface Carrier {
  id: string;
  name: string;
  scac_code?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  service_types?: ServiceType[];
  equipment_types?: EquipmentType[];
  insurance_provider?: string;
  insurance_policy_number?: string;
  insurance_expiration_date?: string;
  operating_authority?: string;
  payment_terms?: string;
  payment_method?: PaymentMethod;
  on_time_delivery_rate?: number;
  damage_rate?: number;
  cost_efficiency_score?: number;
  status: CarrierStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CarrierContract {
  id: string;
  carrier_id: string;
  contract_number: string;
  start_date: string;
  end_date: string;
  service_level_agreement?: string;
  rate_details?: Record<string, any>;
  document_url?: string;
  status: "Active" | "Expired" | "Pending" | "Terminated";
  created_at: string;
  updated_at: string;
}

export interface CarrierPerformance {
  id: string;
  carrier_id: string;
  period_start: string;
  period_end: string;
  on_time_delivery_rate: number;
  damage_rate: number;
  cost_efficiency_score: number;
  responsiveness_score: number;
  overall_score: number;
  notes?: string;
  created_at: string;
}
