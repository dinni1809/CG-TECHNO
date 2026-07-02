export const DEFAULT_TENANT_ID = 'default-tenant';
export const DEFAULT_TEMPLATE_VERSION = '1.0';
export const DEFAULT_LOCALE = 'en';

// Fallback sender addresses matching CG Techno domain
export const DEFAULT_FROM_INFO = process.env.EMAIL_FROM_INFO || 'info@cgtechnoelectronics.com';
export const DEFAULT_FROM_SUPPORT = process.env.EMAIL_FROM_SUPPORT || 'support@cgtechnoelectronics.com';
export const DEFAULT_FROM_CAREERS = process.env.EMAIL_FROM_CAREERS || 'careers@cgtechnoelectronics.com';
export const DEFAULT_FROM_SALES = process.env.EMAIL_FROM_SALES || 'sales@cgtechnoelectronics.com';

// Fallback reply to address
export const DEFAULT_REPLY_TO = process.env.EMAIL_REPLY_TO || 'info@cgtechnoelectronics.com';

// Fallback staff notification routes
export const DEFAULT_ADMIN_EMAIL = process.env.EMAIL_ADMIN || 'cgtechnoelectronics@gmail.com';
export const DEFAULT_HR_EMAIL = process.env.EMAIL_HR || 'careers@cgtechnoelectronics.com';
export const DEFAULT_SECURITY_EMAIL = process.env.EMAIL_SECURITY || 'security@cgtechnoelectronics.com';

// System settings
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_BACKOFF_DELAY_MS = 1000;
