import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// Format phone number as user types
const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

// Password strength checker
const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  
  const strength = Object.values(checks).filter(Boolean).length;
  
  return { checks, strength };
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const password = form.watch("password");
  const passwordStrength = useMemo(() => checkPasswordStrength(password || ""), [password]);

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store in localStorage temporarily (excluding password)
    localStorage.setItem("signUpData", JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    }));
    
    toast({
      title: "Account created successfully!",
      description: "Welcome to Rhino Construction. You can now sign in.",
    });
    
    setIsLoading(false);
    
    // Redirect to sign in after success
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 2000);
  };

  const handleGoogleSignUp = () => {
    toast({
      title: "Google Sign Up",
      description: "Google authentication will be configured with backend integration.",
    });
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-destructive";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-black text-2xl">R</span>
            </div>
            <div>
              <span className="font-bold text-xl text-foreground">RHINO</span>
              <span className="font-medium text-xl text-muted-foreground ml-1">CONSTRUCTION</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Rhino Construction today</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="John"
                            className="pl-9 h-11"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="pl-9 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="(206) 555-1234"
                          className="pl-9 h-11"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          maxLength={14}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pl-9 pr-10 h-11"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    
                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn("h-full transition-all duration-300", getStrengthColor(passwordStrength.strength))}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            />
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            passwordStrength.strength <= 2 ? "text-destructive" :
                            passwordStrength.strength <= 3 ? "text-secondary" :
                            passwordStrength.strength <= 4 ? "text-primary" : "text-green-600"
                          )}>
                            {getStrengthLabel(passwordStrength.strength)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {[
                            { key: "length", label: "8+ characters" },
                            { key: "uppercase", label: "Uppercase" },
                            { key: "lowercase", label: "Lowercase" },
                            { key: "number", label: "Number" },
                            { key: "special", label: "Special char" },
                          ].map((req) => (
                            <div
                              key={req.key}
                              className={cn(
                                "flex items-center gap-1",
                                passwordStrength.checks[req.key as keyof typeof passwordStrength.checks]
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              )}
                            >
                              {passwordStrength.checks[req.key as keyof typeof passwordStrength.checks] ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                              {req.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-9 pr-10 h-11"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms Checkbox */}
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        I agree to the{" "}
                        <a href="/terms" className="text-secondary hover:text-rhino-orange-dark underline">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-secondary hover:text-rhino-orange-dark underline">
                          Privacy Policy
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-12 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-3 text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full h-12"
            onClick={handleGoogleSignUp}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/sign-in" className="text-secondary font-medium hover:text-rhino-orange-dark transition-colors">
              Sign In
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center text-muted-foreground mt-6">
          <a href="/" className="hover:text-secondary transition-colors">
            ← Back to Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
