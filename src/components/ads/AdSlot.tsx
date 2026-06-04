import { cn } from '@/lib/utils';

type AdFormat = 'leaderboard' | 'rectangle' | 'banner' | 'sidebar';

const sizes: Record<AdFormat, string> = {
  leaderboard: 'min-h-[90px]',
  banner: 'min-h-[100px]',
  rectangle: 'min-h-[250px]',
  sidebar: 'min-h-[600px]',
};

/**
 * Reusable ad placement. In production this renders a Google AdSense unit.
 * To enable: set NEXT_PUBLIC_ADSENSE_CLIENT, load the AdSense script in
 * layout.tsx, then replace the placeholder below with an <ins className="adsbygoogle" />
 * and push to `window.adsbygoogle`. See docs/MONETIZATION in the README.
 */
export function AdSlot({
  format = 'leaderboard',
  slot,
  className,
  label = 'Advertisement',
}: {
  format?: AdFormat;
  slot?: string;
  className?: string;
  label?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <div
      className={cn(
        'container-page section-padding flex w-full items-center justify-center',
        className,
      )}
      aria-hidden
    >
      <div
        data-ad-client={client}
        data-ad-slot={slot}
        className={cn(
          'flex w-full max-w-3xl items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-xs uppercase tracking-[0.2em] text-text-muted/60',
          sizes[format],
        )}
      >
        {label}
      </div>
    </div>
  );
}
