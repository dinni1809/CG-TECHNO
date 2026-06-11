'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { ApplicationSchema, AVAILABLE_ROLES, type ApplicationPayload } from '@cg-techno/features/schemas';
import { cn } from '@cg-techno/utils';

export function ApplicationForm({ defaultRole }: { defaultRole?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationPayload>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      role: (AVAILABLE_ROLES as readonly string[]).includes(defaultRole || '')
        ? (defaultRole as ApplicationPayload['role'])
        : undefined,
    },
  });

  async function onSubmit(data: ApplicationPayload) {
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/apply', {
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
        <h3 className="text-xl font-bold text-gray-900 mb-3">Application Received!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for applying. Our HR team will review your application and be in touch within 5 business days.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-primary">
          Submit Another Application
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
            placeholder="Priya Sharma"
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
            placeholder="priya@example.com"
            className={cn('input-field', errors.email && 'input-error')}
            autoComplete="email"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        </div>
        <div>
          <label className="form-label">Position Applying For *</label>
          <div className="relative">
            <select
              {...register('role')}
              className={cn('input-field appearance-none pr-10', errors.role && 'input-error')}
            >
              <option value="">Select a role...</option>
              {AVAILABLE_ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {errors.role && <p className="form-error">{errors.role.message}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Cover Note <span className="text-gray-400 font-normal">(Optional)</span></label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about yourself, your experience, and why you want to join CG Techno Electronics..."
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
            Submitting Application...
          </>
        ) : (
          <>
            <Send size={16} />
            Submit Application
          </>
        )}
      </motion.button>
    </form>
  );
}
