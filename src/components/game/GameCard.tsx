'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Flame, Sparkle } from 'lucide-react';
import { GameThumb } from '@/components/game/GameThumb';
import { Badge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';
import { formatCompact } from '@/lib/utils';
import type { Game } from '@/lib/types';

interface GameCardProps {
  game: Game;
  /** index used for staggered entrance animation */
  index?: number;
  /** larger hero-style card */
  size?: 'default' | 'large';
}

export function GameCard({ game, index = 0, size = 'default' }: GameCardProps) {
  const isNew = Date.now() - +new Date(game.releasedAt) < 1000 * 60 * 60 * 24 * 14;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link
        href={`/games/${game.slug}`}
        className="block overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-neon focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative">
          <GameThumb
            game={game}
            iconSize={size === 'large' ? 72 : 52}
            className={size === 'large' ? 'aspect-video' : 'aspect-[4/3]'}
          />

          {/* badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {game.trending && (
              <Badge variant="hot">
                <Flame className="h-3 w-3" /> Hot
              </Badge>
            )}
            {isNew && (
              <Badge variant="new">
                <Sparkle className="h-3 w-3" /> New
              </Badge>
            )}
          </div>

          {/* play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="btn-neon scale-90 transition-transform duration-300 group-hover:scale-100">
              <Play className="h-4 w-4 fill-current" /> Play
            </span>
          </div>
        </div>

        <div className="p-3">
          <h3 className="truncate font-display text-sm font-semibold text-white">{game.title}</h3>
          <div className="mt-1.5 flex items-center justify-between">
            <RatingStars value={game.rating} size={12} />
            <span className="flex items-center gap-1 text-[11px] font-medium text-text-muted">
              <Play className="h-3 w-3" />
              {formatCompact(game.plays)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
