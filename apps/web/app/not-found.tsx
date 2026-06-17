import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Briefcase, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | CG Techno Electronics',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="text-center max-w-lg bg-white border border-gray-150 p-8 sm:p-12 rounded-3xl shadow-sm">
        <div className="text-8xl font-black text-primary-800 mb-4 font-heading tracking-tighter">404</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 font-heading">Page Not Found</h1>
        <p className="text-gray-655 mb-8 leading-relaxed text-sm sm:text-base">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Use the links below to find what you need.
        </p>

        {/* Helpful links catalog */}
        <div className="grid grid-cols-2 gap-4 mb-10 text-left">
          <Link href="/services" className="p-4 border border-gray-100 rounded-2xl hover:border-primary-200 hover:bg-primary-50/10 transition-all group flex items-start gap-3">
            <BookOpen size={16} className="text-primary-800 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-900">Our Services</div>
              <div className="text-[10px] text-gray-500 mt-0.5">IT, Networking & Surveillance</div>
            </div>
          </Link>
          <Link href="/about" className="p-4 border border-gray-100 rounded-2xl hover:border-primary-200 hover:bg-primary-50/10 transition-all group flex items-start gap-3">
            <Users size={16} className="text-primary-800 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-900">About Us</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Our Decadal Journey & Team</div>
            </div>
          </Link>
          <Link href="/careers" className="p-4 border border-gray-100 rounded-2xl hover:border-primary-200 hover:bg-primary-50/10 transition-all group flex items-start gap-3">
            <Briefcase size={16} className="text-primary-800 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-900">Careers</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Job Openings & Apply</div>
            </div>
          </Link>
          <Link href="/clients" className="p-4 border border-gray-100 rounded-2xl hover:border-primary-200 hover:bg-primary-50/10 transition-all group flex items-start gap-3">
            <Home size={16} className="text-primary-800 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-900">Our Clients</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Organizations We Serve</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={16} />
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            <ArrowLeft size={16} />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
