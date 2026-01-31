import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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

const RequestQuote = () => {
  const navigate = useNavigate();
  const [currentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string>("normal");

  const progressValue = (currentStep / steps.length) * 100;

  const handleContinue = () => {
    if (selectedService) {
      // Store in localStorage for now
      localStorage.setItem(
        "quoteStep1",
        JSON.stringify({
          service: selectedService,
          urgency: selectedUrgency,
        })
      );
      // Navigate to step 2 (to be implemented)
      console.log("Proceeding to step 2 with:", { selectedService, selectedUrgency });
    }
  };

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
            onClick={handleContinue}
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
      </div>
    </div>
  );
};

export default RequestQuote;
