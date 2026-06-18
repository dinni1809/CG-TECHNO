// Telemetry / Event Tracking Helper for CG Techno Electronics
// Fulfills Phase 4, Phase 5, and Phase 11 (Consent Ready Architecture)

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Consent-ready flag
let analyticsConsentDefault = true;

/**
 * Configure consent flag dynamically (can be integrated with cookie banners later)
 */
export function setAnalyticsConsent(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics_consent_enabled', enabled ? 'true' : 'false');
  }
}

/**
 * Check if telemetry tracking is enabled
 */
export function isAnalyticsEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('analytics_consent_enabled');
    if (stored !== null) {
      return stored === 'true';
    }
  }
  return analyticsConsentDefault;
}

interface CommonEventParams {
  event_name: string;
  page_path: string;
  timestamp: string;
  [key: string]: any;
}

/**
 * Generic event push utility to push event properties to GTM's dataLayer and GA4.
 */
export function pushEvent(params: CommonEventParams): void {
  if (!isAnalyticsEnabled()) {
    console.log(`[Telemetry] Skipped event "${params.event_name}" (Consent Disabled)`);
    return;
  }

  if (typeof window !== 'undefined') {
    // 1. Initialise dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // 2. Format event payload matching GTM/GA standards
    const payload = {
      event: params.event_name.toLowerCase().replace(/\s+/g, '_'),
      ...params,
    };
    
    window.dataLayer.push(payload);
    console.log(`[Telemetry] Event pushed to dataLayer:`, payload);

    // 3. Fallback directly to gtag event if initialized
    if (typeof window.gtag === 'function') {
      const { event_name, ...rest } = params;
      window.gtag('event', event_name, rest);
    }
  }
}

/**
 * Track page views
 */
export function trackPageView(): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Page View',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track successful Contact Form Submissions (Phase 6)
 */
export function trackContactSubmission(details: { service?: string; email: string; phone: string }): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Contact Form Submitted',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    service_selected: details.service || 'General Enquiry',
    lead_email: details.email,
    lead_phone: details.phone,
  });
}

/**
 * Track successful Career Application Submissions (Phase 7)
 */
export function trackCareerApplication(details: { qualification: string; interest: string; experience: string }): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Career Application Submitted',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    qualification: details.qualification,
    area_of_interest: details.interest,
    experience_level: details.experience,
  });
}

/**
 * Track user clicks on phone links (Phase 9)
 */
export function trackPhoneClick(phone: string): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Phone Number Clicked',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    phone_number: phone,
  });
}

/**
 * Track user clicks on email links (Phase 9)
 */
export function trackEmailClick(email: string): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Email Address Clicked',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    email_address: email,
  });
}

/**
 * Track clicks on WhatsApp support triggers (Phase 9)
 */
export function trackWhatsAppClick(): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'WhatsApp Clicks',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track engagement clicks on primary CTA buttons (Phase 8)
 */
export function trackCTA(ctaLabel: string, actionName: string): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: actionName,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    cta_label: ctaLabel,
  });
}

/**
 * Track visitor interest/engagement with specific services categories (Phase 5)
 */
export function trackServiceInterest(serviceName: string): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Service Interest',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    service_name: serviceName,
  });
}

/**
 * Track successful admin authentication logins (Phase 10)
 */
export function trackAdminLogin(): void {
  if (typeof window === 'undefined') return;
  pushEvent({
    event_name: 'Admin Login Success',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}
