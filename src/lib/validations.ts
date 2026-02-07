// Rhino Remodeler - Centralized Validation Schemas
// Following development_rules.md standards

import { z } from 'zod';

// Phone number regex for (XXX) XXX-XXXX format
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

// ZIP code regex
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

// ============================================
// CONTACT FORM SCHEMA
// ============================================
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .regex(phoneRegex, 'Phone must be in format (XXX) XXX-XXXX'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================
// QUOTE REQUEST FORM SCHEMAS
// ============================================

// Step 1: Service Selection
export const quoteStep1Schema = z.object({
  service: z
    .string()
    .min(1, 'Please select a service'),
  urgency: z
    .enum(['emergency', 'urgent', 'normal', 'planning'], {
      required_error: 'Please select urgency level',
    }),
});

export type QuoteStep1Data = z.infer<typeof quoteStep1Schema>;

// Step 2: Project Details
export const quoteStep2Schema = z.object({
  scopes: z
    .array(z.string())
    .min(1, 'Please select at least one scope item'),
  projectSize: z
    .enum(['small', 'medium', 'large', 'major', 'unsure'], {
      required_error: 'Please select a project size',
    }),
  propertyType: z
    .string()
    .min(1, 'Please select a property type'),
  address: z.object({
    street: z
      .string()
      .trim()
      .min(5, 'Street address is required'),
    city: z
      .string()
      .trim()
      .min(2, 'City is required'),
    state: z
      .string()
      .length(2, 'State must be 2 characters'),
    zip: z
      .string()
      .regex(zipCodeRegex, 'Please enter a valid ZIP code'),
  }),
  timeline: z
    .enum(['asap', '2weeks', '1month', '3months', 'planning'], {
      required_error: 'Please select a timeline',
    }),
});

export type QuoteStep2Data = z.infer<typeof quoteStep2Schema>;

// Step 3: Images & Description
export const quoteStep3Schema = z.object({
  projectDescription: z
    .string()
    .trim()
    .min(20, 'Please provide a more detailed description (at least 20 characters)')
    .max(2000, 'Description must be less than 2000 characters'),
  specialRequirements: z
    .string()
    .max(1000, 'Special requirements must be less than 1000 characters')
    .optional(),
  imageCount: z
    .number()
    .min(0)
    .max(10, 'Maximum 10 images allowed'),
});

export type QuoteStep3Data = z.infer<typeof quoteStep3Schema>;

// Step 4: Contact Information
export const quoteStep4Schema = z.object({
  contactInfo: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters'),
    lastName: z
      .string()
      .trim()
      .min(2, 'Last name must be at least 2 characters'),
    email: z
      .string()
      .trim()
      .email('Please enter a valid email address'),
    phone: z
      .string()
      .regex(phoneRegex, 'Phone must be in format (XXX) XXX-XXXX'),
  }),
  preferredContactMethod: z
    .enum(['phone', 'text', 'email', 'any']),
  contactTimes: z
    .array(z.string())
    .min(1, 'Please select at least one contact time'),
  preferredDate: z
    .date()
    .optional(),
  marketingOptIn: z
    .boolean()
    .optional(),
});

export type QuoteStep4Data = z.infer<typeof quoteStep4Schema>;

// Complete Quote Form
export const quoteFormSchema = z.object({
  ...quoteStep1Schema.shape,
  ...quoteStep2Schema.shape,
  ...quoteStep3Schema.shape,
  ...quoteStep4Schema.shape,
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// ============================================
// AUTHENTICATION SCHEMAS
// ============================================
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

export type SignInData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Phone must be in format (XXX) XXX-XXXX')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type SignUpData = z.infer<typeof signUpSchema>;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format phone number as user types
 * @param value - Raw phone input
 * @returns Formatted phone string
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Format based on length
  if (digits.length <= 3) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Validate a single field and return error message
 * @param schema - Zod schema
 * @param value - Value to validate
 * @returns Error message or null
 */
export const validateField = <T>(
  schema: z.ZodType<T>,
  value: unknown
): string | null => {
  const result = schema.safeParse(value);
  if (result.success) return null;
  return result.error.errors[0]?.message ?? 'Invalid value';
};
