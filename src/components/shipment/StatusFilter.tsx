
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShipmentStatus } from "@/types/shipment";

interface StatusFilterProps {
  onStatusChange: (status: ShipmentStatus | 'all') => void;
  selectedStatus: ShipmentStatus | 'all';
}

// Format status for display
const formatStatus = (status: string) => {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function StatusFilter({ onStatusChange, selectedStatus }: StatusFilterProps) {
  const statuses: (ShipmentStatus | 'all')[] = [
    'all',
    'created',
    'processing',
    'picked_up',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'delayed',
    'exception',
    'cancelled',
    'returned'
  ];

  return (
    <Select value={selectedStatus} onValueChange={(value) => onStatusChange(value as ShipmentStatus | 'all')}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map(status => (
            <SelectItem key={status} value={status}>
              {status === 'all' ? 'All Statuses' : formatStatus(status)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
