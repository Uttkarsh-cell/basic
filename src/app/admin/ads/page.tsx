import { Megaphone, MousePointerClick, Eye, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { adminAds } from '@/lib/data/analytics';
import { cn, formatCompact } from '@/lib/utils';

export default function AdminAdsPage() {
  const totalImpressions = adminAds.reduce((s, a) => s + a.impressions, 0);
  const totalClicks = adminAds.reduce((s, a) => s + a.clicks, 0);
  const ctr = ((totalClicks / totalImpressions) * 100).toFixed(2);
  // Rough estimated revenue using a sample $4 eCPM.
  const estRevenue = Math.round((totalImpressions / 1000) * 4);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Advertisements</h1>
        <p className="text-sm text-text-muted">Manage ad placements and track performance.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Impressions" value={totalImpressions} icon={Eye} gradient="from-primary to-secondary" />
        <StatCard label="Clicks" value={totalClicks} icon={MousePointerClick} gradient="from-accent to-emerald-600" />
        <StatCard label="Est. Revenue" value={estRevenue} icon={DollarSign} prefix="$" gradient="from-orange-500 to-amber-600" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="flex items-center gap-2 font-display font-bold text-white">
            <Megaphone className="h-4 w-4 text-secondary" /> Placements · {ctr}% avg CTR
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Placement</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Impressions</th>
                <th className="px-4 py-3 text-right font-medium">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {adminAds.map((a) => {
                const adCtr = ((a.clicks / a.impressions) * 100).toFixed(2);
                return (
                  <tr key={a.id} className="transition-colors hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                    <td className="hidden px-4 py-3 capitalize text-text-muted sm:table-cell">{a.placement.replace('-', ' ')}</td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', a.active ? 'text-accent' : 'text-text-muted')}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', a.active ? 'bg-accent' : 'bg-text-muted')} />
                        {a.active ? 'Active' : 'Paused'}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-text-muted md:table-cell">{formatCompact(a.impressions)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-secondary">{adCtr}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
