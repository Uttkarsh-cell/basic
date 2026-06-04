import Link from 'next/link';
import { Gamepad2, DollarSign, Users, Activity, Eye, Flag, ArrowRight } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { BarChart, DonutChart } from '@/components/admin/Charts';
import { RatingStars } from '@/components/ui/RatingStars';
import {
  getDashboardKpis,
  getPlaysLast14Days,
  getRevenueByMonth,
  getTrafficSources,
  getTopGamesByPlays,
  adminReports,
} from '@/lib/data/analytics';
import { formatCompact } from '@/lib/utils';

export default function AdminDashboard() {
  const kpis = getDashboardKpis();
  const plays = getPlaysLast14Days();
  const revenue = getRevenueByMonth();
  const traffic = getTrafficSources();
  const topGames = getTopGamesByPlays(6);
  const openReports = adminReports.filter((r) => r.status === 'open');

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Dashboard</h1>
          <p className="text-sm text-text-muted">Platform overview and key metrics.</p>
        </div>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted">
          Last updated just now
        </span>
      </header>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Plays" value={kpis.totalPlays} icon={Eye} delta={kpis.deltas.plays} gradient="from-primary to-secondary" />
        <StatCard label="Revenue (YTD)" value={kpis.revenue} icon={DollarSign} delta={kpis.deltas.revenue} prefix="$" gradient="from-accent to-emerald-600" />
        <StatCard label="Registered Users" value={kpis.users} icon={Users} delta={kpis.deltas.users} gradient="from-pink-500 to-rose-600" />
        <StatCard label="Active Now" value={kpis.activeNow} icon={Activity} delta={kpis.deltas.activeNow} gradient="from-orange-500 to-amber-600" />
      </div>

      {/* charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-white">Plays — last 14 days</h2>
            <span className="text-xs text-text-muted">{formatCompact(plays.reduce((s, p) => s + p.value, 0))} total</span>
          </div>
          <BarChart data={plays} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-5">
          <h2 className="mb-4 font-display font-bold text-white">Traffic sources</h2>
          <DonutChart data={traffic} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-surface p-5 lg:col-span-2">
          <h2 className="mb-4 font-display font-bold text-white">Revenue by month</h2>
          <BarChart data={revenue} unit="$" />
        </div>

        {/* open reports */}
        <div className="rounded-2xl border border-white/10 bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display font-bold text-white">
              <Flag className="h-4 w-4 text-rose-400" /> Open reports
            </h2>
            <Link href="/admin/reports" className="text-xs font-semibold text-secondary hover:text-accent">View all</Link>
          </div>
          <ul className="space-y-3">
            {openReports.slice(0, 4).map((r) => (
              <li key={r.id} className="rounded-xl border border-white/10 bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{r.target}</span>
                  <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-300">{r.type}</span>
                </div>
                <p className="mt-0.5 text-xs text-text-muted">{r.reason}</p>
              </li>
            ))}
            {openReports.length === 0 && <p className="text-sm text-text-muted">No open reports 🎉</p>}
          </ul>
        </div>
      </div>

      {/* top games */}
      <div className="rounded-2xl border border-white/10 bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display font-bold text-white">
            <Gamepad2 className="h-4 w-4 text-secondary" /> Top games by plays
          </h2>
          <Link href="/admin/games" className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-accent">
            Manage games <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-text-muted">
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Game</th>
                <th className="px-3 py-2 font-medium">Rating</th>
                <th className="hidden px-3 py-2 font-medium sm:table-cell">Likes</th>
                <th className="px-3 py-2 text-right font-medium">Plays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topGames.map((g, i) => (
                <tr key={g.id} className="transition-colors hover:bg-white/5">
                  <td className="px-3 py-2.5 font-display font-bold text-text-muted">{i + 1}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${g.gradient} text-xs font-bold text-white`}>
                        {g.title.slice(0, 1)}
                      </span>
                      <span className="font-medium text-white">{g.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><RatingStars value={g.rating} size={12} showValue /></td>
                  <td className="hidden px-3 py-2.5 text-text-muted sm:table-cell">{formatCompact(g.likes)}</td>
                  <td className="px-3 py-2.5 text-right font-semibold text-accent">{formatCompact(g.plays)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
