import { describe, it, expect } from "vitest";
import {
  contactFormSchema,
  quoteStep1Schema,
  quoteStep2Schema,
  quoteStep3Schema,
  quoteStep4Schema,
  signInSchema,
  signUpSchema,
  formatPhoneNumber,
  validateField,
} from "@/lib/validations";
import { z } from "zod";

// ============================================
// CONTACT FORM SCHEMA
// ============================================
describe("contactFormSchema", () => {
  const validContact = {
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "(206) 487-9677",
    message: "I need help with my kitchen remodeling project.",
  };

  it("accepts valid contact data", () => {
    const result = contactFormSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  // First name
  it("rejects first name shorter than 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContact, firstName: "J" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("First name must be at least 2 characters");
    }
  });

  it("rejects first name longer than 50 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContact, firstName: "A".repeat(51) });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from first name", () => {
    const result = contactFormSchema.safeParse({ ...validContact, firstName: "  John  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe("John");
    }
  });

  it("rejects empty first name", () => {
    const result = contactFormSchema.safeParse({ ...validContact, firstName: "" });
    expect(result.success).toBe(false);
  });

  // Last name
  it("rejects last name shorter than 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContact, lastName: "S" });
    expect(result.success).toBe(false);
  });

  it("rejects last name longer than 50 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContact, lastName: "B".repeat(51) });
    expect(result.success).toBe(false);
  });

  // Email
  it("rejects invalid email format", () => {
    const result = contactFormSchema.safeParse({ ...validContact, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Please enter a valid email address");
    }
  });

  it("rejects email longer than 255 characters", () => {
    const longEmail = "a".repeat(250) + "@b.com";
    const result = contactFormSchema.safeParse({ ...validContact, email: longEmail });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from email", () => {
    const result = contactFormSchema.safeParse({ ...validContact, email: "  john@example.com  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("john@example.com");
    }
  });

  // Phone
  it("accepts common phone formats", () => {
    const goodPhones = ["2064879677", "206-487-9677", "206.487.9677", "(206)487-9677", "(206) 487 9677", "(206) 487-9677"];
    for (const phone of goodPhones) {
      const result = contactFormSchema.safeParse({ ...validContact, phone });
      expect(result.success).toBe(true);
    }
  });

  it("rejects phone with wrong digit count", () => {
    const badPhones = ["12345", "123456789", "12345678901234"];
    for (const phone of badPhones) {
      const result = contactFormSchema.safeParse({ ...validContact, phone });
      expect(result.success).toBe(false);
    }
  });

  it("accepts properly formatted phone", () => {
    const result = contactFormSchema.safeParse({ ...validContact, phone: "(555) 123-4567" });
    expect(result.success).toBe(true);
  });

  // Message
  it("rejects message shorter than 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContact, message: "Hi" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Message must be at least 10 characters");
    }
  });

  it("rejects message longer than 1000 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContact, message: "A".repeat(1001) });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from message", () => {
    const result = contactFormSchema.safeParse({ ...validContact, message: "   Hello, I need help with my project.   " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe("Hello, I need help with my project.");
    }
  });

  // Missing fields
  it("rejects when required fields are missing", () => {
    const result = contactFormSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.length).toBeGreaterThanOrEqual(5);
    }
  });
});

