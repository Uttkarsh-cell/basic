'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Sparkles, Flame, Gamepad2 } from 'lucide-react';
import { GameThumb } from '@/components/game/GameThumb';
import { RatingStars } from '@/components/ui/RatingStars';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Badge } from '@/components/ui/Badge';
import { formatCompact } from '@/lib/utils';
import type { Game } from '@/lib/types';

export function Hero({ spotlight, stats }: { spotlight: Game[]; stats: { games: number; players: number; totalPlays: number } }) {
  const [active, setActive] = useState(0);
  const game = spotlight[active];

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % spotlight.length), 5000);
    return () => clearInterval(id);
  }, [spotlight.length]);

  return (
    <section className="relative overflow-hidden">
      {/* animated backgrounds */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid-neon bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/30 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute right-0 top-40 h-72 w-72 rounded-full bg-secondary/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-page section-padding relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        {/* copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-text-muted backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {stats.games}+ instant games · no download required
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Play the best <span className="text-gradient">free games</span> right in your browser
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Jump into hundreds of lightweight games across every genre. Instant play on mobile,
            tablet and desktop — your next favorite game is one click away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href={`/games/${game?.slug ?? ''}`} className="btn-neon text-base">
              <Play className="h-5 w-5 fill-current" /> Play Instantly
            </Link>
            <Link href="/games" className="btn-ghost text-base">
              <Gamepad2 className="h-5 w-5" /> Browse All Games
            </Link>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {[
              { label: 'Games', value: stats.games, compact: false, suffix: '+' },
              { label: 'Players', value: stats.players, compact: true, suffix: '+' },
              { label: 'Games Played', value: stats.totalPlays, compact: true, suffix: '+' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-3 text-center">
                <dd className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  <AnimatedCounter value={s.value} compact={s.compact} suffix={s.suffix} />
                </dd>
                <dt className="mt-0.5 text-[11px] uppercase tracking-wide text-text-muted">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* spotlight slider */}
        <div className="relative">
          <div className="relative mx-auto max-w-md">
            <AnimatePresence mode="wait">
              {game && (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-neon"
                >
                  <div className="relative">
                    <GameThumb game={game} iconSize={96} className="aspect-[16/10]" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge variant="hot">
                        <Flame className="h-3 w-3" /> Trending
                      </Badge>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-lg font-bold text-white">{game.title}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <RatingStars value={game.rating} size={13} showValue />
                          <span className="text-xs text-white/70">· {formatCompact(game.plays)} plays</span>
                        </div>
                      </div>
                      <Link href={`/games/${game.slug}`} className="btn-neon shrink-0 px-4 py-2 text-sm">
                        <Play className="h-4 w-4 fill-current" /> Play
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* dots */}
            <div className="mt-4 flex justify-center gap-2">
              {spotlight.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  aria-label={`Show ${g.title}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? 'w-7 bg-gradient-to-r from-primary to-secondary' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
