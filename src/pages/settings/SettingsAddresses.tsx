import { useState, useEffect } from "react";
import { MapPin, Plus, Home, Building, Pencil, Trash2, Star } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Address {
  id: string;
  nickname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  type: "residential" | "commercial";
  notes: string;
  primary: boolean;
}

const INITIAL_FORM: Omit<Address, "id" | "primary"> = {
  nickname: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  type: "residential",
  notes: "",
};

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const loadAddresses = (): Address[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICE_ADDRESSES);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load addresses:", error);
  }
  return [];
};

const saveAddresses = (addresses: Address[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVICE_ADDRESSES, JSON.stringify(addresses));
  } catch (error) {
    console.error("Failed to save addresses:", error);
  }
};

const SettingsAddresses = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>(() => loadAddresses());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);

  // Persist to localStorage whenever addresses change
  useEffect(() => {
    saveAddresses(addresses);
  }, [addresses]);

  const handleOpenAdd = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (address: Address) => {
    setForm({
      nickname: address.nickname,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      type: address.type,
      notes: address.notes,
    });
    setEditingId(address.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(INITIAL_FORM);
  };

  const handleFormChange = (field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!form.nickname.trim() || !form.street.trim() || !form.city.trim() || !form.state || !form.zip.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      // Update existing
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId
            ? { ...addr, ...form }
            : addr
        )
      );
      toast({
        title: "Address updated",
        description: `"${form.nickname}" has been updated.`,
      });
    } else {
      // Add new
      const isFirst = addresses.length === 0;
      const newAddress: Address = {
        id: crypto.randomUUID(),
        ...form,
        primary: isFirst, // First address is automatically primary
      };
      setAddresses((prev) => [...prev, newAddress]);
      toast({
        title: "Address added",
        description: `"${form.nickname}" has been added${isFirst ? " as your primary address" : ""}.`,
      });
    }

    handleCloseModal();
  };

  const handleRemove = () => {
    if (!deleteId) return;
    
    const addressToDelete = addresses.find((a) => a.id === deleteId);
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== deleteId);
      // If we deleted the primary, make the first remaining one primary
      if (addressToDelete?.primary && filtered.length > 0) {
        filtered[0].primary = true;
      }
      return filtered;
    });
    
    toast({
      title: "Address removed",
      description: `"${addressToDelete?.nickname}" has been removed.`,
    });
    setDeleteId(null);
  };

  const handleSetPrimary = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        primary: addr.id === id,
      }))
    );
    const address = addresses.find((a) => a.id === id);
    toast({
      title: "Primary address updated",
      description: `"${address?.nickname}" is now your primary address.`,
    });
  };

  return (
    <SettingsLayout 
      title="Service Addresses" 
      description="Manage properties for quotes and projects"
    >
      <div className="space-y-6">
        {/* Add New Address Button */}
        {addresses.length > 0 && (
          <div className="flex justify-end">
            <Button variant="hero" onClick={handleOpenAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>
        )}

        {/* Address Cards */}
        {addresses.length > 0 ? (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        {address.type === "commercial" ? (
                          <Building className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          <Home className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{address.nickname}</h3>
                          {address.primary && (
                            <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/10">
                              Primary
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {address.street}
                        </p>
                        <p className="text-muted-foreground">
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 capitalize">
                          {address.type} property
                        </p>
                        {address.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {address.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                      {!address.primary && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetPrimary(address.id)}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Set Primary
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(address)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={address.primary && addresses.length > 1}
                        onClick={() => setDeleteId(address.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No addresses yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first property to get started with quotes
              </p>
              <Button variant="hero" onClick={handleOpenAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Property" : "Add Property"}</DialogTitle>
            <DialogDescription>
              {editingId 
                ? "Update the details for this property." 
                : "Add a new property address for quotes and projects."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname *</Label>
              <Input
                id="nickname"
                placeholder="e.g., Main Home, Rental Property"
                value={form.nickname}
                onChange={(e) => handleFormChange("nickname", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                value={form.street}
                onChange={(e) => handleFormChange("street", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Seattle"
                  value={form.city}
                  onChange={(e) => handleFormChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select
                  value={form.state}
                  onValueChange={(value) => handleFormChange("state", value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  placeholder="98101"
                  value={form.zip}
                  onChange={(e) => handleFormChange("zip", e.target.value)}
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type *</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) => handleFormChange("type", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Gate code, parking instructions, etc."
                value={form.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this property?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{addresses.find((a) => a.id === deleteId)?.nickname}" from your saved addresses. 
              This action cannot be undone.
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

export default SettingsAddresses;
