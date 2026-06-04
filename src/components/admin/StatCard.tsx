import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  prefix,
  suffix,
  compact = true,
  gradient = 'from-primary to-secondary',
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  delta?: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
  gradient?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-5">
      <div className={cn('absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl', gradient)} />
      <div className="flex items-start justify-between">
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg', gradient)}>
          <Icon className="h-5 w-5" />
        </span>
        {typeof delta === 'number' && (
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold', positive ? 'bg-accent/15 text-accent' : 'bg-rose-500/15 text-rose-300')}>
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
        <AnimatedCounter value={value} compact={compact} prefix={prefix} suffix={suffix} />
      </p>
      <p className="mt-0.5 text-sm text-text-muted">{label}</p>
    </div>
  );
}
