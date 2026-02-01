import { CreditCard, Plus, Trash2, Receipt, Download } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock payment methods
const mockPaymentMethods = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiry: "12/25",
    primary: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "8888",
    expiry: "06/26",
    primary: false,
  },
];

// Mock billing history
const mockBillingHistory = [
  {
    id: 1,
    date: "Jan 15, 2024",
    description: "Roof Repair - Final Payment",
    amount: "$2,450.00",
    status: "paid",
  },
  {
    id: 2,
    date: "Dec 20, 2023",
    description: "Kitchen Remodel - Deposit",
    amount: "$5,000.00",
    status: "paid",
  },
  {
    id: 3,
    date: "Nov 10, 2023",
    description: "Bathroom Renovation - Final Payment",
    amount: "$3,200.00",
    status: "paid",
  },
];

const getCardIcon = (type: string) => {
  // Simple card brand display
  const brands: Record<string, string> = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
  };
  return brands[type] || type.toUpperCase();
};

const SettingsPayments = () => {
  return (
    <SettingsLayout 
      title="Payment Methods" 
      description="Manage your payment methods and view billing history"
    >
      <div className="space-y-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Saved Payment Methods</CardTitle>
                <CardDescription>
                  Manage cards for payments and deposits
                </CardDescription>
              </div>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPaymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-10 rounded bg-gradient-to-br from-primary to-rhino-blue-dark flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">
                        {getCardIcon(method.type)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          •••• •••• •••• {method.last4}
                        </p>
                        {method.primary && (
                          <Badge variant="secondary" className="text-xs">Primary</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    {!method.primary && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Billing History</CardTitle>
                <CardDescription>
                  View past payments and download receipts
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Receipt className="w-4 h-4 mr-2" />
                View All Invoices
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBillingHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.date}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className="capitalize"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default SettingsPayments;
