import { cn } from '@cg-techno/utils';
import { AnimatedSection } from './AnimatedSection';

interface SectionHeaderProps {
  tag?: string;
  tagIcon?: React.ElementType;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  tagIcon: TagIcon,
  title,
  titleHighlight,
  description,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection className={cn(centered && 'text-center max-w-5xl mx-auto', className)}>
      {tag && (
        <div className={cn(
          'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border mb-4 shadow-sm backdrop-blur-sm transition-all',
          light
            ? 'bg-white/10 text-white/90 border-white/20'
            : 'bg-primary-50 text-primary-750 border-primary-100'
        )}>
          {TagIcon && <TagIcon size={15} className={light ? 'text-blue-300' : 'text-primary-800'} />}
          <span>{tag}</span>
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
