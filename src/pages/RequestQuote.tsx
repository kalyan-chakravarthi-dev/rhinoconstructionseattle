import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import imageCompression from "browser-image-compression";
import { X, Upload, ChevronRight, ChevronLeft, Phone } from "lucide-react";
import rhinoLogo from "@/assets/rhino-remodeler-logo.png";
import { COMPANY_INFO } from "@/lib/constants";

// ============================================
// CONSTANTS & TYPES
// ============================================

const SERVICES = [
  { id: "kitchen", label: "Kitchen Remodeling" },
  { id: "bathroom", label: "Bathroom Renovation" },
  { id: "roofing", label: "Roofing Services" },
  { id: "electrical", label: "Electrical Work" },
  { id: "plumbing", label: "Plumbing Services" },
  { id: "repairs", label: "General Repairs" },
  { id: "painting", label: "Painting" },
  { id: "flooring", label: "Flooring" },
  { id: "other", label: "Other / Not Sure" },
];

const PROJECT_SIZES = [
  { id: "small", label: "Small – Under $5,000", hint: "Repairs or single-room work" },
  { id: "medium", label: "Medium – $5,000 to $20,000", hint: "Partial remodel" },
  { id: "large", label: "Large – $20,000 to $50,000", hint: "Full remodel or structural work" },
  { id: "major", label: "Major – $50,000+", hint: "Major renovation or addition" },
  { id: "unsure", label: "Not sure yet", hint: "We'll help you estimate" },
];

const STEP_LABELS = ["Project Details", "Photos", "Contact Info"];

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  status: "uploading" | "complete" | "error";
}

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif", "image/webp"];

// ============================================
// MAIN COMPONENT
// ============================================

