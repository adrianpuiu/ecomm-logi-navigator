
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface CustomerSegmentFilterProps {
  selectedSegment: string;
  onSegmentChange: (segment: string) => void;
}

export function CustomerSegmentFilter({ 
  selectedSegment, 
  onSegmentChange 
}: CustomerSegmentFilterProps) {
  return (
    <Select 
      defaultValue={selectedSegment} 
      onValueChange={onSegmentChange}
      value={selectedSegment}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by segment" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Segments</SelectItem>
        <SelectItem value="vip">VIP</SelectItem>
        <SelectItem value="regular">Regular</SelectItem>
        <SelectItem value="new">New</SelectItem>
      </SelectContent>
    </Select>
  );
}
