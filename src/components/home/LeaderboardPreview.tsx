import Link from 'next/link';
import { Crown, Medal, Trophy } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getLeaderboard } from '@/lib/queries';
import { cn, formatCompact } from '@/lib/utils';

const rankColor = ['text-amber-400', 'text-slate-300', 'text-orange-400'];

export function LeaderboardPreview() {
  const players = getLeaderboard(8);

  return (
    <section className="container-page section-padding py-12">
      <SectionHeader
        eyebrow="Hall of fame"
        title="Top Players"
        subtitle="The highest scorers across all GameVerse games this season."
        href="/leaderboard"
        hrefLabel="Full leaderboard"
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <ul className="divide-y divide-white/5">
          {players.map((p, i) => (
            <li key={p.id} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-white/5 sm:px-6">
              <span className={cn('flex w-8 shrink-0 items-center justify-center font-display text-lg font-bold', rankColor[i] ?? 'text-text-muted')}>
                {i === 0 ? <Crown className="h-5 w-5" /> : i < 3 ? <Medal className="h-5 w-5" /> : i + 1}
              </span>
              <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white', p.avatarGradient)}>
                {p.username.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{p.username}</p>
                <p className="text-xs text-text-muted">Level {p.level} · {p.country} · {formatCompact(p.wins)} wins</p>
              </div>
              <div className="hidden flex-wrap justify-end gap-1.5 sm:flex">
                {p.badges.slice(0, 2).map((b) => (
                  <span key={b} className="chip !py-0.5 !text-[10px]">{b}</span>
                ))}
              </div>
              <div className="shrink-0 text-right">
                <p className="flex items-center justify-end gap-1 font-display text-base font-bold text-accent">
                  <Trophy className="h-4 w-4" /> {formatCompact(p.score)}
                </p>
                <p className="text-[11px] text-text-muted">points</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
