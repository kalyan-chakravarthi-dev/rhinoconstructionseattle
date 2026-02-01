import { useState, useEffect, useRef } from "react";
import { Camera, Trash2, Pencil, X, Check } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber } from "@/lib/validations";

// Types
interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone: string;
  company: string;
}

interface MailingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface ProfileData {
  personalDetails: PersonalDetails;
  mailingAddress: MailingAddress;
  avatarUrl: string | null;
  sameAsService: boolean;
}

// Default mock data
const defaultProfileData: ProfileData = {
  personalDetails: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "(206) 555-1234",
    altPhone: "",
    company: "",
  },
  mailingAddress: {
    street: "123 Main Street",
    city: "Seattle",
    state: "WA",
    zip: "98101",
  },
  avatarUrl: null,
  sameAsService: false,
};

// Mock service address (would come from addresses page in real app)
const mockServiceAddress: MailingAddress = {
  street: "456 Oak Avenue",
  city: "Seattle",
  state: "WA",
  zip: "98102",
};

const STORAGE_KEY = "rhino_profile_data";

// Validation errors type
interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const SettingsProfile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load from localStorage or use defaults
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultProfileData;
      }
    }
    return defaultProfileData;
  });
  
  // Edit mode states
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  // Temporary edit values
  const [editPersonal, setEditPersonal] = useState<PersonalDetails>(profileData.personalDetails);
  const [editAddress, setEditAddress] = useState<MailingAddress>(profileData.mailingAddress);
  const [sameAsService, setSameAsService] = useState(profileData.sameAsService);
  
  // Validation errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }, [profileData]);

  // Get user initials
  const getInitials = () => {
    const first = profileData.personalDetails.firstName.charAt(0).toUpperCase();
    const last = profileData.personalDetails.lastName.charAt(0).toUpperCase();
    return `${first}${last}`;
  };

  // Validate personal details
  const validatePersonalDetails = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!editPersonal.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (editPersonal.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    if (!editPersonal.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (editPersonal.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!editPersonal.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editPersonal.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!editPersonal.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(editPersonal.phone)) {
      newErrors.phone = "Phone must be in format (XXX) XXX-XXXX";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle phone formatting
  const handlePhoneChange = (field: 'phone' | 'altPhone', value: string) => {
    const formatted = formatPhoneNumber(value);
    setEditPersonal(prev => ({ ...prev, [field]: formatted }));
  };

  // Save personal details
  const savePersonalDetails = () => {
    if (!validatePersonalDetails()) return;
    
    setProfileData(prev => ({
      ...prev,
      personalDetails: editPersonal,
    }));
    setIsEditingPersonal(false);
    setErrors({});
    toast({
      title: "Profile updated",
      description: "Your personal details have been saved successfully.",
    });
  };

  // Cancel personal details edit
  const cancelPersonalEdit = () => {
    setEditPersonal(profileData.personalDetails);
    setIsEditingPersonal(false);
    setErrors({});
  };

  // Start editing personal details
  const startEditingPersonal = () => {
    setEditPersonal(profileData.personalDetails);
    setIsEditingPersonal(true);
  };

  // Save mailing address
  const saveMailingAddress = () => {
    setProfileData(prev => ({
      ...prev,
      mailingAddress: editAddress,
      sameAsService,
    }));
    setIsEditingAddress(false);
    toast({
      title: "Address updated",
      description: "Your mailing address has been saved successfully.",
    });
  };

  // Cancel address edit
  const cancelAddressEdit = () => {
    setEditAddress(profileData.mailingAddress);
    setSameAsService(profileData.sameAsService);
    setIsEditingAddress(false);
  };

  // Start editing address
  const startEditingAddress = () => {
    setEditAddress(profileData.mailingAddress);
    setSameAsService(profileData.sameAsService);
    setIsEditingAddress(true);
  };

  // Handle "Same as service address" toggle
  const handleSameAsServiceChange = (checked: boolean) => {
    setSameAsService(checked);
    if (checked) {
      setEditAddress(mockServiceAddress);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Create data URL for demo persistence
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfileData(prev => ({ ...prev, avatarUrl: dataUrl }));
      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been updated.",
      });
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove avatar
  const removeAvatar = () => {
    setProfileData(prev => ({ ...prev, avatarUrl: null }));
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
    });
  };

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
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.avatarUrl || undefined} alt="Profile photo" />
                <AvatarFallback className="text-2xl font-bold bg-secondary text-secondary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  {profileData.avatarUrl && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={removeAvatar}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG. Max 5MB.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  aria-label="Upload profile photo"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Personal Details</CardTitle>
              <CardDescription>
                Your basic contact information
              </CardDescription>
            </div>
            {!isEditingPersonal && (
              <Button variant="ghost" size="sm" onClick={startEditingPersonal}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>
                {isEditingPersonal ? (
                  <>
                    <Input 
                      id="firstName" 
                      value={editPersonal.firstName}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, firstName: e.target.value }))}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-xs text-destructive">{errors.firstName}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.personalDetails.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                {isEditingPersonal ? (
                  <>
                    <Input 
                      id="lastName" 
                      value={editPersonal.lastName}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, lastName: e.target.value }))}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-xs text-destructive">{errors.lastName}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.personalDetails.lastName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                {isEditingPersonal ? (
                  <>
                    <Input 
                      id="email" 
                      type="email"
                      value={editPersonal.email}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, email: e.target.value }))}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.personalDetails.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                {isEditingPersonal ? (
                  <>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={editPersonal.phone}
                      onChange={(e) => handlePhoneChange('phone', e.target.value)}
                      placeholder="(XXX) XXX-XXXX"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-destructive">{errors.phone}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.personalDetails.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="altPhone">Alternative Phone</Label>
                {isEditingPersonal ? (
                  <Input 
                    id="altPhone" 
                    type="tel"
                    value={editPersonal.altPhone}
                    onChange={(e) => handlePhoneChange('altPhone', e.target.value)}
                    placeholder="Optional"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">
                    {profileData.personalDetails.altPhone || <span className="text-muted-foreground">Not provided</span>}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                {isEditingPersonal ? (
                  <Input 
                    id="company" 
                    value={editPersonal.company}
                    onChange={(e) => setEditPersonal(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Optional - for business accounts"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">
                    {profileData.personalDetails.company || <span className="text-muted-foreground">Not provided</span>}
                  </p>
                )}
              </div>
            </div>
            
            {isEditingPersonal && (
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" size="sm" onClick={cancelPersonalEdit}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button variant="hero" size="sm" onClick={savePersonalDetails}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mailing Address */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Mailing Address</CardTitle>
              <CardDescription>
                Where we send invoices and correspondence
              </CardDescription>
            </div>
            {!isEditingAddress && (
              <Button variant="ghost" size="sm" onClick={startEditingAddress}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isEditingAddress && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sameAsService" 
                    checked={sameAsService}
                    onCheckedChange={handleSameAsServiceChange}
                  />
                  <Label htmlFor="sameAsService" className="text-sm font-normal cursor-pointer">
                    Same as primary service address
                  </Label>
                </div>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  {isEditingAddress ? (
                    <Input 
                      id="street" 
                      value={editAddress.street}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, street: e.target.value }))}
                      disabled={sameAsService}
                    />
                  ) : (
                    <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.mailingAddress.street}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  {isEditingAddress ? (
                    <Input 
                      id="city" 
                      value={editAddress.city}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, city: e.target.value }))}
                      disabled={sameAsService}
                    />
                  ) : (
                    <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.mailingAddress.city}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    {isEditingAddress ? (
                      <Input 
                        id="state" 
                        value={editAddress.state}
                        onChange={(e) => setEditAddress(prev => ({ ...prev, state: e.target.value.toUpperCase().slice(0, 2) }))}
                        disabled={sameAsService}
                        maxLength={2}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.mailingAddress.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    {isEditingAddress ? (
                      <Input 
                        id="zip" 
                        value={editAddress.zip}
                        onChange={(e) => setEditAddress(prev => ({ ...prev, zip: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                        disabled={sameAsService}
                        maxLength={5}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{profileData.mailingAddress.zip}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {isEditingAddress && (
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={cancelAddressEdit}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button variant="hero" size="sm" onClick={saveMailingAddress}>
                    <Check className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default SettingsProfile;
