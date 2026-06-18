import { z } from 'zod';

export const SERVICE_OPTIONS = [
  'IT Infrastructure',
  'Server Solutions',
  'CCTV Installation',
  'Network Cabling',
  'Laptop Rental',
  'Microsoft Licensing',
  'Annual Maintenance Contract',
  'Enterprise Networking',
  'Cloud Solutions',
  'Other',
] as const;

export const ContactSchema = z.object({
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
  company: z.string().max(100, 'Company name must not exceed 100 characters').optional().or(z.literal('')),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: 'Please select a service from the options' }),
  }),
  subject: z.string().max(150, 'Subject must not exceed 150 characters').optional().or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
  product: z.string().max(100).optional(),
});

export type ContactPayload = z.infer<typeof ContactSchema>;
