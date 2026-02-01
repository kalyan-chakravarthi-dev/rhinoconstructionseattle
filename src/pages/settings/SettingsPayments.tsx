import { useState, useEffect } from "react";
import { CreditCard, Plus, Trash2, Receipt, Download, Star } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { STORAGE_KEYS } from "@/lib/constants";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  nameOnCard: string;
  billingZip: string;
  primary: boolean;
}

interface CardForm {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
  billingZip: string;
  setAsPrimary: boolean;
}

const INITIAL_FORM: CardForm = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  nameOnCard: "",
  billingZip: "",
  setAsPrimary: false,
};

// Mock billing history (static)
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

const detectCardBrand = (number: string): string => {
  const cleaned = number.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";
  return "card";
};

const getCardIcon = (brand: string) => {
  const brands: Record<string, string> = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    discover: "DISC",
    card: "CARD",
  };
  return brands[brand] || brand.toUpperCase();
};

const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").slice(0, 16);
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(" ") : cleaned;
};

const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  return cleaned;
};

const loadPaymentMethods = (): PaymentMethod[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load payment methods:", error);
  }
  return [];
};

const savePaymentMethods = (methods: PaymentMethod[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
  } catch (error) {
    console.error("Failed to save payment methods:", error);
  }
};

const SettingsPayments = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => loadPaymentMethods());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<CardForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CardForm, string>>>({});

  // Persist to localStorage whenever payment methods change
  useEffect(() => {
    savePaymentMethods(paymentMethods);
  }, [paymentMethods]);

  const handleOpenAdd = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const handleFormChange = (field: keyof CardForm, value: string | boolean) => {
    if (field === "cardNumber" && typeof value === "string") {
      setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
    } else if (field === "expiry" && typeof value === "string") {
      setForm((prev) => ({ ...prev, expiry: formatExpiry(value) }));
    } else if (field === "cvv" && typeof value === "string") {
      setForm((prev) => ({ ...prev, cvv: value.replace(/\D/g, "").slice(0, 4) }));
    } else if (field === "billingZip" && typeof value === "string") {
      setForm((prev) => ({ ...prev, billingZip: value.replace(/\D/g, "").slice(0, 5) }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CardForm, string>> = {};
    
    const cardDigits = form.cardNumber.replace(/\s/g, "");
    if (cardDigits.length < 13 || cardDigits.length > 16) {
      newErrors.cardNumber = "Enter a valid card number";
    }

    const expiryParts = form.expiry.split("/");
    if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
      newErrors.expiry = "Enter as MM/YY";
    } else {
      const month = parseInt(expiryParts[0], 10);
      if (month < 1 || month > 12) {
        newErrors.expiry = "Invalid month";
      }
    }

    if (form.cvv.length < 3 || form.cvv.length > 4) {
      newErrors.cvv = "3-4 digits required";
    }

    if (form.nameOnCard.trim().length < 2) {
      newErrors.nameOnCard = "Enter name on card";
    }

    if (form.billingZip.length !== 5) {
      newErrors.billingZip = "Enter 5-digit ZIP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    const cardDigits = form.cardNumber.replace(/\s/g, "");
    const isFirst = paymentMethods.length === 0;
    const shouldBePrimary = form.setAsPrimary || isFirst;

    const newCard: PaymentMethod = {
      id: crypto.randomUUID(),
      brand: detectCardBrand(cardDigits),
      last4: cardDigits.slice(-4),
      expiry: form.expiry,
      nameOnCard: form.nameOnCard.trim(),
      billingZip: form.billingZip,
      primary: shouldBePrimary,
    };

    // Note: CVV is NOT stored - only used for validation UI

    setPaymentMethods((prev) => {
      let updated = [...prev];
      if (shouldBePrimary) {
        updated = updated.map((m) => ({ ...m, primary: false }));
      }
      return [...updated, newCard];
    });

    toast({
      title: "Card added",
      description: `Card ending in ${newCard.last4} has been added${shouldBePrimary ? " as your primary payment method" : ""}.`,
    });

    handleCloseModal();
  };

  const handleRemove = () => {
    if (!deleteId) return;
    
    const cardToDelete = paymentMethods.find((m) => m.id === deleteId);
    setPaymentMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== deleteId);
      // If we deleted the primary, make the first remaining one primary
      if (cardToDelete?.primary && filtered.length > 0) {
        filtered[0].primary = true;
      }
      return filtered;
    });
    
    toast({
      title: "Card removed",
      description: `Card ending in ${cardToDelete?.last4} has been removed.`,
    });
    setDeleteId(null);
  };

  const handleSetPrimary = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({
        ...m,
        primary: m.id === id,
      }))
    );
    const card = paymentMethods.find((m) => m.id === id);
    toast({
      title: "Primary card updated",
      description: `Card ending in ${card?.last4} is now your primary payment method.`,
    });
  };

  return (
    <SettingsLayout 
      title="Payment Methods" 
      description="Manage your payment methods and view billing history"
    >
      <div className="space-y-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Saved Payment Methods</CardTitle>
                <CardDescription>
                  Manage cards for payments and deposits
                </CardDescription>
              </div>
              <Button variant="hero" size="sm" onClick={handleOpenAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-10 rounded bg-gradient-to-br from-primary to-rhino-blue-dark flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-xs font-bold">
                          {getCardIcon(method.brand)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-foreground">
                            •••• •••• •••• {method.last4}
                          </p>
                          {method.primary && (
                            <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary hover:bg-secondary/10">
                              Primary
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                      {!method.primary && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetPrimary(method.id)}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Set Primary
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={method.primary && paymentMethods.length > 1}
                        onClick={() => setDeleteId(method.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">No payment methods saved</p>
                <Button variant="outline" onClick={handleOpenAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Card
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

      {/* Add Card Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a credit or debit card for payments and deposits.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={(e) => handleFormChange("cardNumber", e.target.value)}
                className={errors.cardNumber ? "border-destructive" : ""}
                inputMode="numeric"
              />
              {errors.cardNumber && (
                <p className="text-xs text-destructive">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry *</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e) => handleFormChange("expiry", e.target.value)}
                  className={errors.expiry ? "border-destructive" : ""}
                  inputMode="numeric"
                />
                {errors.expiry && (
                  <p className="text-xs text-destructive">{errors.expiry}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={form.cvv}
                  onChange={(e) => handleFormChange("cvv", e.target.value)}
                  className={errors.cvv ? "border-destructive" : ""}
                  inputMode="numeric"
                  type="password"
                  autoComplete="cc-csc"
                />
                {errors.cvv && (
                  <p className="text-xs text-destructive">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card *</Label>
              <Input
                id="nameOnCard"
                placeholder="John Doe"
                value={form.nameOnCard}
                onChange={(e) => handleFormChange("nameOnCard", e.target.value)}
                className={errors.nameOnCard ? "border-destructive" : ""}
                autoComplete="cc-name"
              />
              {errors.nameOnCard && (
                <p className="text-xs text-destructive">{errors.nameOnCard}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingZip">Billing ZIP Code *</Label>
              <Input
                id="billingZip"
                placeholder="98101"
                value={form.billingZip}
                onChange={(e) => handleFormChange("billingZip", e.target.value)}
                className={errors.billingZip ? "border-destructive" : ""}
                inputMode="numeric"
                maxLength={5}
              />
              {errors.billingZip && (
                <p className="text-xs text-destructive">{errors.billingZip}</p>
              )}
            </div>

            {paymentMethods.length > 0 && (
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="setAsPrimary"
                  checked={form.setAsPrimary}
                  onCheckedChange={(checked) => handleFormChange("setAsPrimary", !!checked)}
                />
                <Label htmlFor="setAsPrimary" className="text-sm font-normal cursor-pointer">
                  Set as primary payment method
                </Label>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleSave}>
              Add Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this card?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the card ending in {paymentMethods.find((m) => m.id === deleteId)?.last4} from your saved payment methods.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsLayout>
  );
};

export default SettingsPayments;
