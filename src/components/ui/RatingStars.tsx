import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  value: number; // 0..5
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function RatingStars({ value, size = 14, showValue = false, className }: RatingStarsProps) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)} aria-label={`Rated ${value} out of 5`}>
      <span className="relative inline-block leading-none">
        {/* base (empty) stars */}
        <span className="flex text-white/15">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} width={size} height={size} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        {/* filled overlay clipped to percentage */}
        <span className="absolute inset-0 flex overflow-hidden text-amber-400" style={{ width: `${pct}%` }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} width={size} height={size} fill="currentColor" strokeWidth={0} className="shrink-0" />
          ))}
        </span>
      </span>
      {showValue && <span className="text-xs font-semibold text-amber-400">{value.toFixed(1)}</span>}
    </span>
  );
}
