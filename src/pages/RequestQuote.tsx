import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  Bath,
  Home,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  LayoutGrid,
  HelpCircle,
  Check,
  ArrowRight,
  ArrowLeft,
  Save,
  Upload,
  X,
  Camera,
  ImageIcon,
  Lightbulb,
  Phone,
  Mail,
  MessageSquare,
  CalendarIcon,
  Shield,
  Eye,
  EyeOff,
  User,
} from "lucide-react";
import { format } from "date-fns";
import imageCompression from "browser-image-compression";

const contactTimeOptions = [
  { id: "weekday-morning", label: "Weekday mornings (8am-12pm)" },
  { id: "weekday-afternoon", label: "Weekday afternoons (12pm-5pm)" },
  { id: "weekday-evening", label: "Weekday evenings (5pm-8pm)" },
  { id: "weekend-morning", label: "Weekend mornings" },
  { id: "weekend-afternoon", label: "Weekend afternoons" },
  { id: "anytime", label: "Anytime" },
];

const contactMethodOptions = [
  { id: "phone", label: "Phone Call", icon: Phone },
  { id: "text", label: "Text Message", icon: MessageSquare },
  { id: "email", label: "Email", icon: Mail },
  { id: "any", label: "Any method is fine", icon: Check },
];

const steps = [
  { id: 1, name: "Service Type" },
  { id: 2, name: "Project Details" },
  { id: 3, name: "Images & Description" },
  { id: 4, name: "Contact & Schedule" },
  { id: 5, name: "Review & Submit" },
];

const services = [
  {
    id: "kitchen",
    name: "Kitchen Remodeling",
    description: "Complete kitchen renovations and upgrades",
    icon: ChefHat,
  },
  {
    id: "bathroom",
    name: "Bathroom Renovation",
    description: "Bathroom design and installation",
    icon: Bath,
  },
  {
    id: "roofing",
    name: "Roofing Services",
    description: "Repairs, replacement, and maintenance",
    icon: Home,
  },
  {
    id: "electrical",
    name: "Electrical Work",
    description: "Wiring, outlets, and electrical systems",
    icon: Zap,
  },
  {
    id: "plumbing",
    name: "Plumbing Services",
    description: "Pipes, fixtures, and water systems",
    icon: Wrench,
  },
  {
    id: "repairs",
    name: "General Repairs",
    description: "Handyman and maintenance services",
    icon: Hammer,
  },
  {
    id: "painting",
    name: "Painting",
    description: "Interior and exterior painting",
    icon: Paintbrush,
  },
  {
    id: "flooring",
    name: "Flooring",
    description: "Installation and refinishing",
    icon: LayoutGrid,
  },
  {
    id: "other",
    name: "Other / Not Sure",
    description: "Describe your project to us",
    icon: HelpCircle,
  },
];

const urgencyOptions = [
  { id: "emergency", label: "Emergency", description: "24-48 hours" },
  { id: "urgent", label: "Urgent", description: "Within a week" },
  { id: "normal", label: "Normal", description: "Flexible timing" },
  { id: "planning", label: "Planning", description: "Just getting estimates" },
];

// Project scope options by service type
const scopeOptionsByService: Record<string, string[]> = {
  kitchen: ["Cabinets", "Countertops", "Appliances", "Flooring", "Lighting", "Plumbing", "Complete Remodel", "Other"],
  bathroom: ["Shower/Tub", "Vanity", "Toilet", "Flooring", "Lighting", "Plumbing", "Complete Remodel", "Other"],
  roofing: ["Inspection", "Repair", "Partial Replacement", "Full Replacement", "Gutter Work", "Ventilation", "Other"],
  electrical: ["Outlets/Switches", "Lighting", "Panel Upgrade", "Wiring", "EV Charger", "Smart Home", "Other"],
  plumbing: ["Leak Repair", "Fixture Install", "Water Heater", "Pipe Work", "Drain Cleaning", "Sump Pump", "Other"],
  repairs: ["Drywall", "Doors/Windows", "Deck/Patio", "Siding", "Foundation", "General Maintenance", "Other"],
  painting: ["Interior Walls", "Exterior Walls", "Trim/Doors", "Cabinets", "Deck/Fence", "Full Interior", "Full Exterior", "Other"],
  flooring: ["Hardwood", "Laminate", "Tile", "Carpet", "Vinyl/LVP", "Refinishing", "Repair", "Other"],
  other: ["Consultation", "Inspection", "Custom Project", "Other"],
};

