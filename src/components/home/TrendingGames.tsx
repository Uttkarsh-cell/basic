'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, TrendingUp } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GameThumb } from '@/components/game/GameThumb';
import { formatCompact } from '@/lib/utils';
import type { Game } from '@/lib/types';

export function TrendingGames({ games }: { games: Game[] }) {
  return (
    <section className="container-page section-padding py-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            Live now
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">Trending Today</h2>
          <p className="mt-1.5 text-sm text-text-muted">The hottest games players are jumping into right now.</p>
        </div>
        <Link href="/games?sort=trending" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-accent">
          View all
          <TrendingUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
            className="w-[60vw] shrink-0 snap-start sm:w-[40vw] md:w-[280px]"
          >
            <Link
              href={`/games/${game.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-card transition-all duration-300 hover:border-rose-500/40 hover:shadow-neon"
            >
              <div className="relative">
                <GameThumb game={game} iconSize={60} className="aspect-video" />
                <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 font-display text-sm font-bold text-white backdrop-blur">
                  {i + 1}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="btn-neon px-4 py-2 text-sm">
                    <Play className="h-4 w-4 fill-current" /> Play
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-display text-sm font-semibold text-white">{game.title}</h3>
                  <span className="shrink-0 text-[11px] font-semibold text-rose-400">{formatCompact(game.plays)}</span>
                </div>
                {/* live popularity bar */}
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wide text-text-muted">
                    <span>Popularity</span>
                    <span className="text-accent">{game.trendingScore}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${game.trendingScore}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 via-primary to-secondary"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
