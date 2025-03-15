
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Return {
  id: string;
  returnNumber: string;
  date: string;
  status: string;
  items: number;
  refundAmount: number;
  reason: string;
}

interface CustomerReturnHistoryProps {
  customerId: string;
}

export function CustomerReturnHistory({ customerId }: CustomerReturnHistoryProps) {
  const navigate = useNavigate();
  
  // Mock data for customer returns
  const mockReturns: Return[] = [
    {
      id: "r1",
      returnNumber: "RMA-5678",
      date: "2023-06-01",
      status: "completed",
      items: 1,
      refundAmount: 49.99,
      reason: "Damaged"
    },
    {
      id: "r2",
      returnNumber: "RMA-5679",
      date: "2023-07-15",
      status: "in_transit",
      items: 2,
      refundAmount: 89.98,
      reason: "Wrong size"
    },
    {
      id: "r3",
      returnNumber: "RMA-5680",
      date: "2023-08-10",
      status: "approved",
      items: 1,
      refundAmount: 29.99,
      reason: "Changed mind"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Requested</Badge>;
      case "approved":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Approved</Badge>;
      case "in_transit":
        return <Badge className="bg-purple-500 hover:bg-purple-600">In Transit</Badge>;
      case "received":
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">Received</Badge>;
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Return History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RMA #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Refund Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReturns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No returns found.
                </TableCell>
              </TableRow>
            ) : (
              mockReturns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell className="font-medium">{returnItem.returnNumber}</TableCell>
                  <TableCell>{formatDate(new Date(returnItem.date))}</TableCell>
                  <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                  <TableCell>{returnItem.items}</TableCell>
                  <TableCell>${returnItem.refundAmount.toFixed(2)}</TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/returns/${returnItem.id}`)}
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
    </div>
  );
}
