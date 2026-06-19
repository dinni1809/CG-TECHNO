export { ContactSchema, SERVICE_OPTIONS } from './schemas/contact.schema';
export type { ContactPayload } from './schemas/contact.schema';

export {
  ApplicationSchema,
  QUALIFICATIONS,
  EXPERIENCE_LEVELS,
  EMPLOYMENT_PREFERENCES,
  AVAILABILITIES,
  AREAS_OF_INTEREST
} from './schemas/application.schema';
export type { ApplicationPayload } from './schemas/application.schema';

export { sendContactEmail } from './email/contact-email.template';
export { sendApplicationEmails } from './email/application-email.template';
