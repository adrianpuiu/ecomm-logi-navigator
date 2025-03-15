
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Communication {
  id: string;
  type: string;
  date: string;
  subject: string;
  content: string;
  direction: string;
}

interface CustomerCommunicationLogProps {
  customerId: string;
}

export function CustomerCommunicationLog({ customerId }: CustomerCommunicationLogProps) {
  // Mock data for customer communications
  const mockCommunications: Communication[] = [
    {
      id: "c1",
      type: "email",
      date: "2023-08-01T10:30:00",
      subject: "Order Confirmation",
      content: "Thank you for your order #ORD-12345. Your items will be shipped soon.",
      direction: "outgoing"
    },
    {
      id: "c2",
      type: "phone",
      date: "2023-08-05T14:45:00",
      subject: "Shipping Inquiry",
      content: "Customer called asking about the shipping status of order #ORD-12345. Informed that it's been shipped and provided tracking number.",
      direction: "incoming"
    },
    {
      id: "c3",
      type: "email",
      date: "2023-08-10T09:15:00",
      subject: "Return Request",
      content: "I would like to return the item from my order #ORD-12345 because it's damaged.",
      direction: "incoming"
    },
    {
      id: "c4",
      type: "chat",
      date: "2023-08-15T16:20:00",
      subject: "Return Approval",
      content: "Your return request has been approved. Please follow the instructions in the email to return the item.",
      direction: "outgoing"
    }
  ];

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-primary" />;
      case "phone":
        return <Phone className="h-4 w-4 text-primary" />;
      case "chat":
        return <MessageSquare className="h-4 w-4 text-primary" />;
      case "note":
        return <FileText className="h-4 w-4 text-primary" />;
      default:
        return <Mail className="h-4 w-4 text-primary" />;
    }
  };

  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case "incoming":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Incoming</Badge>;
      case "outgoing":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Outgoing</Badge>;
      default:
        return <Badge variant="outline">{direction}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Communication History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCommunications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No communications found.
                </TableCell>
              </TableRow>
            ) : (
              mockCommunications.map((comm) => (
                <TableRow key={comm.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getCommunicationIcon(comm.type)}
                      <span className="capitalize">{comm.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(comm.date)}
                  </TableCell>
                  <TableCell>
                    {getDirectionBadge(comm.direction)}
                  </TableCell>
                  <TableCell className="font-medium">{comm.subject}</TableCell>
                  <TableCell className="max-w-md truncate">{comm.content}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
