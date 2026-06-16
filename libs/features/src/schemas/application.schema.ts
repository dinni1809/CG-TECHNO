import { z } from 'zod';

export const QUALIFICATIONS = [
  'SSLC',
  'PUC',
  'Diploma',
  'B.E / B.Tech',
  'BCA',
  'MCA',
  'M.Tech',
  'MBA',
  'Other',
] as const;

export const EXPERIENCE_LEVELS = [
  'Fresher',
  '0–1 Years',
  '1–3 Years',
  '3–5 Years',
  '5+ Years',
] as const;

export const EMPLOYMENT_PREFERENCES = [
  'Full Time',
  'Part Time',
  'Internship',
  'Contract Basis',
  'Open to Any Opportunity',
] as const;

export const AVAILABILITIES = [
  'Immediately',
  'Within 15 Days',
  'Within 30 Days',
  'Within 60 Days',
] as const;

export const AREAS_OF_INTEREST = [
  'IT Infrastructure',
  'Networking',
  'CCTV & Security Systems',
  'Biometric Systems',
  'Access Control & Automation',
  'Boom Barrier Systems',
  'Software Licensing',
  'Electronics Integration',
  'Technical Support & AMC',
  'Sales & Business Development',
  'Administration',
  'Internship Opportunities',
] as const;

export const ApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
    .trim(),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters')
    .trim(),
  qualification: z.enum(QUALIFICATIONS, {
    errorMap: () => ({ message: 'Please select a highest qualification' }),
  }),
  fieldOfStudy: z
    .string()
    .min(2, 'Field of study must be at least 2 characters')
    .max(100, 'Field of study must not exceed 100 characters')
    .trim(),
  experience: z.enum(EXPERIENCE_LEVELS, {
    errorMap: () => ({ message: 'Please select your experience level' }),
  }),
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one area of interest'),
  preference: z.enum(EMPLOYMENT_PREFERENCES, {
    errorMap: () => ({ message: 'Please select an employment preference' }),
  }),
  availability: z.enum(AVAILABILITIES, {
    errorMap: () => ({ message: 'Please select your availability' }),
  }),
  certifications: z.string().trim().optional(),
  linkedinUrl: z
    .string()
    .trim()
    .optional()
    .transform(val => val === '' ? undefined : val),
  portfolioUrl: z
    .string()
    .trim()
    .optional()
    .transform(val => val === '' ? undefined : val),
  hasDrivingLicense: z.enum(['Yes', 'No'], {
    errorMap: () => ({ message: 'Please select if you have a driving license' }),
  }),
  willingToTravel: z.enum(['Yes', 'No'], {
    errorMap: () => ({ message: 'Please select if you are willing to travel' }),
  }),
  additionalInfo: z.string().trim().max(2000, 'Additional info must not exceed 2000 characters').optional(),
});

export type ApplicationPayload = z.infer<typeof ApplicationSchema>;
