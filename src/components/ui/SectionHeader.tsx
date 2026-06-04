import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** small kicker label above the title */
  eyebrow?: string;
  href?: string;
  hrefLabel?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  href,
  hrefLabel = 'View all',
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn(align === 'center' && 'mx-auto max-w-2xl')}>
        {eyebrow && (
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-sm text-text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-accent"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
