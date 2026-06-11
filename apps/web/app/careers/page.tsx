import type { Metadata } from 'next';
import { MapPin, Clock, Briefcase, TrendingUp, BookOpen, Users, Star, Shield, GraduationCap, Award } from 'lucide-react';
import { jobOpenings, companyPerks } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ApplicationForm } from '@/components/sections/ApplicationForm';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the CG Techno Electronics team. Browse open positions in IT engineering, sales, and operations. Apply for internships and full-time roles.',
};

const perkIconMap: Record<string, React.ElementType> = {
  TrendingUp, BookOpen, Users, MapPin, Shield, Star,
};

const employmentColors: Record<string, string> = {
  'Full-Time': 'bg-primary-50 text-primary-700 border-primary-100',
  'Internship': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Part-Time': 'bg-amber-50 text-amber-700 border-amber-100',
  'Contract': 'bg-violet-50 text-violet-700 border-violet-100',
};

export default function CareersPage() {
  const activeJobs = jobOpenings.filter((j) => j.isActive);

  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              <GraduationCap size={16} className="text-blue-300" />
              <span>Careers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
              Build Your Career at{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                CG Techno
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Work on challenging IT projects, grow your skills, and be part of a team that
              powers the digital infrastructure of Bengaluru&apos;s leading organizations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pt-10 pb-28 lg:pt-14 lg:pb-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Why CG Techno"
            tagIcon={Award}
            title="Perks of Working"
            titleHighlight="With Us"
            className="mb-12"
          />
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyPerks.map((perk) => {
              const Icon = perkIconMap[perk.icon] || Star;
              return (
                <StaggerItem key={perk.title}>
                  <div className="bg-gray-50 rounded-3xl p-6 text-center border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group h-full flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors shrink-0">
                      <Icon size={22} className="text-primary-700" />
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-2 leading-snug">{perk.title}</div>
                    <div className="text-sm text-gray-500 leading-snug">{perk.description}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-gray-50" id="positions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Now Hiring"
            tagIcon={Briefcase}
            title="Open"
            titleHighlight="Positions"
            description={`We currently have ${activeJobs.length} open positions across engineering, sales, and internship programs.`}
            className="mb-16"
          />

          <div className="space-y-8">
            {activeJobs.map((job, i) => (
              <AnimatedSection key={job.id} delay={0.05 * i}>
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary-100 transition-all">
                  <div className="p-9">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">{job.title}</h3>
                        <div className="flex flex-wrap gap-2.5">
                          <span className={cn('inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border', employmentColors[job.employmentType])}>
                            <Briefcase size={13} />
                            {job.employmentType}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            <MapPin size={13} />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            <Clock size={13} />
                            {job.department}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 shrink-0 font-semibold">
                        Posted {new Date(job.postedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    <p className="text-gray-650 text-base leading-relaxed mb-6">{job.shortDescription}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Key Responsibilities</div>
                        <ul className="space-y-2">
                          {job.responsibilities.slice(0, 3).map((r) => (
                            <li key={r} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Requirements</div>
                        <ul className="space-y-2">
                          {job.requirements.slice(0, 3).map((r) => (
                            <li key={r} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href="#apply"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-800 text-white text-base font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                    >
                      Apply for this Role
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="apply">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Apply Now"
            tagIcon={GraduationCap}
            title="Submit Your"
            titleHighlight="Application"
            description="Fill in the form below and our HR team will get back to you within 5 business days."
            className="mb-12"
          />
          <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 shadow-sm">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
