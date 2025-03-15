
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, AlertCircle, Shield, Truck, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

// Mock data until we connect to Supabase
const mockCarriers = [
  {
    id: "car-001",
    name: "FastShip Express",
    scac_code: "FSTE",
    contact_person: "John Smith",
    phone: "123-456-7890",
    email: "john@fastship.com",
    service_types: ["Truckload", "LTL"],
    equipment_types: ["Dry Van", "Refrigerated"],
    on_time_delivery_rate: 94.5,
    damage_rate: 0.8,
    cost_efficiency_score: 89.2,
    status: "Active",
    created_at: "2023-10-15T14:30:00Z",
    updated_at: "2023-11-01T09:45:00Z",
  },
  {
    id: "car-002",
    name: "Premier Logistics",
    scac_code: "PRML",
    contact_person: "Sarah Johnson",
    phone: "234-567-8901",
    email: "sarah@premierlogistics.com",
    service_types: ["LTL", "Expedited"],
    equipment_types: ["Dry Van"],
    on_time_delivery_rate: 87.3,
    damage_rate: 1.5,
    cost_efficiency_score: 82.1,
    status: "Active",
    created_at: "2023-09-22T11:15:00Z",
    updated_at: "2023-10-28T16:20:00Z",
  },
  {
    id: "car-003",
    name: "Reliable Transport",
    scac_code: "RLTR",
    contact_person: "Michael Chen",
    phone: "345-678-9012",
    email: "michael@reliable.com",
    service_types: ["Truckload", "Intermodal"],
    equipment_types: ["Dry Van", "Flatbed"],
    on_time_delivery_rate: 91.7,
    damage_rate: 1.2,
    cost_efficiency_score: 85.8,
    status: "Active",
    created_at: "2023-08-14T09:30:00Z",
    updated_at: "2023-10-19T13:45:00Z",
  },
  {
    id: "car-004",
    name: "Swift Delivery",
    scac_code: "SWFT",
    contact_person: "Emily Taylor",
    phone: "456-789-0123",
    email: "emily@swiftdelivery.com",
    service_types: ["Courier", "Parcel"],
    equipment_types: ["Box Truck", "Straight Truck"],
    on_time_delivery_rate: 95.2,
    damage_rate: 0.9,
    cost_efficiency_score: 91.5,
    status: "Active",
    created_at: "2023-07-25T16:45:00Z",
    updated_at: "2023-10-12T10:30:00Z",
  },
  {
    id: "car-005",
    name: "Global Carriers",
    scac_code: "GLBC",
    contact_person: "David Wilson",
    phone: "567-890-1234",
    email: "david@globalcarriers.com",
    service_types: ["Ocean", "Air"],
    equipment_types: ["Container"],
    on_time_delivery_rate: 89.8,
    damage_rate: 1.7,
    cost_efficiency_score: 84.3,
    status: "Inactive",
    created_at: "2023-06-18T13:20:00Z",
    updated_at: "2023-10-05T15:10:00Z",
  },
  {
    id: "car-006",
    name: "Metro Freight",
    scac_code: "MTRF",
    contact_person: "Jessica Brown",
    phone: "678-901-2345",
    email: "jessica@metrofreight.com",
    service_types: ["Truckload", "Drayage"],
    equipment_types: ["Dry Van", "Container"],
    on_time_delivery_rate: 86.5,
    damage_rate: 2.1,
    cost_efficiency_score: 79.8,
    status: "Active",
    created_at: "2023-05-29T10:45:00Z",
    updated_at: "2023-09-28T13:15:00Z",
  }
];

// Type for the component props
interface CarriersTableProps {
  filterStatus?: string;
  topPerformers?: boolean;
}

export function CarriersTable({ filterStatus, topPerformers }: CarriersTableProps) {
  // Filter carriers based on props
  const filteredCarriers = mockCarriers.filter(carrier => {
    if (filterStatus === "Active") {
      return carrier.status === "Active";
    }
    if (filterStatus === "Inactive") {
      return carrier.status === "Inactive";
    }
    if (filterStatus === "Issues") {
      return carrier.on_time_delivery_rate < 88 || carrier.damage_rate > 1.5;
    }
    if (topPerformers) {
      return carrier.on_time_delivery_rate > 90 && carrier.cost_efficiency_score > 85;
    }
    return true;
  });

  const renderPerformanceBadge = (rate: number) => {
    if (rate >= 90) {
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    } else if (rate >= 80) {
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    } else if (rate >= 70) {
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Carrier Name</TableHead>
            <TableHead className="hidden md:table-cell">Services</TableHead>
            <TableHead className="hidden md:table-cell">Equipment</TableHead>
            <TableHead className="hidden lg:table-cell">Contact</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCarriers.map((carrier) => (
            <TableRow 
              key={carrier.id}
              className="group"
            >
              <TableCell className="font-medium">
                <Link 
                  to={`/carrier/${carrier.id}`}
                  className="text-primary hover:underline flex items-center"
                >
                  {carrier.name}
                  {carrier.on_time_delivery_rate > 93 && (
                    <Star className="h-4 w-4 text-yellow-500 ml-1" fill="currentColor" />
                  )}
                </Link>
                <div className="text-xs text-muted-foreground md:hidden">
                  {carrier.service_types?.join(", ")}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {carrier.service_types?.map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {carrier.equipment_types?.map((equipment) => (
                    <Badge key={equipment} variant="outline" className="text-xs">
                      {equipment}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div>
                  <div className="font-medium">{carrier.contact_person}</div>
                  <div className="text-xs text-muted-foreground">{carrier.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">On-time:</span>
                    <span className="font-medium">{carrier.on_time_delivery_rate}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Cost:</span>
                    {renderPerformanceBadge(carrier.cost_efficiency_score)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={
                    carrier.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {carrier.status}
                </Badge>
                {carrier.damage_rate > 1.5 && (
                  <div className="mt-1">
                    <Badge className="bg-red-100 text-red-800 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      High Damage
                    </Badge>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`/carrier/${carrier.id}`} className="cursor-pointer">
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/carrier/${carrier.id}/edit`} className="cursor-pointer">
                        Edit Carrier
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/carrier/${carrier.id}/contracts`} className="cursor-pointer">
                        View Contracts
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
