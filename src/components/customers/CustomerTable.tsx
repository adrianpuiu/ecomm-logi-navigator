
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Phone, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

// Mock customer data
const mockCustomers = [
  {
    id: "c1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    registrationDate: "2023-01-15",
    orderCount: 12,
    totalSpent: 1245.99,
    segment: "regular",
  },
  {
    id: "c2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    registrationDate: "2023-02-22",
    orderCount: 5,
    totalSpent: 499.50,
    segment: "new",
  },
  {
    id: "c3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    registrationDate: "2022-11-08",
    orderCount: 24,
    totalSpent: 3689.75,
    segment: "vip",
  },
  {
    id: "c4",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    phone: "+1 (555) 876-5432",
    registrationDate: "2023-03-10",
    orderCount: 2,
    totalSpent: 159.98,
    segment: "new",
  },
  {
    id: "c5",
    firstName: "Michael",
    lastName: "Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 234-5678",
    registrationDate: "2022-09-01",
    orderCount: 18,
    totalSpent: 2345.67,
    segment: "vip",
  },
];

interface CustomerTableProps {
  searchTerm: string;
  selectedSegment: string;
}

export function CustomerTable({ searchTerm, selectedSegment }: CustomerTableProps) {
  const navigate = useNavigate();
  
  // Apply filters
  const filteredCustomers = mockCustomers.filter(customer => {
    // Search filter
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      fullName.includes(search) || 
      customer.email.toLowerCase().includes(search) || 
      customer.phone.includes(search);
    
    // Segment filter
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment;
    
    return matchesSearch && matchesSegment;
  });

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Information</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.firstName} {customer.lastName}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                      {customer.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(customer.registrationDate)}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm">{customer.orderCount} orders</span>
                    <span className="text-sm font-semibold">${customer.totalSpent.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="mr-2 h-3 w-3 text-muted-foreground" />
                    {getSegmentBadge(customer.segment)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/customers/${customer.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