// ============================================
// QUOTE STEP 1 — Service Selection
// ============================================
describe("quoteStep1Schema", () => {
  it("accepts valid step 1 data", () => {
    const result = quoteStep1Schema.safeParse({ service: "kitchen", urgency: "normal" });
    expect(result.success).toBe(true);
  });

  it("rejects empty service", () => {
    const result = quoteStep1Schema.safeParse({ service: "", urgency: "normal" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Please select a service");
    }
  });

  it("accepts all valid urgency levels", () => {
    const urgencies = ["emergency", "urgent", "normal", "planning"] as const;
    for (const urgency of urgencies) {
      const result = quoteStep1Schema.safeParse({ service: "kitchen", urgency });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid urgency level", () => {
    const result = quoteStep1Schema.safeParse({ service: "kitchen", urgency: "whenever" });
    expect(result.success).toBe(false);
  });

  it("rejects missing urgency", () => {
    const result = quoteStep1Schema.safeParse({ service: "kitchen" });
    expect(result.success).toBe(false);
  });
});

// ============================================
// QUOTE STEP 2 — Project Details
// ============================================
describe("quoteStep2Schema", () => {
  const validStep2 = {
    scopes: ["cabinets", "countertops"],
    projectSize: "medium" as const,
    propertyType: "single-family",
    address: {
      street: "4527 S 256th Pl",
      city: "Kent",
      state: "WA",
      zip: "98032",
    },
    timeline: "1month" as const,
  };

  it("accepts valid step 2 data", () => {
    const result = quoteStep2Schema.safeParse(validStep2);
    expect(result.success).toBe(true);
  });

  // Scopes
  it("rejects empty scopes array", () => {
    const result = quoteStep2Schema.safeParse({ ...validStep2, scopes: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Please select at least one scope item");
    }
  });

  it("accepts a single scope item", () => {
    const result = quoteStep2Schema.safeParse({ ...validStep2, scopes: ["painting"] });
    expect(result.success).toBe(true);
  });

  // Project size
  it("accepts all valid project sizes", () => {
    const sizes = ["small", "medium", "large", "major", "unsure"] as const;
    for (const projectSize of sizes) {
      const result = quoteStep2Schema.safeParse({ ...validStep2, projectSize });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid project size", () => {
    const result = quoteStep2Schema.safeParse({ ...validStep2, projectSize: "tiny" });
    expect(result.success).toBe(false);
  });

  // Property type
  it("rejects empty property type", () => {
    const result = quoteStep2Schema.safeParse({ ...validStep2, propertyType: "" });
    expect(result.success).toBe(false);
  });

  // Address
  it("rejects street address shorter than 5 characters", () => {
    const result = quoteStep2Schema.safeParse({
      ...validStep2,
      address: { ...validStep2.address, street: "123" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects city shorter than 2 characters", () => {
    const result = quoteStep2Schema.safeParse({
      ...validStep2,
      address: { ...validStep2.address, city: "K" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects state not exactly 2 characters", () => {
    const result = quoteStep2Schema.safeParse({
      ...validStep2,
      address: { ...validStep2.address, state: "Washington" },
    });
    expect(result.success).toBe(false);
  });

  it("accepts 2-letter state code", () => {
    const result = quoteStep2Schema.safeParse({
      ...validStep2,
      address: { ...validStep2.address, state: "CA" },
    });
    expect(result.success).toBe(true);
  });

  // ZIP code
  it("accepts 5-digit ZIP code", () => {
    const result = quoteStep2Schema.safeParse({
      ...validStep2,
      address: { ...validStep2.address, zip: "98032" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts ZIP+4 format", () => {
    const result = quoteStep2Schema.safeParse({
      ...validStep2,
      address: { ...validStep2.address, zip: "98032-1234" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid ZIP codes", () => {
    const badZips = ["1234", "123456", "ABCDE", "98032-12", "98032-12345"];
    for (const zip of badZips) {
      const result = quoteStep2Schema.safeParse({
        ...validStep2,
        address: { ...validStep2.address, zip },
      });
      expect(result.success).toBe(false);
    }
  });

  // Timeline
  it("accepts all valid timelines", () => {
    const timelines = ["asap", "2weeks", "1month", "3months", "planning"] as const;
    for (const timeline of timelines) {
      const result = quoteStep2Schema.safeParse({ ...validStep2, timeline });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid timeline", () => {
    const result = quoteStep2Schema.safeParse({ ...validStep2, timeline: "next-year" });
    expect(result.success).toBe(false);
  });
});

// ============================================
// QUOTE STEP 3 — Images & Description
// ============================================
describe("quoteStep3Schema", () => {
  const validStep3 = {
    projectDescription: "I want to completely renovate my kitchen with new cabinets and countertops.",
    imageCount: 3,
  };

  it("accepts valid step 3 data", () => {
    const result = quoteStep3Schema.safeParse(validStep3);
    expect(result.success).toBe(true);
  });

  it("rejects description shorter than 20 characters", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, projectDescription: "Fix the sink" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain("at least 20 characters");
    }
  });

  it("rejects description longer than 2000 characters", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, projectDescription: "A".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("accepts exactly 20 character description", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, projectDescription: "A".repeat(20) });
    expect(result.success).toBe(true);
  });

  // Image count
  it("rejects more than 10 images", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, imageCount: 11 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Maximum 10 images allowed");
    }
  });

  it("accepts 0 images", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, imageCount: 0 });
    expect(result.success).toBe(true);
  });

  it("accepts exactly 10 images", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, imageCount: 10 });
    expect(result.success).toBe(true);
  });

  it("rejects negative image count", () => {
    const result = quoteStep3Schema.safeParse({ ...validStep3, imageCount: -1 });
    expect(result.success).toBe(false);
  });

  // Special requirements (optional)
  it("accepts missing special requirements", () => {
    const result = quoteStep3Schema.safeParse(validStep3);
    expect(result.success).toBe(true);
  });

  it("accepts special requirements within limit", () => {
    const result = quoteStep3Schema.safeParse({
      ...validStep3,
      specialRequirements: "Please use eco-friendly materials",
    });
    expect(result.success).toBe(true);
  });

  it("rejects special requirements over 1000 characters", () => {
    const result = quoteStep3Schema.safeParse({
      ...validStep3,
      specialRequirements: "A".repeat(1001),
    });
    expect(result.success).toBe(false);
  });
});

// ============================================
// QUOTE STEP 4 — Contact Information
// ============================================
describe("quoteStep4Schema", () => {
  const validStep4 = {
    contactInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "(206) 487-9677",
    },
    preferredContactMethod: "phone" as const,
    contactTimes: ["morning"],
  };

  it("accepts valid step 4 data", () => {
    const result = quoteStep4Schema.safeParse(validStep4);
    expect(result.success).toBe(true);
  });

  // Contact methods
  it("accepts all valid contact methods", () => {
    const methods = ["phone", "text", "email", "any"] as const;
    for (const preferredContactMethod of methods) {
      const result = quoteStep4Schema.safeParse({ ...validStep4, preferredContactMethod });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid contact method", () => {
    const result = quoteStep4Schema.safeParse({ ...validStep4, preferredContactMethod: "carrier-pigeon" });
    expect(result.success).toBe(false);
  });

  // Contact times
  it("rejects empty contact times array", () => {
    const result = quoteStep4Schema.safeParse({ ...validStep4, contactTimes: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Please select at least one contact time");
    }
  });

  it("accepts multiple contact times", () => {
    const result = quoteStep4Schema.safeParse({
      ...validStep4,
      contactTimes: ["morning", "afternoon", "evening"],
    });
    expect(result.success).toBe(true);
  });

  // Preferred date (optional)
  it("accepts missing preferred date", () => {
    const result = quoteStep4Schema.safeParse(validStep4);
    expect(result.success).toBe(true);
  });

  it("accepts a valid date", () => {
    const result = quoteStep4Schema.safeParse({
      ...validStep4,
      preferredDate: new Date("2026-03-15"),
    });
    expect(result.success).toBe(true);
  });

  // Marketing opt-in (optional)
  it("accepts missing marketing opt-in", () => {
    const result = quoteStep4Schema.safeParse(validStep4);
    expect(result.success).toBe(true);
  });

  it("accepts boolean marketing opt-in", () => {
    const result = quoteStep4Schema.safeParse({ ...validStep4, marketingOptIn: true });
    expect(result.success).toBe(true);
  });

  // Nested contact info validation
  it("rejects invalid email in contact info", () => {
    const result = quoteStep4Schema.safeParse({
      ...validStep4,
      contactInfo: { ...validStep4.contactInfo, email: "bad-email" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone in contact info", () => {
    const result = quoteStep4Schema.safeParse({
      ...validStep4,
      contactInfo: { ...validStep4.contactInfo, phone: "12345" },
    });
    expect(result.success).toBe(false);
  });
});

// ============================================
// SIGN IN SCHEMA
// ============================================
describe("signInSchema", () => {
  it("accepts valid sign-in data", () => {
    const result = signInSchema.safeParse({ email: "john@example.com", password: "Password1" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = signInSchema.safeParse({ email: "not-email", password: "Password1" });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = signInSchema.safeParse({ email: "john@example.com", password: "Pass1" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Password must be at least 8 characters");
    }
  });

  it("trims email whitespace", () => {
    const result = signInSchema.safeParse({ email: "  john@example.com  ", password: "Password1" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("john@example.com");
    }
  });

  it("accepts exactly 8 character password", () => {
    const result = signInSchema.safeParse({ email: "john@example.com", password: "12345678" });
    expect(result.success).toBe(true);
  });
});

// ============================================
// SIGN UP SCHEMA
// ============================================
describe("signUpSchema", () => {
  const validSignUp = {
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "(206) 487-9677",
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
    acceptTerms: true,
  };

  it("accepts valid sign-up data", () => {
    const result = signUpSchema.safeParse(validSignUp);
    expect(result.success).toBe(true);
  });

  // Password requirements
  it("rejects password without uppercase letter", () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: "weakpass1",
      confirmPassword: "weakpass1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without lowercase letter", () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: "STRONGPASS1",
      confirmPassword: "STRONGPASS1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without number", () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: "StrongPass",
      confirmPassword: "StrongPass",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: "Pass1",
      confirmPassword: "Pass1",
    });
    expect(result.success).toBe(false);
  });

  // Password confirmation
  it("rejects mismatched passwords", () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      confirmPassword: "DifferentPass1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmError = result.error.errors.find((e) => e.path.includes("confirmPassword"));
      expect(confirmError?.message).toBe("Passwords do not match");
    }
  });

  // Terms acceptance
  it("rejects when terms not accepted", () => {
    const result = signUpSchema.safeParse({ ...validSignUp, acceptTerms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      const termsError = result.error.errors.find((e) => e.path.includes("acceptTerms"));
      expect(termsError?.message).toBe("You must accept the terms");
    }
  });

  // Phone (optional)
  it("accepts empty phone string", () => {
    const result = signUpSchema.safeParse({ ...validSignUp, phone: "" });
    expect(result.success).toBe(true);
  });

  it("accepts valid phone", () => {
    const result = signUpSchema.safeParse({ ...validSignUp, phone: "(555) 123-4567" });
    expect(result.success).toBe(true);
  });

  it("accepts various phone formats", () => {
    const result = signUpSchema.safeParse({ ...validSignUp, phone: "5551234567" });
    expect(result.success).toBe(true);
  });

  it("rejects phone with wrong digit count", () => {
    const result = signUpSchema.safeParse({ ...validSignUp, phone: "555123" });
    expect(result.success).toBe(false);
  });

  it("accepts undefined phone", () => {
    const { phone, ...withoutPhone } = validSignUp;
    const result = signUpSchema.safeParse(withoutPhone);
    expect(result.success).toBe(true);
  });
});

// ============================================
// UTILITY: formatPhoneNumber
// ============================================
describe("formatPhoneNumber", () => {
  it("returns empty string for empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
  });

  it("formats 1-3 digits with opening parenthesis", () => {
    expect(formatPhoneNumber("2")).toBe("(2");
    expect(formatPhoneNumber("20")).toBe("(20");
    expect(formatPhoneNumber("206")).toBe("(206");
  });

  it("formats 4-6 digits with area code and space", () => {
    expect(formatPhoneNumber("2064")).toBe("(206) 4");
    expect(formatPhoneNumber("20648")).toBe("(206) 48");
    expect(formatPhoneNumber("206487")).toBe("(206) 487");
  });

  it("formats 7+ digits with full phone format", () => {
    expect(formatPhoneNumber("2064879")).toBe("(206) 487-9");
    expect(formatPhoneNumber("20648796")).toBe("(206) 487-96");
    expect(formatPhoneNumber("206487967")).toBe("(206) 487-967");
    expect(formatPhoneNumber("2064879677")).toBe("(206) 487-9677");
  });

  it("strips non-digit characters before formatting", () => {
    expect(formatPhoneNumber("(206) 487-9677")).toBe("(206) 487-9677");
    expect(formatPhoneNumber("206-487-9677")).toBe("(206) 487-9677");
    expect(formatPhoneNumber("206.487.9677")).toBe("(206) 487-9677");
  });

  it("truncates at 10 digits", () => {
    expect(formatPhoneNumber("20648796771234")).toBe("(206) 487-9677");
  });

  it("handles input with letters mixed in", () => {
    expect(formatPhoneNumber("2a0b6c4d8e7f9g6h7i7")).toBe("(206) 487-9677");
  });
});

// ============================================
// UTILITY: validateField
// ============================================
describe("validateField", () => {
  const emailSchema = z.string().email("Invalid email");

  it("returns null for valid value", () => {
    expect(validateField(emailSchema, "test@example.com")).toBeNull();
  });

  it("returns error message for invalid value", () => {
    expect(validateField(emailSchema, "not-an-email")).toBe("Invalid email");
  });

  it("returns first error message when multiple errors exist", () => {
    const strictSchema = z.string().min(5, "Too short").email("Not email");
    const result = validateField(strictSchema, "ab");
    expect(result).toBe("Too short");
  });

  it("returns 'Invalid value' as fallback when error has no message", () => {
    const customSchema = z.number();
    const result = validateField(customSchema, "not-a-number");
    expect(typeof result).toBe("string");
    expect(result).not.toBeNull();
  });
});
