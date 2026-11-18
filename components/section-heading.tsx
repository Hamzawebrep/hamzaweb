import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/reveal';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <span className="label text-terracotta">{eyebrow}</span>
      <h2
        className={cn(
          'mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl',
          light ? 'text-bone' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-sm leading-relaxed sm:text-base',
            light ? 'text-travertine/70' : 'text-ink/65'
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
