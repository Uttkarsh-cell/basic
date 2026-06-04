import type { Metadata } from 'next';
import { GamesExplorer } from '@/components/game/GamesExplorer';
import { AdSlot } from '@/components/ads/AdSlot';
import { getAllGames, getCategories } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'All Games — Browse & Play Free Online Games',
  description:
    'Browse the full GameVerse catalog. Filter by category, sort by trending, newest or top rated, and play instantly in your browser.',
  alternates: { canonical: '/games' },
};

type Sort = 'featured' | 'trending' | 'new' | 'top' | 'popular';
const VALID_SORTS: Sort[] = ['featured', 'trending', 'new', 'top', 'popular'];

export default function GamesPage({ searchParams }: { searchParams: { sort?: string } }) {
  const sort = (VALID_SORTS.includes(searchParams.sort as Sort) ? searchParams.sort : 'popular') as Sort;
  const games = getAllGames();
  const categories = getCategories();

  return (
    <div className="container-page section-padding py-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          All <span className="text-gradient">Games</span>
        </h1>
        <p className="mt-2 text-text-muted">Explore the full library — {games.length} games and counting.</p>
      </header>

      <AdSlot format="leaderboard" slot="games-top" className="mb-6 !px-0" />

      <GamesExplorer games={games} categories={categories} initialSort={sort} />
    </div>
  );
}
