import { format } from "date-fns";
import { Check, Clock, Circle } from "lucide-react";
import { QuoteTimelineEvent } from "@/data/quotes-mock";
import { cn } from "@/lib/utils";

interface QuoteTimelineProps {
  events: QuoteTimelineEvent[];
}

const QuoteTimeline = ({ events }: QuoteTimelineProps) => {
  return (
    <div className="relative">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        
        return (
          <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
            {/* Timeline line and icon */}
            <div className="relative flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 z-10",
                  event.completed 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : event.current 
                      ? "bg-background border-primary text-primary animate-pulse"
                      : "bg-muted border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {event.completed ? (
                  <Check className="h-4 w-4" />
                ) : event.current ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
              </div>
              {!isLast && (
                <div 
                  className={cn(
                    "absolute top-8 w-0.5 h-[calc(100%-1rem)]",
                    event.completed ? "bg-primary" : "bg-muted-foreground/30"
                  )} 
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div 
                className={cn(
                  "font-medium",
                  event.completed || event.current 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                {event.label}
              </div>
              {event.timestamp && (
                <div className="text-sm text-muted-foreground mt-0.5">
                  {format(new Date(event.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </div>
              )}
              {event.current && !event.timestamp && (
                <div className="text-sm text-primary mt-0.5">
                  Waiting...
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuoteTimeline;
