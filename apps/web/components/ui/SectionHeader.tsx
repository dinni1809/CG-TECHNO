import { cn } from '@cg-techno/utils';
import { AnimatedSection } from './AnimatedSection';

interface SectionHeaderProps {
  tag?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  titleHighlight,
  description,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection className={cn(centered && 'text-center max-w-3xl mx-auto', className)}>
      {tag && (
        <div className={cn(
          'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border mb-4',
          light
            ? 'bg-white/10 text-white/90 border-white/20'
            : 'bg-primary-50 text-primary-700 border-primary-100'
        )}>
          {tag}
        </div>
      )}
      <h2 className={cn(
        'text-3xl sm:text-4xl font-bold tracking-tight mb-4',
        light ? 'text-white' : 'text-gray-900'
      )}>
        {title}{' '}
        {titleHighlight && (
          <span className={cn(
            'bg-gradient-to-r bg-clip-text text-transparent',
            light
              ? 'from-blue-300 to-cyan-300'
              : 'from-primary-800 to-primary-500'
          )}>
            {titleHighlight}
          </span>
        )}
      </h2>
      {description && (
        <p className={cn(
          'text-base sm:text-lg leading-relaxed',
          light ? 'text-white/70' : 'text-gray-600'
        )}>
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
