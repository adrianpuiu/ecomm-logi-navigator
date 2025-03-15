
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, MoreHorizontal, AlertCircle, Download, Eye } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

// Mock data for contracts
const mockContracts = [
  {
    id: "con-001",
    carrier_id: "car-001",
    contract_number: "CTR-20230601-001",
    start_date: "2023-06-01",
    end_date: "2024-05-31",
    service_level_agreement: "99% on-time delivery guarantee. Penalties apply for missed deliveries.",
    rate_details: { 
      base_rate: "$1.85 per mile",
      fuel_surcharge: "Based on DOE index",
      detention_rate: "$65 per hour after 2 hours",
      minimums: "100 miles or $150"
    },
    document_url: "https://example.com/contracts/CTR-20230601-001.pdf",
    status: "Active",
    created_at: "2023-05-15T10:30:00Z",
    updated_at: "2023-05-15T10:30:00Z"
  },
  {
    id: "con-002",
    carrier_id: "car-001",
    contract_number: "CTR-20230301-002",
    start_date: "2023-03-01",
    end_date: "2023-08-31",
    service_level_agreement: "Special rates for refrigerated goods. 98% on-time delivery guarantee.",
    rate_details: { 
      base_rate: "$2.10 per mile",
      fuel_surcharge: "Based on DOE index + 0.05",
      detention_rate: "$75 per hour after 1.5 hours",
      minimums: "100 miles or $200"
    },
    document_url: "https://example.com/contracts/CTR-20230301-002.pdf",
    status: "Active",
    created_at: "2023-02-15T14:45:00Z",
    updated_at: "2023-02-15T14:45:00Z"
  },
  {
    id: "con-003",
    carrier_id: "car-001",
    contract_number: "CTR-20220601-003",
    start_date: "2022-06-01",
    end_date: "2023-05-31",
    service_level_agreement: "Standard contract for domestic shipping.",
    rate_details: { 
      base_rate: "$1.75 per mile",
      fuel_surcharge: "Based on DOE index",
      detention_rate: "$60 per hour after 2 hours",
      minimums: "100 miles or $150"
    },
    document_url: "https://example.com/contracts/CTR-20220601-003.pdf",
    status: "Expired",
    created_at: "2022-05-20T09:15:00Z",
    updated_at: "2023-06-01T00:00:00Z"
  }
];

interface CarrierContractsTableProps {
  carrierId: string;
}

export function CarrierContractsTable({ carrierId }: CarrierContractsTableProps) {
  // In a real implementation, we would fetch the contracts from Supabase
  // Filter contracts for the specific carrier
  const carrierContracts = mockContracts.filter(
    contract => contract.carrier_id === carrierId
  );
  
  // Check if a contract is expiring soon (within 30 days)
  const isExpiringSoon = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };
  
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract Number</TableHead>
              <TableHead className="hidden md:table-cell">Period</TableHead>
              <TableHead className="hidden lg:table-cell">Base Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carrierContracts.map(contract => (
              <TableRow key={contract.id} className="group">
                <TableCell className="font-medium">
                  <Link 
                    to={`/carrier/${carrierId}/contract/${contract.id}`}
                    className="text-primary hover:underline flex items-center"
                  >
                    {contract.contract_number}
                  </Link>
                  <div className="text-xs text-muted-foreground md:table-cell md:hidden">
                    {new Date(contract.start_date).toLocaleDateString()} - {new Date(contract.end_date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(contract.start_date).toLocaleDateString()} - {new Date(contract.end_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {contract.rate_details.base_rate}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      contract.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : contract.status === "Expired"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {contract.status}
                  </Badge>
                  {contract.status === "Active" && isExpiringSoon(contract.end_date) && (
                    <div className="mt-1">
                      <Badge className="bg-amber-100 text-amber-800 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Expiring Soon
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
                        <Link 
                          to={`/carrier/${carrierId}/contract/${contract.id}`} 
                          className="flex items-center cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center cursor-pointer">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      {contract.status === "Active" && (
                        <DropdownMenuItem asChild>
                          <Link 
                            to={`/carrier/${carrierId}/contract/${contract.id}/renew`} 
                            className="flex items-center cursor-pointer"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Renew Contract
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {carrierContracts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No contracts found for this carrier.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
