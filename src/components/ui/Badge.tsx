import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'accent' | 'hot' | 'new' | 'neutral';

const styles: Record<Variant, string> = {
  primary: 'bg-primary/20 text-primary-200 border-primary/40',
  secondary: 'bg-secondary/15 text-secondary-400 border-secondary/40',
  accent: 'bg-accent/15 text-accent-400 border-accent/40',
  hot: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  new: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  neutral: 'bg-white/5 text-text-muted border-white/10',
};

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
