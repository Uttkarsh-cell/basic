'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { GameCard } from '@/components/game/GameCard';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { Category, CategorySlug, Game } from '@/lib/types';

type Sort = 'featured' | 'trending' | 'new' | 'top' | 'popular';

const SORTS: { value: Sort; label: string }[] = [
  { value: 'popular', label: 'Most Played' },
  { value: 'trending', label: 'Trending' },
  { value: 'new', label: 'Newest' },
  { value: 'top', label: 'Top Rated' },
  { value: 'featured', label: 'Featured' },
];

function sortGames(list: Game[], sort: Sort): Game[] {
  const arr = [...list];
  switch (sort) {
    case 'new':
      return arr.sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt));
    case 'top':
      return arr.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
    case 'trending':
      return arr.sort((a, b) => b.trendingScore - a.trendingScore);
    case 'featured':
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || b.plays - a.plays);
    case 'popular':
    default:
      return arr.sort((a, b) => b.plays - a.plays);
  }
}

export function GamesExplorer({
  games,
  categories,
  initialSort = 'popular',
  initialCategory,
}: {
  games: Game[];
  categories: Category[];
  initialSort?: Sort;
  initialCategory?: CategorySlug;
}) {
  const [sort, setSort] = useState<Sort>(initialSort);
  const [activeCat, setActiveCat] = useState<CategorySlug | 'all'>(initialCategory ?? 'all');
  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    let list = games;
    if (activeCat !== 'all') list = list.filter((g) => g.categories.includes(activeCat));
    if (term.trim()) {
      const q = term.trim().toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.tags.some((t) => t.includes(q)) ||
          g.tagline.toLowerCase().includes(q),
      );
    }
    return sortGames(list, sort);
  }, [games, activeCat, term, sort]);

  return (
    <div>
      {/* controls */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Filter games..."
              className="w-full rounded-xl border border-white/10 bg-surface/70 py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-text-muted/70 outline-none focus:border-primary/60"
            />
            {term && (
              <button type="button" onClick={() => setTerm('')} aria-label="Clear" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-text-muted hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface/70 px-3 py-2.5 text-sm">
            <SlidersHorizontal className="h-4 w-4 text-text-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent text-white outline-none [&>option]:bg-surface"
              aria-label="Sort games"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* category chips */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => setActiveCat('all')}
            className={cn('shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors', activeCat === 'all' ? 'border-primary bg-primary/20 text-white' : 'border-white/10 bg-white/5 text-text-muted hover:text-white')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCat(c.slug)}
              className={cn('flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors', activeCat === c.slug ? 'border-primary bg-primary/20 text-white' : 'border-white/10 bg-white/5 text-text-muted hover:text-white')}
            >
              <Icon name={c.icon} className="h-3.5 w-3.5" /> {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-text-muted">
        Showing <span className="font-semibold text-white">{filtered.length}</span> game{filtered.length !== 1 && 's'}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-surface p-12 text-center text-text-muted">
          No games match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((g, i) => (
            <GameCard key={g.id} game={g} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
