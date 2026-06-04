import type { Metadata } from 'next';
import { Crown, Medal, Trophy, Flame } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { getLeaderboard } from '@/lib/queries';
import { cn, formatCompact } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Leaderboard — Top Players & Highest Scores',
  description: 'See the top GameVerse players and the highest scores across all games. Climb the global rankings this season.',
  alternates: { canonical: '/leaderboard' },
};

const podiumStyle = [
  { ring: 'ring-amber-400/60', grad: 'from-amber-400 to-orange-500', icon: Crown, order: 'order-2 sm:-mt-6', size: 'h-24 w-24' },
  { ring: 'ring-slate-300/60', grad: 'from-slate-300 to-slate-500', icon: Medal, order: 'order-1', size: 'h-20 w-20' },
  { ring: 'ring-orange-400/60', grad: 'from-orange-400 to-rose-500', icon: Medal, order: 'order-3', size: 'h-20 w-20' },
];

export default function LeaderboardPage() {
  const players = getLeaderboard(10);
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="container-page section-padding py-8">
      <header className="text-center">
        <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          <Flame className="h-4 w-4" /> Season 1
        </span>
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Global Leaderboard</h1>
        <p className="mx-auto mt-2 max-w-lg text-text-muted">The best of the best. Scores update live as players compete across every GameVerse title.</p>
      </header>

      {/* podium */}
      <div className="mx-auto mt-10 flex max-w-2xl items-end justify-center gap-4">
        {top3.map((p, i) => {
          const s = podiumStyle[i];
          const Icon = s.icon;
          return (
            <div key={p.id} className={cn('flex flex-1 flex-col items-center text-center', s.order)}>
              <div className={cn('relative mb-3 flex items-center justify-center rounded-full bg-gradient-to-br ring-4', p.avatarGradient, s.ring, s.size)}>
                <span className="font-display text-2xl font-extrabold text-white">{p.username.slice(0, 1)}</span>
                <span className={cn('absolute -bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg', s.grad)}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="truncate text-sm font-bold text-white">{p.username}</p>
              <p className="font-display text-lg font-extrabold text-accent">{formatCompact(p.score)}</p>
              <div className="mt-2 w-full rounded-t-xl border border-white/10 bg-surface py-2 text-xs text-text-muted" style={{ height: i === 0 ? 70 : 50 }}>
                #{i + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* table */}
      <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-text-muted">
              <th className="px-4 py-3 font-medium">Rank</th>
              <th className="px-4 py-3 font-medium">Player</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Level</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Wins</th>
              <th className="px-4 py-3 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rest.map((p, i) => (
              <tr key={p.id} className="transition-colors hover:bg-white/5">
                <td className="px-4 py-3 font-display font-bold text-text-muted">{i + 4}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={cn('flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white', p.avatarGradient)}>
                      {p.username.slice(0, 1)}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{p.username}</p>
                      <p className="text-xs text-text-muted">{p.country}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-text-muted sm:table-cell">{p.level}</td>
                <td className="hidden px-4 py-3 text-text-muted md:table-cell">{formatCompact(p.wins)}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-1 font-display font-bold text-accent">
                    <Trophy className="h-4 w-4" /> {formatCompact(p.score)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* season stats */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Players ranked', value: 1_240_000 },
          { label: 'Matches played', value: 58_400_000 },
          { label: 'Top score', value: players[0]?.score ?? 0 },
          { label: 'Achievements', value: 8_900_000 },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 text-center">
            <p className="font-display text-xl font-extrabold text-gradient">
              <AnimatedCounter value={s.value} suffix="+" />
            </p>
            <p className="mt-0.5 text-xs text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
