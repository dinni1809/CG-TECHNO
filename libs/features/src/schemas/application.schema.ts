import { z } from 'zod';

export const AVAILABLE_ROLES = [
  'IT Support Engineer',
  'Network Administrator',
  'Sales Executive',
  'Business Development Manager',
  'Intern - IT',
  'Intern - Sales & Marketing',
  'Other',
] as const;

export const ApplicationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
    .trim(),
  role: z.enum(AVAILABLE_ROLES, {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  message: z
    .string()
    .max(1000, 'Cover note must not exceed 1000 characters')
    .trim()
    .optional(),
});

export type ApplicationPayload = z.infer<typeof ApplicationSchema>;
