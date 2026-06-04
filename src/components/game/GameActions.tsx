'use client';

import { useState } from 'react';
import { Heart, Bookmark, Share2, Flag, Check } from 'lucide-react';
import { useUserStore, useHasHydrated } from '@/store/useUserStore';
import { cn, formatCompact } from '@/lib/utils';
import type { Game } from '@/lib/types';

export function GameActions({ game }: { game: Game }) {
  const hydrated = useHasHydrated();
  const favorites = useUserStore((s) => s.favorites);
  const likes = useUserStore((s) => s.likes);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const toggleLike = useUserStore((s) => s.toggleLike);

  const liked = hydrated && likes.includes(game.slug);
  const favorited = hydrated && favorites.includes(game.slug);

  const [copied, setCopied] = useState(false);
  const [reported, setReported] = useState(false);

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const data = { title: game.title, text: game.tagline, url };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => toggleLike(game.slug)}
        aria-pressed={liked}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all active:scale-95',
          liked
            ? 'border-rose-500/50 bg-rose-500/15 text-rose-300'
            : 'border-white/10 bg-white/5 text-text-muted hover:text-white',
        )}
      >
        <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
        {formatCompact(game.likes + (liked ? 1 : 0))}
      </button>

      <button
        type="button"
        onClick={() => toggleFavorite(game.slug)}
        aria-pressed={favorited}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all active:scale-95',
          favorited
            ? 'border-accent/50 bg-accent/15 text-accent'
            : 'border-white/10 bg-white/5 text-text-muted hover:text-white',
        )}
      >
        <Bookmark className={cn('h-4 w-4', favorited && 'fill-current')} />
        {favorited ? 'Saved' : 'Favorite'}
      </button>

      <button type="button" onClick={share} className="btn-ghost px-4 py-2.5 text-sm">
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Share2 className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Share'}
      </button>

      <button
        type="button"
        onClick={() => {
          setReported(true);
          setTimeout(() => setReported(false), 2000);
        }}
        className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-rose-300"
      >
        {reported ? <Check className="h-4 w-4 text-accent" /> : <Flag className="h-4 w-4" />}
        {reported ? 'Reported' : 'Report'}
      </button>
    </div>
  );
}
