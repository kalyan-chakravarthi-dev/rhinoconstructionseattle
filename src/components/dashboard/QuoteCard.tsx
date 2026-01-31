import { format, formatDistanceToNow } from "date-fns";
import { MapPin, Calendar, Clock, ChevronRight, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote, QUOTE_STATUS_CONFIG } from "@/data/quotes-mock";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: Quote;
  onViewDetails: (quote: Quote) => void;
  viewMode: 'card' | 'table';
}

const QuoteCard = ({ quote, onViewDetails, viewMode }: QuoteCardProps) => {
  const statusConfig = QUOTE_STATUS_CONFIG[quote.status];
  const hasUnreadMessages = quote.messages.length > 0 && quote.messages[quote.messages.length - 1].sender === 'team';
  const needsAction = quote.status === 'quote_sent';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  if (viewMode === 'table') {
    return (
      <tr 
        className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={() => onViewDetails(quote)}
      >
        <td className="p-4">
          <div className="font-medium">{quote.id}</div>
          <div className="text-sm text-muted-foreground">{quote.serviceType}</div>
        </td>
        <td className="p-4">
          <Badge className={cn(statusConfig.bgColor, statusConfig.color, "hover:opacity-90")}>
            {statusConfig.label}
          </Badge>
        </td>
        <td className="p-4 text-sm">
          {quote.propertyAddress.street}, {quote.propertyAddress.city}
        </td>
        <td className="p-4 text-sm">
          {format(new Date(quote.submittedDate), 'MMM d, yyyy')}
        </td>
        <td className="p-4 text-sm">
          {quote.estimatedValue 
            ? `${formatCurrency(quote.estimatedValue.min)} - ${formatCurrency(quote.estimatedValue.max)}`
            : '—'
          }
        </td>
        <td className="p-4 text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(quote.lastUpdated), { addSuffix: true })}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            {hasUnreadMessages && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
            <Button variant="ghost" size="sm">
              View <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow cursor-pointer",
        needsAction && "ring-2 ring-primary/50"
      )}
      onClick={() => onViewDetails(quote)}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">{quote.id}</span>
              {hasUnreadMessages && (
                <Badge variant="secondary" className="text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  New Message
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-medium">{quote.serviceType}</h3>
          </div>
          <Badge className={cn(statusConfig.bgColor, statusConfig.color, "hover:opacity-90")}>
            {statusConfig.label}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{quote.propertyAddress.street}, {quote.propertyAddress.city}, {quote.propertyAddress.state}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Submitted {format(new Date(quote.submittedDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>Updated {formatDistanceToNow(new Date(quote.lastUpdated), { addSuffix: true })}</span>
          </div>
        </div>

        {/* Estimated Value */}
        {quote.estimatedValue && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <div className="text-sm text-muted-foreground mb-1">Estimated Value</div>
            <div className="text-lg font-semibold text-foreground">
              {formatCurrency(quote.estimatedValue.min)} - {formatCurrency(quote.estimatedValue.max)}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onViewDetails(quote); }}>
            View Details
          </Button>
          {needsAction && (
            <Button size="sm" onClick={(e) => { e.stopPropagation(); onViewDetails(quote); }}>
              Review Quote
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
