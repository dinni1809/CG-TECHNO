import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-transparent mt-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
      <Link href="/" className="hover:text-primary-800 transition-colors flex items-center gap-1.5 py-1">
        <Home size={14} className="shrink-0" />
        <span>Home</span>
      </Link>
      
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-slate-300 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-slate-500 font-extrabold py-1">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-primary-800 transition-colors py-1">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
