
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ReturnStatusFilterProps {
  onStatusChange: (status: string) => void;
  selectedStatus: string;
}

export function ReturnStatusFilter({ onStatusChange, selectedStatus }: ReturnStatusFilterProps) {
  return (
    <Select 
      defaultValue={selectedStatus} 
      onValueChange={onStatusChange}
      value={selectedStatus}
    >
      <SelectTrigger>
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="requested">Requested</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="in_transit">In Transit</SelectItem>
        <SelectItem value="received">Received</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}
