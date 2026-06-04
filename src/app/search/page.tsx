import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { SearchBar } from '@/components/layout/SearchBar';
import { GameGrid } from '@/components/game/GameGrid';
import { searchGames, getCategories } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Search Games',
  description: 'Search hundreds of free online games on GameVerse by title, tag or category.',
  robots: { index: false, follow: true },
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').trim();
  const { games, total } = searchGames(q, 60);
  const categories = getCategories().slice(0, 10);

  return (
    <div className="container-page section-padding py-8">
      <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Search</h1>

      <div className="mt-4 max-w-2xl">
        <SearchBar autoFocus />
      </div>

      {q === '' ? (
        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-text-muted">Popular categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="chip">{c.name}</Link>
            ))}
          </div>
        </div>
      ) : games.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <SearchX className="h-12 w-12 text-text-muted" />
          <h2 className="font-display text-lg font-bold text-white">No results for “{q}”</h2>
          <p className="max-w-sm text-sm text-text-muted">Try a different keyword, or browse all games.</p>
          <Link href="/games" className="btn-neon mt-2">Browse all games</Link>
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-4 text-sm text-text-muted">
            <span className="font-semibold text-white">{total}</span> result{total !== 1 && 's'} for “
            <span className="text-white">{q}</span>”
          </p>
          <GameGrid games={games} cols={5} />
        </div>
      )}
    </div>
  );
}
