'use client';

import Link from 'next/link';
import { Heart, History, Bookmark, LogIn, Trophy, Award, Gamepad2 } from 'lucide-react';
import { GameCard } from '@/components/game/GameCard';
import { AuthMenu } from '@/components/layout/AuthMenu';
import { useUserStore, useHasHydrated } from '@/store/useUserStore';
import { getGameBySlug } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { Game } from '@/lib/types';

export default function ProfilePage() {
  const hydrated = useHasHydrated();
  const profile = useUserStore((s) => s.profile);
  const favorites = useUserStore((s) => s.favorites);
  const history = useUserStore((s) => s.history);
  const likes = useUserStore((s) => s.likes);

  if (!hydrated) {
    return <div className="container-page section-padding py-16 text-center text-text-muted">Loading…</div>;
  }

  if (!profile) {
    return (
      <div className="container-page section-padding py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-surface p-8 text-center">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-neon">
            <LogIn className="h-7 w-7 text-white" />
          </span>
          <h1 className="font-display text-2xl font-bold text-white">Sign in to GameVerse</h1>
          <p className="mt-2 text-sm text-text-muted">Create a profile to save favorites, track your history and earn achievements.</p>
          <div className="mt-5 flex justify-center">
            <AuthMenu />
          </div>
        </div>
      </div>
    );
  }

  const favGames = favorites.map(getGameBySlug).filter(Boolean) as Game[];
  const histGames = history.map(getGameBySlug).filter(Boolean) as Game[];

  const stats = [
    { label: 'Favorites', value: favorites.length, icon: Bookmark },
    { label: 'Liked', value: likes.length, icon: Heart },
    { label: 'Played', value: history.length, icon: Gamepad2 },
    { label: 'Achievements', value: Math.min(history.length * 2, 24), icon: Award },
  ];

  return (
    <div className="container-page section-padding py-8">
      {/* header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-[80px]" />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row">
          <span className={cn('flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br font-display text-4xl font-extrabold text-white shadow-neon', profile.avatarGradient)}>
            {profile.name.slice(0, 1).toUpperCase()}
          </span>
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl font-extrabold text-white">{profile.name}</h1>
            <p className="text-sm capitalize text-text-muted">{profile.provider} account · Level {Math.max(1, history.length)}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="chip"><Trophy className="h-3 w-3 text-amber-400" /> Rookie</span>
              <span className="chip"><Gamepad2 className="h-3 w-3 text-secondary" /> Explorer</span>
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-background/40 p-3 text-center">
              <s.icon className="mx-auto mb-1 h-5 w-5 text-secondary" />
              <p className="font-display text-xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* favorites */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-white">
          <Bookmark className="h-5 w-5 text-accent" /> Favorite Games
        </h2>
        {favGames.length === 0 ? (
          <EmptyState text="No favorites yet. Tap the bookmark on any game to save it here." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {favGames.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
          </div>
        )}
      </section>

      {/* history */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-white">
          <History className="h-5 w-5 text-secondary" /> Recently Played
        </h2>
        {histGames.length === 0 ? (
          <EmptyState text="You haven't played anything yet. Jump into a game to start your history!" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {histGames.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-surface/50 p-10 text-center">
      <p className="text-sm text-text-muted">{text}</p>
      <Link href="/games" className="btn-neon mt-4">Browse games</Link>
    </div>
  );
}