const projectSizeOptions = [
  { id: "small", label: "Small", description: "Under $5,000" },
  { id: "medium", label: "Medium", description: "$5,000 - $20,000" },
  { id: "large", label: "Large", description: "$20,000 - $50,000" },
  { id: "major", label: "Major", description: "$50,000+" },
  { id: "unsure", label: "Not sure", description: "Need estimate" },
];

const propertyTypes = [
  "Single Family Home",
  "Townhouse",
  "Condo/Apartment",
  "Multi-family",
  "Commercial",
];

const timelineOptions = [
  { id: "asap", label: "ASAP" },
  { id: "2weeks", label: "Within 2 weeks" },
  { id: "1month", label: "Within a month" },
  { id: "3months", label: "Within 3 months" },
  { id: "planning", label: "Just planning" },
];

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "complete" | "error";
  caption?: string;
}

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif", "image/webp"];

const RequestQuote = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // Step 1 state
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string>("normal");
  
  // Step 2 state
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [projectSize, setProjectSize] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [address, setAddress] = useState({
    street: "",
    city: "Seattle",
    state: "WA",
    zip: "",
  });
  const [timeline, setTimeline] = useState<string>("");
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  // Step 3 state
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [step3Errors, setStep3Errors] = useState<Record<string, string>>({});

  // Step 4 state
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [preferredContactMethod, setPreferredContactMethod] = useState("any");
  const [contactTimes, setContactTimes] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [step4Errors, setStep4Errors] = useState<Record<string, string>>({});

  // Check if user is logged in (simulated)
  const isLoggedIn = localStorage.getItem("rhinoUser") !== null;

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedStep1 = localStorage.getItem("quoteStep1");
    if (savedStep1) {
      const data = JSON.parse(savedStep1);
      setSelectedService(data.service);
      setSelectedUrgency(data.urgency);
    }
    
    const savedStep2 = localStorage.getItem("quoteStep2");
    if (savedStep2) {
      const data = JSON.parse(savedStep2);
      setSelectedScopes(data.scopes || []);
      setProjectSize(data.projectSize || "");
      setPropertyType(data.propertyType || "");
      setAddress(data.address || { street: "", city: "Seattle", state: "WA", zip: "" });
      setTimeline(data.timeline || "");
    }

    const savedStep3 = localStorage.getItem("quoteStep3");
    if (savedStep3) {
      const data = JSON.parse(savedStep3);
      setProjectDescription(data.projectDescription || "");
      setSpecialRequirements(data.specialRequirements || "");
      // Note: Images can't be restored from localStorage (would need IndexedDB)
    }

    const savedStep4 = localStorage.getItem("quoteStep4");
    if (savedStep4) {
      const data = JSON.parse(savedStep4);
      setContactInfo(data.contactInfo || { firstName: "", lastName: "", email: "", phone: "" });
      setPreferredContactMethod(data.preferredContactMethod || "any");
      setContactTimes(data.contactTimes || []);
      setMarketingOptIn(data.marketingOptIn || false);
    }

    // If logged in, pre-fill contact info
    const userData = localStorage.getItem("rhinoUser");
    if (userData) {
      const user = JSON.parse(userData);
      setContactInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, []);

  const progressValue = (currentStep / steps.length) * 100;

  const handleStep1Continue = () => {
    if (selectedService) {
      localStorage.setItem(
        "quoteStep1",
        JSON.stringify({
          service: selectedService,
          urgency: selectedUrgency,
        })
      );
      setCurrentStep(2);
    }
  };

  const handleScopeToggle = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope)
        ? prev.filter((s) => s !== scope)
        : [...prev, scope]
    );
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    
    if (selectedScopes.length === 0) {
      errors.scopes = "Please select at least one scope item";
    }
    if (!projectSize) {
      errors.projectSize = "Please select a project size";
    }
    if (!propertyType) {
      errors.propertyType = "Please select a property type";
    }
    if (!address.street.trim()) {
      errors.street = "Street address is required";
    }
    if (!address.zip.trim()) {
      errors.zip = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(address.zip)) {
      errors.zip = "Please enter a valid ZIP code";
    }
    if (!timeline) {
      errors.timeline = "Please select a timeline";
    }

    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep2Continue = () => {
    if (validateStep2()) {
      localStorage.setItem(
        "quoteStep2",
        JSON.stringify({
          scopes: selectedScopes,
          projectSize,
          propertyType,
          address,
          timeline,
        })
      );
      setCurrentStep(3);
    }
  };

  const handleSaveDraft = () => {
    if (currentStep === 2) {
      localStorage.setItem(
        "quoteStep2",
        JSON.stringify({
          scopes: selectedScopes,
          projectSize,
          propertyType,
          address,
          timeline,
        })
      );
    } else if (currentStep === 3) {
      localStorage.setItem(
        "quoteStep3",
        JSON.stringify({
          projectDescription,
          specialRequirements,
          imageCount: uploadedImages.length,
        })
      );
    }
    alert("Draft saved!");
  };

  // Image upload handlers
  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Image compression failed:", error);
      return file;
    }
  };

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const remainingSlots = MAX_IMAGES - uploadedImages.length;
    
    if (fileArray.length > remainingSlots) {
      setStep3Errors({ images: `You can only upload ${remainingSlots} more image(s)` });
      return;
    }

    for (const file of fileArray) {
      // Validate file type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setStep3Errors({ images: `${file.name} is not a supported format` });
        continue;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setStep3Errors({ images: `${file.name} exceeds 10MB limit` });
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const preview = URL.createObjectURL(file);
      
      // Add to state with uploading status
      const newImage: UploadedImage = {
        id,
        file,
        preview,
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading",
      };

      setUploadedImages((prev) => [...prev, newImage]);

      // Compress the image
      try {
        const compressedFile = await compressImage(file);
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 20) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setUploadedImages((prev) =>
            prev.map((img) =>
              img.id === id ? { ...img, progress: i } : img
            )
          );
        }

        // Mark as complete
        setUploadedImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, file: compressedFile, size: compressedFile.size, progress: 100, status: "complete" }
              : img
          )
        );
      } catch (error) {
        setUploadedImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, status: "error" } : img
          )
        );
      }
    }

    setStep3Errors({});
  }, [uploadedImages.length]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFiles(event.target.files);
    }
    // Reset input
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
    
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const updateCaption = (id: string, caption: string) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, caption } : img
      )
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    
    if (projectDescription.trim().length < 50) {
      errors.description = "Please provide at least 50 characters describing your project";
    }

    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep3Continue = () => {
    if (validateStep3()) {
      localStorage.setItem(
        "quoteStep3",
        JSON.stringify({
          projectDescription,
          specialRequirements,
          imageCount: uploadedImages.length,
        })
      );
      setCurrentStep(4);
    }
  };

  // Phone number formatting
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setContactInfo({ ...contactInfo, phone: formatted });
  };

  const handleContactTimeToggle = (timeId: string) => {
    setContactTimes((prev) =>
      prev.includes(timeId)
        ? prev.filter((t) => t !== timeId)
        : [...prev, timeId]
    );
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    
    if (!contactInfo.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!contactInfo.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!contactInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!contactInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (contactInfo.phone.replace(/\D/g, "").length !== 10) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (contactTimes.length === 0) {
      errors.contactTimes = "Please select at least one preferred contact time";
    }

    if (createAccount) {
      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = "Password must include a number and special character";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (!acceptTerms) {
        errors.terms = "You must accept the terms and conditions";
      }
    }

    setStep4Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep4Continue = () => {
    if (validateStep4()) {
      localStorage.setItem(
        "quoteStep4",
        JSON.stringify({
          contactInfo,
          preferredContactMethod,
          contactTimes,
          preferredDate: preferredDate?.toISOString(),
          marketingOptIn,
          createAccount,
        })
      );
      console.log("Proceeding to step 5");
      // setCurrentStep(5); // Will be implemented
    }
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-destructive" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-orange-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-yellow-500" };
    return { score: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  const currentScopeOptions = selectedService
    ? scopeOptionsByService[selectedService] || scopeOptionsByService.other
    : [];

  const isMobile = typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">Rhino Construction</span>
          </Link>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          {/* Progress Bar */}
          <div className="mb-4">
            <Progress value={progressValue} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-2",
                  step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                    step.id === currentStep
                      ? "bg-primary text-primary-foreground border-primary"
                      : step.id < currentStep
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-muted-foreground/30"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium hidden sm:block">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <>
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                What service do you need?
              </h1>
              <p className="text-lg text-muted-foreground">
                Select the type of work you're looking for
              </p>
            </div>

            {/* Service Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedService === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "relative p-6 rounded-xl border-2 text-left transition-all duration-200",
                      "hover:shadow-lg hover:border-primary/50 hover:-translate-y-1",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-background"
                    )}
                  >
                    {/* Selected Checkmark */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Urgency Selector */}
            <div className="max-w-2xl mx-auto mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
                How soon do you need this service?
              </h2>

              <RadioGroup
                value={selectedUrgency}
                onValueChange={setSelectedUrgency}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                {urgencyOptions.map((option) => (
                  <div key={option.id}>
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.id}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                        "hover:border-primary/50 hover:bg-muted/50",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
                        selectedUrgency === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background"
                      )}
                    >
                      <span className="font-medium text-foreground">
                        {option.label}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {option.description}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Button
                variant="outline"
                asChild
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>

              <Button
                onClick={handleStep1Continue}
                disabled={!selectedService}
                className="w-full sm:w-auto order-1 sm:order-2"
                size="lg"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Help Text */}
            {!selectedService && (
              <p className="text-center text-sm text-muted-foreground mt-6">
                Please select a service to continue
              </p>
            )}
          </>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <>
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Tell us about your project
              </h1>
              <p className="text-lg text-muted-foreground">
                The more details you provide, the more accurate your quote
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Project Scope */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">
                    What work needs to be done? <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select all that apply
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currentScopeOptions.map((scope) => (
                    <div key={scope} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleScopeToggle(scope)}
                        className={cn(
                          "w-full p-3 rounded-lg border-2 text-left transition-all",
                          "hover:border-primary/50",
                          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                          selectedScopes.includes(scope)
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedScopes.includes(scope)}
                            className="pointer-events-none"
                          />
                          <span className="text-sm font-medium text-foreground">
                            {scope}
                          </span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                {step2Errors.scopes && (
                  <p className="text-sm text-destructive">{step2Errors.scopes}</p>
                )}
              </div>

              {/* Project Size */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Approximate project size <span className="text-destructive">*</span>
                </Label>

                <RadioGroup
                  value={projectSize}
                  onValueChange={setProjectSize}
                  className="grid grid-cols-2 md:grid-cols-5 gap-3"
                >
                  {projectSizeOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem
                        value={option.id}
                        id={`size-${option.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${option.id}`}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all text-center",
                          "hover:border-primary/50 hover:bg-muted/50",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
                          projectSize === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background"
                        )}
                      >
                        <span className="font-medium text-foreground">
                          {option.label}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {option.description}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {step2Errors.projectSize && (
                  <p className="text-sm text-destructive">{step2Errors.projectSize}</p>
                )}
              </div>

              {/* Property Type */}
              <div className="space-y-4">
                <Label htmlFor="propertyType" className="text-base font-semibold">
                  Property type <span className="text-destructive">*</span>
                </Label>

                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger
                    id="propertyType"
                    className={cn(
                      "w-full md:w-1/2",
                      step2Errors.propertyType && "border-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {step2Errors.propertyType && (
                  <p className="text-sm text-destructive">{step2Errors.propertyType}</p>
                )}
              </div>

              {/* Property Location */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">
                    Property address <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    We serve areas within 40 miles of Seattle
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street" className="text-sm">
                      Street address
                    </Label>
                    <Input
                      id="street"
                      placeholder="123 Main Street"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className={cn(
                        "mt-1",
                        step2Errors.street && "border-destructive"
                      )}
                    />
                    {step2Errors.street && (
                      <p className="text-sm text-destructive mt-1">{step2Errors.street}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state" className="text-sm">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="zip" className="text-sm">
                        ZIP code
                      </Label>
                      <Input
                        id="zip"
                        placeholder="98101"
                        value={address.zip}
                        onChange={(e) =>
                          setAddress({ ...address, zip: e.target.value })
                        }
                        className={cn(
                          "mt-1",
                          step2Errors.zip && "border-destructive"
                        )}
                      />
                      {step2Errors.zip && (
                        <p className="text-sm text-destructive mt-1">{step2Errors.zip}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  When do you want to start? <span className="text-destructive">*</span>
                </Label>

                <RadioGroup
                  value={timeline}
                  onValueChange={setTimeline}
                  className="grid grid-cols-2 md:grid-cols-5 gap-3"
                >
                  {timelineOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem
                        value={option.id}
                        id={`timeline-${option.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`timeline-${option.id}`}
                        className={cn(
                          "flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all text-center",
                          "hover:border-primary/50 hover:bg-muted/50",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
                          timeline === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background"
                        )}
                      >
                        <span className="font-medium text-foreground text-sm">
                          {option.label}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {step2Errors.timeline && (
                  <p className="text-sm text-destructive">{step2Errors.timeline}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
                <Button
                  variant="ghost"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto order-3 sm:order-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto order-1 sm:order-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    onClick={handleStep2Continue}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Images & Description */}
        {currentStep === 3 && (
          <>
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Show us what you're working with
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload photos to help us provide an accurate estimate
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Upload Area */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Drag & Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 text-center transition-all",
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                      uploadedImages.length >= MAX_IMAGES && "opacity-50 pointer-events-none"
                    )}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.heic,.heif,.webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="text-lg font-medium text-foreground">
                          Drag & drop photos here
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          or click to browse
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadedImages.length >= MAX_IMAGES}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>

                        {isMobile && (
                          <Button
                            variant="outline"
                            onClick={() => cameraInputRef.current?.click()}
                            disabled={uploadedImages.length >= MAX_IMAGES}
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Take Photo
                          </Button>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        JPG, PNG, HEIC (Max 10MB per image) • Up to {MAX_IMAGES} images
                      </p>
                    </div>
                  </div>

                  {step3Errors.images && (
                    <p className="text-sm text-destructive">{step3Errors.images}</p>
                  )}

                  {/* Image Preview Grid */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">
                          Uploaded Images ({uploadedImages.length}/{MAX_IMAGES})
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image) => (
                          <div
                            key={image.id}
                            className="relative group rounded-lg overflow-hidden border bg-background"
                          >
                            <div className="aspect-square relative">
                              <img
                                src={image.preview}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />

                              {/* Upload Progress Overlay */}
                              {image.status === "uploading" && (
                                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                  <div className="text-center">
                                    <Progress value={image.progress} className="w-16 h-2 mb-2" />
                                    <p className="text-xs text-muted-foreground">{image.progress}%</p>
                                  </div>
                                </div>
                              )}

                              {/* Error Overlay */}
                              {image.status === "error" && (
                                <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                                  <p className="text-xs text-destructive font-medium">Failed</p>
                                </div>
                              )}

                              {/* Remove Button */}
                              <button
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 w-6 h-6 bg-background/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="p-2">
                              <p className="text-xs font-medium text-foreground truncate">
                                {image.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(image.size)}
                              </p>
                              <Input
                                placeholder="Add caption..."
                                value={image.caption || ""}
                                onChange={(e) => updateCaption(image.id, e.target.value)}
                                className="mt-2 h-7 text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Description */}
                  <div className="space-y-4 pt-6">
                    <div>
                      <Label htmlFor="description" className="text-base font-semibold">
                        Describe your project <span className="text-destructive">*</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Minimum 50 characters recommended
                      </p>
                    </div>

                    <div className="relative">
                      <Textarea
                        id="description"
                        placeholder="Tell us more about what you want to accomplish, any specific requirements, concerns, or questions you have..."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className={cn(
                          "min-h-[150px] resize-y",
                          step3Errors.description && "border-destructive"
                        )}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                        {projectDescription.length} characters
                      </div>
                    </div>

                    {step3Errors.description && (
                      <p className="text-sm text-destructive">{step3Errors.description}</p>
                    )}
                  </div>

                  {/* Special Requirements */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="requirements" className="text-base font-semibold">
                        Any special requirements or concerns?
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Access restrictions, HOA requirements, special materials, etc.
                      </p>
                    </div>

                    <Textarea
                      id="requirements"
                      placeholder="Optional: Let us know about any special considerations..."
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      className="min-h-[100px] resize-y"
                    />
                  </div>
                </div>

                {/* Photo Tips Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-muted/50 rounded-xl p-6 sticky top-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        Photo Tips for Better Estimates
                      </h3>
                    </div>

                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">📸</span>
                        Take photos from multiple angles
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">🏠</span>
                        Show the entire area/room
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">🔍</span>
                        Include close-ups of problem areas
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">⚠️</span>
                        Capture any damage or wear
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">📏</span>
                        Include measurements if possible
                      </li>
                    </ul>

                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        <strong>Pro tip:</strong> The more photos you provide, the more accurate your estimate will be!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t">
                <Button
                  variant="ghost"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto order-3 sm:order-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto order-1 sm:order-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    onClick={handleStep3Continue}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 4: Contact & Schedule */}
        {currentStep === 4 && (
          <>
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                How can we reach you?
              </h1>
              <p className="text-lg text-muted-foreground">
                We'll contact you to discuss your project and schedule an estimate
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Logged-in User Notice */}
              {isLoggedIn && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">
                      Using information from your account
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={contactInfo.firstName}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, firstName: e.target.value })
                      }
                      className={cn(step4Errors.firstName && "border-destructive")}
                    />
                    {step4Errors.firstName && (
                      <p className="text-sm text-destructive">{step4Errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={contactInfo.lastName}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, lastName: e.target.value })
                      }
                      className={cn(step4Errors.lastName && "border-destructive")}
                    />
                    {step4Errors.lastName && (
                      <p className="text-sm text-destructive">{step4Errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                    className={cn(step4Errors.email && "border-destructive")}
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll receive quote confirmation here
                  </p>
                  {step4Errors.email && (
                    <p className="text-sm text-destructive">{step4Errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={contactInfo.phone}
                    onChange={handlePhoneChange}
                    className={cn(step4Errors.phone && "border-destructive")}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll call to discuss your project
                  </p>
                  {step4Errors.phone && (
                    <p className="text-sm text-destructive">{step4Errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Preferred Contact Method
                </Label>

                <RadioGroup
                  value={preferredContactMethod}
                  onValueChange={setPreferredContactMethod}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {contactMethodOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div key={option.id}>
                        <RadioGroupItem
                          value={option.id}
                          id={`contact-${option.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`contact-${option.id}`}
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all text-center",
                            "hover:border-primary/50 hover:bg-muted/50",
                            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
                            preferredContactMethod === option.id
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background"
                          )}
                        >
                          <Icon className="w-5 h-5 mb-2 text-muted-foreground" />
                          <span className="font-medium text-foreground text-sm">
                            {option.label}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Best Time to Contact */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">
                    Best time to contact you <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select all that apply
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {contactTimeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleContactTimeToggle(option.id)}
                      className={cn(
                        "p-3 rounded-lg border-2 text-left transition-all",
                        "hover:border-primary/50",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        contactTimes.includes(option.id)
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={contactTimes.includes(option.id)}
                          className="pointer-events-none"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {step4Errors.contactTimes && (
                  <p className="text-sm text-destructive">{step4Errors.contactTimes}</p>
                )}
              </div>

              {/* Preferred Appointment Date */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">
                    Preferred appointment date (optional)
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Do you have a preferred date for site visit? We'll confirm availability.
                  </p>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full md:w-[300px] justify-start text-left font-normal",
                        !preferredDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {preferredDate ? format(preferredDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={preferredDate}
                      onSelect={setPreferredDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Account Creation (for non-logged-in users) */}
              {!isLoggedIn && (
                <div className="space-y-4 pt-6 border-t">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="createAccount"
                      checked={createAccount}
                      onCheckedChange={(checked) => setCreateAccount(checked === true)}
                    />
                    <div>
                      <Label htmlFor="createAccount" className="text-base font-semibold cursor-pointer">
                        Create an account to track this quote
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Track your quotes, save project info, and manage appointments
                      </p>
                    </div>
                  </div>

                  {createAccount && (
                    <div className="space-y-4 pl-7 animate-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">
                          Password <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cn(
                              "pr-10",
                              step4Errors.password && "border-destructive"
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Password Strength */}
                        {password && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={cn("h-full transition-all", passwordStrength.color)}
                                  style={{ width: `${passwordStrength.score}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground w-16">
                                {passwordStrength.label}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Min 8 characters, include a number and special character
                            </p>
                          </div>
                        )}

                        {step4Errors.password && (
                          <p className="text-sm text-destructive">{step4Errors.password}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={cn(step4Errors.confirmPassword && "border-destructive")}
                        />
                        {step4Errors.confirmPassword && (
                          <p className="text-sm text-destructive">{step4Errors.confirmPassword}</p>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="acceptTerms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      {step4Errors.terms && (
                        <p className="text-sm text-destructive pl-7">{step4Errors.terms}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Marketing Preferences */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="marketingOptIn"
                    checked={marketingOptIn}
                    onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
                  />
                  <div>
                    <Label htmlFor="marketingOptIn" className="cursor-pointer">
                      I'd like to receive occasional tips and special offers
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Note */}
              <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Your information is secure and will only be used to process your quote request.{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    View our Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
                <Button
                  variant="ghost"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto order-3 sm:order-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto order-1 sm:order-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(3)}
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    onClick={handleStep4Continue}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    Continue to Review
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestQuote;