const RequestQuoteNew = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step state
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Project Overview
  const [selectedService, setSelectedService] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("WA");

  // Step 2: Photos
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Step 3: Contact
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [createAccountLater, setCreateAccountLater] = useState(false);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [currentStep]);

  // ============================================
  // STEP 1 VALIDATION
  // ============================================

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedService) newErrors.service = "Please select a service";
    if (!projectSize) newErrors.projectSize = "Please select a project size";
    if (!city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Continue = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // ============================================
  // STEP 2: IMAGE UPLOAD
  // ============================================

  const compressImage = async (file: File): Promise<File> => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
    } catch {
      return file;
    }
  };

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const remainingSlots = MAX_IMAGES - uploadedImages.length;

    if (fileArray.length > remainingSlots) {
      toast({
        title: "Too many files",
        description: `You can only upload ${remainingSlots} more image(s)`,
        variant: "destructive",
      });
      return;
    }

    for (const file of fileArray) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format`,
          variant: "destructive",
        });
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const preview = URL.createObjectURL(file);

      const newImage: UploadedImage = {
        id,
        file,
        preview,
        name: file.name,
        status: "uploading",
      };

      setUploadedImages((prev) => [...prev, newImage]);

      try {
        const compressedFile = await compressImage(file);
        setUploadedImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, file: compressedFile, status: "complete" }
              : img
          )
        );
      } catch {
        setUploadedImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, status: "error" } : img
          )
        );
      }
    }
  }, [uploadedImages.length, toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) processFiles(event.target.files);
    event.target.value = "";
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleStep2Continue = () => setCurrentStep(3);
  const handleStep2Skip = () => setCurrentStep(3);

  // ============================================
  // STEP 3 VALIDATION & SUBMIT
  // ============================================

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getServiceLabel = () => {
    return SERVICES.find((s) => s.id === selectedService)?.label || selectedService;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    try {
      // Upload images
      const imageUrls: string[] = [];
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      for (const image of uploadedImages) {
        const sanitizedName = image.name
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9.\-_]/g, "");
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${sanitizedName}`;
        const filePath = `quotes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("quote-images")
          .upload(filePath, image.file, {
            contentType: image.file.type,
            upsert: false,
          });

        if (!uploadError) {
          imageUrls.push(`${supabaseUrl}/storage/v1/object/public/quote-images/${filePath}`);
        }
      }

      // Submit via Edge Function
      const { data: responseData, error: fnError } = await supabase.functions.invoke(
        "submit-quote",
        {
          body: {
            customer_name: fullName.trim(),
            email: email.trim(),
            phone: phone || null,
            service_requested: getServiceLabel(),
            property_city: city || null,
            property_state: state || null,
            message: projectDescription || null,
            image_urls: imageUrls,
          },
        }
      );

      if (fnError || (responseData && !responseData.success)) {
        throw new Error(responseData?.errors?.join(", ") || "Submission failed");
      }

      // Use the canonical tracking ID returned by the server
      const trackingId = responseData?.trackingId || "RQT-0000";

      // Store for confirmation page
      localStorage.setItem(
        "lastSubmittedQuote",
        JSON.stringify({
          id: trackingId,
          submittedAt: new Date().toISOString(),
          service: selectedService,
          projectSize,
          city,
          state,
          contactInfo: { fullName, email, phone },
        })
      );

      // Clear drafts
      localStorage.removeItem("quoteStep1");
      localStorage.removeItem("quoteStep2");
      localStorage.removeItem("quoteStep3");
      localStorage.removeItem("quoteStep4");

      navigate(`/request-quote/confirmation?id=${trackingId}`);
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo - links to home */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src={rhinoLogo} 
              alt="Rhino Remodeler" 
              className="h-10 sm:h-12 w-auto"
            />
            <span className="text-lg sm:text-xl font-bold text-primary tracking-tight hidden sm:inline">
              RHINO REMODELER
            </span>
          </Link>

          {/* Phone Number - tap to call */}
          <a 
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-2 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">{COMPANY_INFO.phone}</span>
            <span className="sm:hidden">Call Us</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[640px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Step Indicator */}
        <div className="mb-8">
          {/* Step Labels */}
          <div className="flex items-center justify-between mb-3">
            {STEP_LABELS.map((label, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === currentStep;
              const isComplete = stepNum < currentStep;
              return (
                <div 
                  key={label} 
                  className={cn(
                    "flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors",
                    isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <span className={cn(
                    "flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-xs font-semibold transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : isComplete ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {stepNum}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              );
            })}
          </div>
          {/* Progress Bar */}
          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  step <= currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Project Overview */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Tell us about your project
              </h1>
              <p className="mt-2 text-muted-foreground">
                A few details help us provide an accurate estimate.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Service Select */}
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium">
                  Service Requested
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger 
                    id="service" 
                    className={cn(
                      "h-12 text-base bg-background",
                      errors.service && "border-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select a service (Kitchen, Bathroom, Roofing…)" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((service) => (
                      <SelectItem key={service.id} value={service.id} className="py-3">
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service ? (
                  <p className="text-sm text-destructive">{errors.service}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Choose the service closest to your project</p>
                )}
              </div>

              {/* Project Size Select */}
              <div className="space-y-2">
                <Label htmlFor="projectSize" className="text-sm font-medium">
                  Project Size
                </Label>
                <Select value={projectSize} onValueChange={setProjectSize}>
                  <SelectTrigger 
                    id="projectSize" 
                    className={cn(
                      "h-12 text-base bg-background",
                      errors.projectSize && "border-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select project size" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_SIZES.map((size) => (
                      <SelectItem key={size.id} value={size.id} className="py-3">
                        <div className="flex flex-col items-start">
                          <span>{size.label}</span>
                          <span className="text-xs text-muted-foreground">{size.hint}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.projectSize && (
                  <p className="text-sm text-destructive">{errors.projectSize}</p>
                )}
              </div>

              {/* Description (optional) */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Brief Description <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Optional details that help us understand your project"
                  className="min-h-[80px] text-base bg-background resize-none"
                />
              </div>

              {/* Project Location Section */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Project Location
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Seattle"
                      className={cn(
                        "h-12 text-base bg-background",
                        errors.city && "border-destructive"
                      )}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="WA"
                      className="h-12 text-base bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <Button 
              onClick={handleStep1Continue} 
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Trust & Reassurance Microcopy */}
            <p className="text-center text-xs text-muted-foreground">
              Free estimate • No obligation • We'll contact you within 24 hours
            </p>
          </div>
        )}

        {/* Step 2: Upload Photos */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Upload photos
              </h1>
              <p className="mt-2 text-muted-foreground">
                Photos help us provide a faster, more accurate quote.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-base font-medium text-foreground mb-1">
                  Drag and drop photos here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  JPG, PNG, HEIC, WebP • Max 10MB each • Up to 10 images
                </p>
              </div>

              {/* Image Preview Grid */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative aspect-square group">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                        className="absolute top-1 right-1 p-1 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {image.status === "uploading" && (
                        <div className="absolute inset-0 bg-background/70 rounded-lg flex items-center justify-center">
                          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleStep2Skip}
                className="h-12 text-base font-medium sm:flex-1 order-2 sm:order-1"
              >
                Skip this step
              </Button>
              <Button
                onClick={handleStep2Continue}
                className="h-12 text-base font-medium sm:flex-1 order-1 sm:order-2"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Back Link */}
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to project details
            </button>
          </div>
        )}

        {/* Step 3: Contact & Submit */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                How can we reach you?
              </h1>
              <p className="mt-2 text-muted-foreground">
                We'll follow up within 24 hours.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                  className={cn(
                    "h-12 text-base bg-background",
                    errors.fullName && "border-destructive"
                  )}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    "h-12 text-base bg-background",
                    errors.email && "border-destructive"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Phone (optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(206) 555-1234"
                  className="h-12 text-base bg-background"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={marketingConsent}
                    onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground leading-tight">
                    Send me tips and special offers from Rhino Remodeler
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={createAccountLater}
                    onCheckedChange={(checked) => setCreateAccountLater(checked as boolean)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground leading-tight">
                    Create an account to track my quote
                  </span>
                </label>
              </div>

              {/* Inline Summary */}
              <div className="border-t border-border pt-6 mt-6">
                <p className="text-sm font-medium text-foreground mb-3">Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{getServiceLabel()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Size</span>
                    <span className="font-medium">
                      {PROJECT_SIZES.find((s) => s.id === projectSize)?.label.split(" – ")[0] || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{city ? `${city}, ${state}` : "—"}</span>
                  </div>
                  {uploadedImages.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Photos</span>
                      <span className="font-medium">{uploadedImages.length} uploaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Get Free Quote"
              )}
            </Button>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>Licensed & Insured</span>
              <span>•</span>
              <span>10+ Years in Business</span>
              <span>•</span>
              <span>Local Contractor – Kent, WA</span>
            </div>

            {/* Back Link */}
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to photos
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RequestQuoteNew;
