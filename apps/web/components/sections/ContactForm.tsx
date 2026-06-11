'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ContactSchema, type ContactPayload } from '@cg-techno/features/schemas';
import { cn } from '@cg-techno/utils';

interface ContactFormProps {
  prefillService?: string;
  prefillProduct?: string;
}

export function ContactForm({ prefillService, prefillProduct }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      service: prefillService || '',
      product: prefillProduct || '',
      message: prefillService
        ? `I am interested in your ${prefillService} service. Please provide more details.`
        : prefillProduct
        ? `I would like to enquire about ${prefillProduct}. Please share pricing and availability.`
        : '',
    },
  });

  async function onSubmit(data: ContactPayload) {
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
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

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-100 rounded-2xl p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5"
        >
          <CheckCircle2 size={32} className="text-emerald-600" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Enquiry Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. Our team will contact you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-primary"
        >
          Send Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

      {(prefillService || prefillProduct) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          {prefillProduct && (
            <div>
              <label className="form-label">Product Enquiry</label>
              <input
                {...register('product')}
                type="text"
                readOnly
                className="input-field bg-gray-50 cursor-not-allowed"
              />
            </div>
          )}
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
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Enquiry
          </>
        )}
      </motion.button>

      <p className="text-xs text-gray-400 text-center">
        We typically respond within 24 hours. For urgent matters, call us directly.
      </p>
    </form>
  );
}
