
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CheckCircle, 
  Clock, 
  PackageCheck, 
  RefreshCw, 
  Truck, 
  XCircle, 
  Calendar 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TimelineEvent {
  date: string;
  status: string;
  description: string;
}

interface ReturnTimelineProps {
  timeline: TimelineEvent[];
}

export function ReturnTimeline({ timeline }: ReturnTimelineProps) {
  // Sort timeline by date (newest first)
  const sortedTimeline = [...timeline].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "requested":
        return <Clock className="h-5 w-5 text-purple-500" />;
      case "approved":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "in_transit":
        return <Truck className="h-5 w-5 text-yellow-500" />;
      case "received":
        return <PackageCheck className="h-5 w-5 text-indigo-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <RefreshCw size={18} className="text-primary" />
          Return Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul className="-mb-8">
            {sortedTimeline.map((event, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== timeline.length - 1 && (
                    <span 
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-muted" 
                      aria-hidden="true" 
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {getStatusIcon(event.status)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('_', ' ')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(event.date)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
