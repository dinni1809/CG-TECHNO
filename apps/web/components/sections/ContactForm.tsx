'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ContactSchema, type ContactPayload } from '@cg-techno/features/schemas';
import { cn } from '@cg-techno/utils';
import { useSearchParams } from 'next/navigation';
import { trackContactSubmission } from '@/lib/analytics';

interface ContactFormProps {
  prefillService?: string;
}

function ContactFormInner({ prefillService: propPrefillService }: ContactFormProps) {
  const searchParams = useSearchParams();
  const queryPrefillService = searchParams ? searchParams.get('service') || '' : '';
  const prefillService = propPrefillService || queryPrefillService;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      service: prefillService || '',
      product: '',
      message: prefillService
        ? `I am interested in your ${prefillService} service. Please provide more details.`
        : '',
    },
  });

  useEffect(() => {
    if (prefillService) {
      reset({
        service: prefillService,
        product: '',
        message: `I am interested in your ${prefillService} service. Please provide more details.`,
      });
    }
  }, [prefillService, reset]);

  async function onSubmit(data: ContactPayload, e?: React.BaseSyntheticEvent) {
    if (status === 'loading') return;

    const target = e?.target as HTMLFormElement | undefined;
    const websiteVal = target?.querySelector('input[name="website"]') as HTMLInputElement | undefined;
    const website = websiteVal?.value || '';

    if (website) {
      console.log('[Spam Protection] Honeypot triggered in client Contact Form.');
      setStatus('success');
      reset();
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website }),
      });
      const json = await res.json();
      if (json.success === true) {
        const { email, phone, service } = data;
        trackContactSubmission({
          email,
          phone,
          service,
        });

        setStatus('success');
        reset();
      } else {
        setStatus('error');
        setErrorMessage(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50/30 border border-emerald-200/70 rounded-3xl p-8 sm:p-12 text-center shadow-lg shadow-emerald-100/20 max-w-xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-250/30"
            >
              <CheckCircle2 size={32} />
            </motion.div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4 font-heading">Enquiry Submitted Successfully</h3>
            <p className="text-gray-650 mb-6 leading-relaxed text-sm sm:text-base">
              Thank you for contacting CG Techno Electronics. We have received your details and our team will review your requirements.
              <br />
              <strong className="text-slate-800 block mt-2">Our team typically responds within 24 hours.</strong>
            </p>
            <p className="text-xs text-emerald-800 bg-emerald-100/50 border border-emerald-200 rounded-xl py-2.5 px-4 inline-block font-semibold mb-8">
              A confirmation email has been sent to your registered inbox.
            </p>
            <br />
            <button
              onClick={() => setStatus('idle')}
              className="btn-primary"
            >
              Send Another Enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Honeypot field for spam bot protection */}
            <div className="hidden" aria-hidden="true">
              <label className="form-label">Leave this field empty</label>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Rajesh Kumar"
                  className={cn('input-field', errors.name && 'input-error')}
                  autoComplete="name"
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="rajesh@company.com"
                  className={cn('input-field', errors.email && 'input-error')}
                  autoComplete="email"
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="form-label">Mobile Number *</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="9876543210"
                className={cn('input-field', errors.phone && 'input-error')}
                autoComplete="tel"
                maxLength={10}
              />
              {errors.phone && <p className="form-error">{errors.phone.message}</p>}
              <p className="text-xs text-gray-400 mt-1">10-digit Indian mobile number (starts with 6–9)</p>
            </div>

            {prefillService && (
              <div>
                <label className="form-label">Service of Interest</label>
                <input
                  {...register('service')}
                  type="text"
                  readOnly
                  className="input-field bg-gray-50 cursor-not-allowed"
                />
              </div>
            )}

            <div>
              <label className="form-label">Message *</label>
              <textarea
                {...register('message')}
                rows={5}
                placeholder="Tell us about your requirements — we'll prepare a custom solution for your business..."
                className={cn('input-field resize-none', errors.message && 'input-error')}
              />
              {errors.message && <p className="form-error">{errors.message.message}</p>}
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
              whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed h-14 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-base font-bold rounded-xl"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting your enquiry...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Enquiry
                </>
              )}
            </motion.button>

            <div className="space-y-2.5 pt-2">
              <p className="text-xs text-gray-400 text-center leading-normal">
                We typically respond within 24 hours. For urgent matters, call us directly.
              </p>
              <p className="text-[11px] text-gray-400 text-center leading-normal">
                🔒 Your information is kept confidential and used only for responding to your enquiry.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Suspense } from 'react';

export function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={
      <div className="h-96 flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-primary-800" />
      </div>
    }>
      <ContactFormInner {...props} />
    </Suspense>
  );
}
