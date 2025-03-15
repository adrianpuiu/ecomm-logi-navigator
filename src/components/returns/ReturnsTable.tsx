
import { useEffect, useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Loader2 } from "lucide-react";
import { ReturnInfo } from "@/types/shipment";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

// Generate mock return data for the demo
const generateMockReturns = (count: number, status: string): ReturnInfo[] => {
  const statuses = status.split(',');
  
  return Array(count).fill(null).map((_, index) => {
    const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `RMA-${10000 + index}`,
      requestedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: currentStatus as any,
      reason: ["Damaged item", "Wrong item received", "No longer needed", "Defective product"][Math.floor(Math.random() * 4)],
      trackingNumber: currentStatus === "in_transit" ? `TRK${900000 + index}` : "",
      returnItems: [
        {
          itemId: `ITEM-${1000 + index}`,
          quantity: Math.floor(Math.random() * 3) + 1,
          reason: ["Damaged", "Wrong item", "Defective", "Other"][Math.floor(Math.random() * 4)]
        }
      ],
      refundAmount: Math.random() > 0.5 ? Math.floor(Math.random() * 10000) / 100 : undefined
    };
  });
};

interface ReturnsTableProps {
  status: string;
  searchQuery: string;
  startDate?: Date;
  endDate?: Date;
}

export function ReturnsTable({ status, searchQuery, startDate, endDate }: ReturnsTableProps) {
  const [loading, setLoading] = useState(true);
  const [returns, setReturns] = useState<ReturnInfo[]>([]);
  
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timeout = setTimeout(() => {
      const mockData = generateMockReturns(15, status);
      
      // Apply filtering based on searchQuery
      let filteredData = mockData;
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredData = filteredData.filter(returnItem => 
          returnItem.id.toLowerCase().includes(query)
        );
      }
      
      // Apply date filtering if dates are provided
      if (startDate && endDate) {
        const start = startDate.setHours(0, 0, 0, 0);
        const end = endDate.setHours(23, 59, 59, 999);
        
        filteredData = filteredData.filter(returnItem => {
          const requestDate = new Date(returnItem.requestedAt).getTime();
          return requestDate >= start && requestDate <= end;
        });
      }
      
      setReturns(filteredData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, [status, searchQuery, startDate, endDate]);
  
  const statusColors: Record<string, string> = {
    requested: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    approved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    in_transit: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    received: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (returns.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No returns found matching the current filters
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>RMA #</TableHead>
            <TableHead>Requested On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Tracking #</TableHead>
            <TableHead>Refund Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.map((returnItem) => (
            <TableRow key={returnItem.id}>
              <TableCell className="font-medium">{returnItem.id}</TableCell>
              <TableCell>{formatDate(returnItem.requestedAt)}</TableCell>
              <TableCell>
                <Badge className={`${statusColors[returnItem.status]}`}>
                  {returnItem.status.replace('_', ' ').charAt(0).toUpperCase() + returnItem.status.replace('_', ' ').slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="truncate block max-w-[200px]">{returnItem.reason}</span>
              </TableCell>
              <TableCell>
                {returnItem.trackingNumber ? returnItem.trackingNumber : "—"}
              </TableCell>
              <TableCell>
                {returnItem.refundAmount !== undefined ? `$${returnItem.refundAmount.toFixed(2)}` : "—"}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/returns/${returnItem.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
