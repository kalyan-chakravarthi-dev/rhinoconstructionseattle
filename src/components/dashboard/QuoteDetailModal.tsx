import { useState } from "react";
import { format } from "date-fns";
import { 
  X, MapPin, Phone, Mail, Calendar, Clock, FileText, 
  Download, MessageSquare, Send, CheckCircle2, XCircle, 
  PhoneCall, Image as ImageIcon, AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Quote, QUOTE_STATUS_CONFIG } from "@/data/quotes-mock";
import QuoteTimeline from "./QuoteTimeline";
import { cn } from "@/lib/utils";

interface QuoteDetailModalProps {
  quote: Quote | null;
  open: boolean;
  onClose: () => void;
}

const QuoteDetailModal = ({ quote, open, onClose }: QuoteDetailModalProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!quote) return null;

  const statusConfig = QUOTE_STATUS_CONFIG[quote.status];
  const canAccept = quote.status === 'quote_sent';
  const hasBreakdown = !!quote.breakdown;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewMessage("");
    setIsSending(false);
  };

  const urgencyConfig = {
    low: { label: 'Low', color: 'text-green-700 bg-green-100' },
    medium: { label: 'Medium', color: 'text-yellow-700 bg-yellow-100' },
    high: { label: 'High', color: 'text-orange-700 bg-orange-100' },
    emergency: { label: 'Emergency', color: 'text-red-700 bg-red-100' },
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-xl">{quote.id}</DialogTitle>
              <Badge className={cn(statusConfig.bgColor, statusConfig.color)}>
                {statusConfig.label}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">{quote.serviceType}</p>
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1">
          <div className="border-b px-6">
            <TabsList className="h-12 bg-transparent">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="quote" disabled={!hasBreakdown}>
                Quote {!hasBreakdown && "(Pending)"}
              </TabsTrigger>
              <TabsTrigger value="messages">
                Messages
                {quote.messages.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {quote.messages.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[60vh]">
            {/* Details Tab */}
            <TabsContent value="details" className="p-6 m-0 space-y-6">
              {/* Quote Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quote Information</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Quote ID</div>
                      <div className="font-medium">{quote.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Submitted</div>
                      <div className="font-medium">{format(new Date(quote.submittedDate), 'MMM d, yyyy')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Property Address</div>
                      <div className="font-medium">
                        {quote.propertyAddress.street}, {quote.propertyAddress.city}, {quote.propertyAddress.state} {quote.propertyAddress.zip}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Urgency</div>
                      <Badge className={urgencyConfig[quote.projectDetails.urgency].color}>
                        {urgencyConfig[quote.projectDetails.urgency].label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Description</div>
                    <p className="text-foreground">{quote.projectDetails.description}</p>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Scope of Work</div>
                    <div className="flex flex-wrap gap-2">
                      {quote.projectDetails.scopeOfWork.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Timeline Preference</div>
                    <p className="text-foreground">{quote.projectDetails.timeline}</p>
                  </div>

                  {quote.projectDetails.photos.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Photos ({quote.projectDetails.photos.length})</div>
                      <div className="grid grid-cols-4 gap-2">
                        {quote.projectDetails.photos.map((photo, index) => (
                          <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{quote.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{quote.contactInfo.phone}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quote/Breakdown Tab */}
            <TabsContent value="quote" className="p-6 m-0 space-y-6">
              {quote.breakdown ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quote Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Labor</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.labor)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Materials</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.materials)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Permits</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.permits)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Other Fees</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.otherFees)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (10%)</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.tax)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-primary">{formatCurrency(quote.breakdown.total)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quote Valid Until</span>
                        <span className="font-medium">{format(new Date(quote.breakdown.validUntil), 'MMM d, yyyy')}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment Terms</span>
                        <p className="font-medium mt-1">{quote.breakdown.paymentTerms}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {canAccept && (
                    <Card className="border-primary/50 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3 mb-4">
                          <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Action Required</h4>
                            <p className="text-sm text-muted-foreground">
                              Please review the quote and respond by {format(new Date(quote.breakdown.validUntil), 'MMM d, yyyy')}.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button className="flex-1">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Accept Quote
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Request Changes
                          </Button>
                          <Button variant="ghost" className="text-destructive hover:text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF Quote
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Schedule Call
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Quote Pending</h3>
                  <p className="text-muted-foreground">
                    Our team is reviewing your request. You'll receive a detailed quote soon.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="p-6 m-0">
              <div className="space-y-4 mb-4">
                {quote.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
                    <p className="text-muted-foreground">
                      Start a conversation with our team below.
                    </p>
                  </div>
                ) : (
                  quote.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "p-4 rounded-lg",
                        message.sender === 'customer'
                          ? "bg-primary text-primary-foreground ml-8"
                          : "bg-muted mr-8"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{message.senderName}</span>
                        <span className={cn(
                          "text-xs",
                          message.sender === 'customer' ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {format(new Date(message.timestamp), "MMM d 'at' h:mm a")}
                        </span>
                      </div>
                      <p className={message.sender === 'customer' ? "text-primary-foreground/90" : ""}>
                        {message.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isSending}
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="p-6 m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quote Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuoteTimeline events={quote.timeline} />
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDetailModal;
