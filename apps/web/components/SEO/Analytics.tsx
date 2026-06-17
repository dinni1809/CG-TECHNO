'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function Analytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Phase 3: Load after scroll, click, touchstart, mousemove, keydown, or 4 seconds fallback.
    const handleInteraction = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });

    const timer = setTimeout(() => {
      setShouldLoad(true);
      cleanup();
    }, 4000);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) return null;

  const isProd = process.env.NODE_ENV === 'production';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const hasGtm = !!gtmId;
  const hasGa = !!gaId;

  // Phase 1 & 2: Log warnings and skip initialization gracefully if GTM or GA IDs are missing.
  if (typeof window !== 'undefined') {
    if (!gtmId && !(window as any).__gtm_warned) {
      console.warn('[Analytics Warning] NEXT_PUBLIC_GTM_ID is not configured. Google Tag Manager initialization skipped.');
      (window as any).__gtm_warned = true;
    }
    if (isProd && !gaId && !(window as any).__ga_warned) {
      console.warn('[Analytics Warning] NEXT_PUBLIC_GA_ID is not configured. Google Analytics 4 initialization skipped.');
      (window as any).__ga_warned = true;
    }
  }

  return (
    <>
      {/* Google Tag Manager (GTM) Container */}
      {hasGtm && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* Google Analytics 4 (GA4) Container - Only loaded in Production */}
      {isProd && hasGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
export default Analytics;
