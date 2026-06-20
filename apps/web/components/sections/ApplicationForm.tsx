'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronDown, 
  Upload,
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  PlusCircle,
  Search,
  UserCheck,
  MessageSquare,
  Trophy,
  Calendar,
  Info
} from 'lucide-react';
import {
  ApplicationSchema,
  QUALIFICATIONS,
  EXPERIENCE_LEVELS,
  EMPLOYMENT_PREFERENCES,
  AVAILABILITIES,
  AREAS_OF_INTEREST,
  type ApplicationPayload
} from '@cg-techno/features/schemas';
import { cn } from '@cg-techno/utils';
import { trackCareerApplication } from '@/lib/analytics';

export function ApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const form = useForm<any>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      interests: [],
      hasDrivingLicense: 'No',
      willingToTravel: 'No',
      resume: null,
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  // Register virtual resume field with validators
  useEffect(() => {
    form.register('resume', {
      required: 'Resume is required',
      validate: {
        lessThan4MB: (file) => !file || file.size <= 4 * 1024 * 1024 || 'Max file size is 4MB',
        acceptedFormats: (file) =>
          !file ||
          ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type) ||
          file.name.endsWith('.pdf') ||
          file.name.endsWith('.doc') ||
          file.name.endsWith('.docx') ||
          'Only PDF, DOC, and DOCX files are accepted',
      },
    });
  }, [form]);

  async function onSubmit(data: any, e?: React.BaseSyntheticEvent) {
    if (status === 'loading') return;

    const target = e?.target as HTMLFormElement | undefined;
    const websiteVal = target?.querySelector('input[name="website"]') as HTMLInputElement | undefined;
    const website = websiteVal?.value || '';

    if (website) {
      console.log('[Spam Protection] Honeypot triggered in client Career Form.');
      setStatus('success');
      setSelectedFile(null);
      reset();
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('website', website);
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('mobile', data.mobile);
      formData.append('city', data.city);
      formData.append('qualification', data.qualification);
      formData.append('fieldOfStudy', data.fieldOfStudy);
      formData.append('experience', data.experience);

      if (Array.isArray(data.interests)) {
        data.interests.forEach((interest: string) => {
          formData.append('interests', interest);
        });
      }

      formData.append('preference', data.preference);
      formData.append('availability', data.availability);

      if (data.certifications) formData.append('certifications', data.certifications);
      if (data.linkedinUrl) formData.append('linkedinUrl', data.linkedinUrl);
      if (data.portfolioUrl) formData.append('portfolioUrl', data.portfolioUrl);

      formData.append('hasDrivingLicense', data.hasDrivingLicense);
      formData.append('willingToTravel', data.willingToTravel);

      if (selectedFile) {
        formData.append('resume', selectedFile);
      }

      if (data.additionalInfo) formData.append('additionalInfo', data.additionalInfo);

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.success === true) {
        const { qualification, experience } = data;
        const position = Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || 'General Interest');
        trackCareerApplication({
          position,
          qualification,
          experience,
        });

        setStatus('success');
        setSelectedFile(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      form.setValue('resume', file, { shouldValidate: true });
    } else {
      setSelectedFile(null);
      form.setValue('resume', null, { shouldValidate: true });
    }
  };

  const selectedInterests = form.watch('interests') || [];

  function getInterestEmoji(interest: string): string {
    switch (interest) {
      case 'IT Infrastructure': return '🖥️';
      case 'Networking': return '🌐';
      case 'CCTV & Security Systems': return '🛡️';
      case 'Biometric Systems': return '👤';
      case 'Access Control & Automation': return '🔐';
      case 'Boom Barrier Systems': return '🚧';
      case 'Software Licensing': return '🔑';
      case 'Electronics Integration': return '⚡';
      case 'Technical Support & AMC': return '🛠️';
      case 'Sales & Business Development': return '📈';
      case 'Administration': return '🏢';
      case 'Internship Opportunities': return '🎓';
      default: return '💼';
    }
  }

  return (
    <div className="space-y-16">
      {/* SECTION 3 — INTRODUCTION BLOCK */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-950 text-white rounded-3xl p-8 sm:p-12 border border-primary-850 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-800/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/90 mb-6">
            <Briefcase size={14} className="text-blue-300 animate-pulse" />
            <span>WE ARE HIRING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight font-heading">
            Build Your Career With CG Techno
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed font-normal">
            We are always looking for passionate professionals across infrastructure, networking, electronics, security systems, automation, support services, and business operations. Whether you are a fresher, technician, engineer, sales professional, or experienced specialist, we would love to hear from you.
          </p>
        </div>
      </div>

      {/* SECTION 4 — APPLICANT ADVANTAGE PANEL */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="text-blue-600" size={20} />
          </div>
          <div className="space-y-4 w-full">
            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              Increase Your Chances of Getting Shortlisted
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 font-extrabold text-base">✓</span>
                <span>Complete profile = Faster review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 font-extrabold text-base">✓</span>
                <span>Resume uploaded = Higher shortlist visibility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 font-extrabold text-base">✓</span>
                <span>Relevant certifications = Added advantage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 font-extrabold text-base">✓</span>
                <span>LinkedIn profile = Recommended</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 font-extrabold text-base">✓</span>
                <span>Experience in IT / Electronics = Preferred</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 font-extrabold text-base">✓</span>
                <span>Detailed project experience = Helpful</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form or Success Screen */}
      <div ref={containerRef} className="w-full">
        {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 sm:p-14 text-center shadow-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <CheckCircle2 size={32} className="text-emerald-600" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Application Submitted Successfully</h3>
          <p className="text-gray-650 max-w-xl mx-auto leading-relaxed mb-4">
            Your profile has been received and will be reviewed by our recruitment team.
          </p>
          <p className="text-xs text-blue-800 bg-blue-50 border border-blue-100 rounded-xl py-2.5 px-4 inline-block font-semibold mb-8">
            A confirmation email has been sent to your registered inbox.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="inline-flex items-center justify-center px-6 h-12 bg-primary-800 hover:bg-primary-700 active:bg-primary-900 text-white font-bold rounded-xl shadow-md transition-all text-sm"
          >
            Submit Another Application
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
          {/* Honeypot field for spam bot protection */}
          <div className="hidden" aria-hidden="true">
            <label className="form-label">Leave this field empty</label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {/* Card 1: Personal Information */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-800 shrink-0">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">Personal Information</h3>
                <p className="text-sm text-gray-550">Tell us how we can reach you.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="form-label font-bold text-gray-700">Full Name *</label>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Vijay Kumar"
                  className={cn('input-field', errors.fullName && 'input-error')}
                  autoComplete="name"
                />
                {errors.fullName && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.fullName.message as string}</p>}
              </div>

              <div>
                <label className="form-label font-bold text-gray-700">Mobile Number *</label>
                <input
                  {...register('mobile')}
                  type="tel"
                  placeholder="9876543210"
                  className={cn('input-field', errors.mobile && 'input-error')}
                  autoComplete="tel"
                  maxLength={10}
                />
                {errors.mobile && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.mobile.message as string}</p>}
              </div>

              <div>
                <label className="form-label font-bold text-gray-700">Email Address *</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="vijay@example.com"
                  className={cn('input-field', errors.email && 'input-error')}
                  autoComplete="email"
                />
                {errors.email && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.email.message as string}</p>}
              </div>

              <div>
                <label className="form-label font-bold text-gray-700">Current City *</label>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Bengaluru"
                  className={cn('input-field', errors.city && 'input-error')}
                />
                {errors.city && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.city.message as string}</p>}
              </div>
            </div>
          </div>

          {/* Card 2: Education & Experience */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm hover:shadow-md transition-shadow space-y-8">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-800 shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">Education & Experience</h3>
                <p className="text-sm text-gray-550">Help us understand your academic and professional background.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="form-label font-bold text-gray-700">Highest Qualification *</label>
                  <div className="relative">
                    <select
                      {...register('qualification')}
                      className={cn('input-field appearance-none pr-10', errors.qualification && 'input-error')}
                    >
                      <option value="">Select qualification...</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.qualification && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.qualification.message as string}</p>}
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">Field of Study *</label>
                  <input
                    {...register('fieldOfStudy')}
                    type="text"
                    placeholder="Computer Science, Electronics, etc."
                    className={cn('input-field', errors.fieldOfStudy && 'input-error')}
                  />
                  {errors.fieldOfStudy && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.fieldOfStudy.message as string}</p>}
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">Years of Experience *</label>
                  <div className="relative">
                    <select
                      {...register('experience')}
                      className={cn('input-field appearance-none pr-10', errors.experience && 'input-error')}
                    >
                      <option value="">Select experience...</option>
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.experience && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.experience.message as string}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <label className="form-label font-bold text-gray-700">Employment Preference *</label>
                  <div className="relative">
                    <select
                      {...register('preference')}
                      className={cn('input-field appearance-none pr-10', errors.preference && 'input-error')}
                    >
                      <option value="">Select preference...</option>
                      {EMPLOYMENT_PREFERENCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.preference && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.preference.message as string}</p>}
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">Availability *</label>
                  <div className="relative">
                    <select
                      {...register('availability')}
                      className={cn('input-field appearance-none pr-10', errors.availability && 'input-error')}
                    >
                      <option value="">Select availability...</option>
                      {AVAILABILITIES.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.availability && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.availability.message as string}</p>}
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">Driving License? *</label>
                  <div className="flex items-center gap-6 h-12 bg-white px-4 border border-gray-200 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        value="Yes"
                        {...register('hasDrivingLicense')}
                        className="w-4 h-4 border-gray-300 text-primary-800 focus:ring-primary-750"
                      />
                      <span className="text-sm font-semibold text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        value="No"
                        {...register('hasDrivingLicense')}
                        className="w-4 h-4 border-gray-300 text-primary-800 focus:ring-primary-750"
                      />
                      <span className="text-sm font-semibold text-gray-700">No</span>
                    </label>
                  </div>
                  {errors.hasDrivingLicense && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.hasDrivingLicense.message as string}</p>}
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">Willing to travel? *</label>
                  <div className="flex items-center gap-6 h-12 bg-white px-4 border border-gray-200 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        value="Yes"
                        {...register('willingToTravel')}
                        className="w-4 h-4 border-gray-300 text-primary-800 focus:ring-primary-750"
                      />
                      <span className="text-sm font-semibold text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        value="No"
                        {...register('willingToTravel')}
                        className="w-4 h-4 border-gray-300 text-primary-800 focus:ring-primary-750"
                      />
                      <span className="text-sm font-semibold text-gray-700">No</span>
                    </label>
                  </div>
                  {errors.willingToTravel && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.willingToTravel.message as string}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Areas of Interest */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-800 shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">Areas of Interest *</h3>
                <p className="text-sm text-gray-550">Select the departments or business areas that interest you.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AREAS_OF_INTEREST.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                const emoji = getInterestEmoji(interest);
                return (
                  <label
                    key={interest}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none group",
                      isSelected
                        ? "bg-primary-800 border-primary-800 text-white shadow-md shadow-primary-800/10"
                        : "bg-white border-gray-200 text-gray-700 hover:border-primary-200 hover:bg-primary-50/10"
                    )}
                  >
                    <input
                      type="checkbox"
                      value={interest}
                      {...register('interests')}
                      className="sr-only"
                    />
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-colors",
                      isSelected ? "bg-white/20" : "bg-gray-50 group-hover:bg-primary-50"
                    )}>
                      {emoji}
                    </div>
                    <span className="text-sm font-semibold">{interest}</span>
                  </label>
                );
              })}
            </div>
            {errors.interests && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.interests.message as string}</p>}
          </div>

          {/* Card 4: Additional Information */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-800 shrink-0">
                <PlusCircle size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">Additional Information</h3>
                <p className="text-sm text-gray-550">Showcase certifications, projects, achievements, and professional strengths.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="form-label font-bold text-gray-700">Certifications <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    {...register('certifications')}
                    type="text"
                    placeholder="CCNA, Microsoft, AWS, Hikvision, etc."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">LinkedIn Profile <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    {...register('linkedinUrl')}
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className={cn('input-field', errors.linkedinUrl && 'input-error')}
                  />
                  {errors.linkedinUrl && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.linkedinUrl.message as string}</p>}
                </div>

                <div>
                  <label className="form-label font-bold text-gray-700">Portfolio / Website <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    {...register('portfolioUrl')}
                    type="url"
                    placeholder="https://portfolio.com"
                    className={cn('input-field', errors.portfolioUrl && 'input-error')}
                  />
                  {errors.portfolioUrl && <p className="form-error text-red-500 text-xs mt-1 font-bold">{errors.portfolioUrl.message as string}</p>}
                </div>
              </div>

              <div>
                <label className="form-label font-bold text-gray-700">Additional Information <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea
                  {...register('additionalInfo')}
                  rows={4}
                  placeholder="Tell us about your skills, certifications, projects, achievements, or why you would like to work with CG Techno."
                  className={cn('input-field resize-none', errors.additionalInfo && 'input-error')}
                />
                {errors.additionalInfo && <p className="form-error text-red-500 text-xs mt-1.5 font-bold">{errors.additionalInfo.message as string}</p>}
              </div>
            </div>
          </div>

          {/* Card 5: Resume Upload */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-800 shrink-0">
                <Upload size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">Resume Upload *</h3>
                <p className="text-sm text-gray-550">Upload your latest resume for faster review and evaluation.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className={cn(
                "relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center group cursor-pointer",
                selectedFile 
                  ? "border-emerald-350 bg-emerald-50/20 hover:bg-emerald-50/30" 
                  : "border-gray-300 bg-white hover:border-primary-500"
              )}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {selectedFile ? (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                      <CheckCircle2 size={24} className="text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-emerald-905">Resume Uploaded Successfully!</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-550">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-primary-50 transition-colors">
                      <Upload size={20} className="text-gray-550 group-hover:text-primary-800 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-400">PDF, DOC, or DOCX formats only (Max 4MB)</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  Applications with resumes are reviewed significantly faster than incomplete applications.
                </p>
              </div>

              {errors.resume && <p className="form-error text-red-500 text-xs mt-1.5 font-bold">{errors.resume.message as string}</p>}
            </div>
          </div>

          {/* SECTION 10 — APPLICATION TIPS PANEL */}
          <div className="bg-amber-50/40 border border-amber-100 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <Sparkles className="text-amber-800" size={16} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading">Application Tips</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pl-2">
              {[
                'Upload an updated resume',
                'Include certifications',
                'Add LinkedIn profile',
                'Mention relevant projects',
                'Select accurate areas of interest',
                'Provide complete information',
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 11 — PREMIUM SUBMIT AREA */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm space-y-6 text-center">
            <div className="max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-extrabold text-gray-900 font-heading">Ready to Join CG Techno?</h3>
              <p className="text-sm text-gray-550 leading-relaxed">
                Our recruitment team carefully reviews every application. Complete profiles with resumes and certifications are typically processed faster.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 border border-primary-100 text-primary-850 text-xs font-bold uppercase tracking-wider mx-auto">
              <Calendar size={14} className="text-primary-750" />
              <span>Average review time: 3–7 business days</span>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-750 text-left shadow-sm max-w-md mx-auto"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span className="font-bold">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
                className="btn-primary w-full max-w-md mx-auto disabled:opacity-60 disabled:cursor-not-allowed h-14 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-base font-bold rounded-xl"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin text-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Application
                  </>
                )}
              </motion.button>
              <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed max-w-md mx-auto font-medium">
                ℹ️ Applications are reviewed by our recruitment team. Complete profiles receive faster review.
              </p>
            </div>
          </div>

          {/* Divider to separate Submit Section from Timeline Section */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Recruitment Process Timeline
            </span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          {/* SECTION 9 — HIRING PROCESS TIMELINE */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-sm space-y-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 font-heading">What Happens Next?</h3>
              <p className="text-sm text-gray-550">Our streamlined recruitment process helps us find the best fit quickly.</p>
            </div>
            
            {/* Desktop Timeline */}
            <div className="hidden md:grid grid-cols-5 gap-4 relative">
              <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
              
              {[
                { title: 'Application Submitted', desc: 'Step 1', icon: Send },
                { title: 'Initial Screening', desc: 'Step 2', icon: Search },
                { title: 'Profile Review', desc: 'Step 3', icon: UserCheck },
                { title: 'Interview Discussion', desc: 'Step 4', icon: MessageSquare },
                { title: 'Final Selection', desc: 'Step 5', icon: Trophy },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                    <div className="w-12 h-12 rounded-full bg-primary-50 border-2 border-primary-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-primary-800" />
                    </div>
                    <span className="text-xs font-bold text-primary-850 mt-3 uppercase tracking-wider">{step.desc}</span>
                    <span className="text-sm font-bold text-gray-900 mt-1 max-w-[130px] leading-snug">{step.title}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Mobile Timeline */}
            <div className="md:hidden flex flex-col gap-6 relative pl-6">
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200" />
              {[
                { title: 'Application Submitted', desc: 'Step 1', icon: Send },
                { title: 'Initial Screening', desc: 'Step 2', icon: Search },
                { title: 'Profile Review', desc: 'Step 3', icon: UserCheck },
                { title: 'Interview Discussion', desc: 'Step 4', icon: MessageSquare },
                { title: 'Final Selection', desc: 'Step 5', icon: Trophy },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-primary-50 border-2 border-primary-800 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon size={16} className="text-primary-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary-850 uppercase tracking-wider">{step.desc}</span>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">{step.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            All applications are subject to our standard recruitment and data privacy policies.
          </p>
        </form>
      )}
      </div>
    </div>
  );
}
