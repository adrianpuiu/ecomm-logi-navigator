
export type OptimizationPriority = "fastest" | "shortest" | "cost";

export type RouteConstraint = {
  avoidTolls: boolean;
  avoidHighways: boolean;
  useRealTimeTraffic: boolean;
  allowUTurns: boolean;
};

export type RouteStop = {
  id: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type: "origin" | "destination" | "waypoint";
  arrivalTime?: Date;
  departureTime?: Date;
};

export type Driver = {
  id: number;
  name: string;
  email: string;
  phone: string;
  license: string;
  certifications: string[];
  available: boolean;
  maxHours: number;
  currentHours: number;
  location?: {
    latitude: number;
    longitude: number;
  };
};

export type VehicleType = "Van" | "Box" | "Flatbed" | "Refrigerated" | "Tanker";

export type Vehicle = {
  id: number;
  name: string;
  type: VehicleType;
  licensePlate: string;
  capacity: {
    weight: number;
    volume: number;
    pallets: number;
  };
  available: boolean;
  fuelEfficiency: number;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  features: string[];
};

export type RouteStatus = "planned" | "in_progress" | "completed" | "cancelled";

export type Route = {
  id: string;
  name: string;
  date: Date;
  timeWindow?: {
    start: Date;
    end: Date;
  };
  stops: RouteStop[];
  driver?: Driver;
  vehicle?: Vehicle;
  optimizationPriority: OptimizationPriority;
  constraints: RouteConstraint;
  status: RouteStatus;
  distance: number;
  duration: number;
  estimatedCost: number;
  createdAt?: Date;
  updatedAt?: Date;
};
