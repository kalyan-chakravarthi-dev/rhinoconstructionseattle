import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "lucide-react";

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

const RequestQuote = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
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
      // Navigate to step 3 (to be implemented)
      console.log("Proceeding to step 3");
    }
  };

  const handleSaveDraft = () => {
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
    // Show a toast or notification
    alert("Draft saved!");
  };

  const currentScopeOptions = selectedService
    ? scopeOptionsByService[selectedService] || scopeOptionsByService.other
    : [];

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
      </div>
    </div>
  );
};

export default RequestQuote;
