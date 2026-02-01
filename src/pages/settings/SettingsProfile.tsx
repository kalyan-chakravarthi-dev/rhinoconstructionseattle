import { User, Camera, Trash2 } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

// Mock user data
const mockUser = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@email.com",
  phone: "(206) 555-1234",
  altPhone: "",
  company: "",
  address: {
    street: "123 Main Street",
    city: "Seattle",
    state: "WA",
    zip: "98101",
  },
  initials: "JS",
};

const SettingsProfile = () => {
  return (
    <SettingsLayout 
      title="Profile Settings" 
      description="Manage your personal information and preferences"
    >
      <div className="space-y-6">
        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Photo</CardTitle>
            <CardDescription>
              Upload a photo to personalize your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-2xl">
                  {mockUser.initials}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG. Max 5MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Details</CardTitle>
            <CardDescription>
              Your basic contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" defaultValue={mockUser.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" defaultValue={mockUser.lastName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" defaultValue={mockUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" defaultValue={mockUser.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="altPhone">Alternative Phone</Label>
                <Input id="altPhone" type="tel" placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Optional - for business accounts" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mailing Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mailing Address</CardTitle>
            <CardDescription>
              Where we send invoices and correspondence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="sameAsService" />
                <Label htmlFor="sameAsService" className="text-sm font-normal">
                  Same as primary service address
                </Label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" defaultValue={mockUser.address.street} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={mockUser.address.city} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue={mockUser.address.state} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" defaultValue={mockUser.address.zip} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <Button variant="outline">Cancel</Button>
          <Button variant="hero">Save Changes</Button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsProfile;
