
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(undefined);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    setCalendarOpen(false);
    onDateRangeChange(startDate, date);
  };

  const handleCalendarClose = () => {
    onDateRangeChange(startDate, endDate);
  };

  const displayText = () => {
    if (startDate && endDate) {
      return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
    }
    if (startDate) {
      return `${format(startDate, "MMM d, yyyy")} - Select end date`;
    }
    return "Filter by date range";
  };

  const clearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onDateRangeChange(undefined, undefined);
    setCalendarOpen(false);
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left w-[250px]",
            (startDate || endDate) && "text-primary"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{displayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="space-y-2 p-2">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <h4 className="font-medium text-sm">Start Date</h4>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateSelect}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </div>

            {startDate && (
              <div className="grid gap-1">
                <h4 className="font-medium text-sm">End Date</h4>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) => date < startDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={clearDates}>
              Clear
            </Button>
            <Button size="sm" onClick={() => {
              setCalendarOpen(false);
              handleCalendarClose();
            }}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
