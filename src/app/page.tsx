import { Hero } from '@/components/home/Hero';
import { GameSection } from '@/components/home/GameSection';
import { TrendingGames } from '@/components/home/TrendingGames';
import { Categories } from '@/components/home/Categories';
import { LeaderboardPreview } from '@/components/home/LeaderboardPreview';
import { Community } from '@/components/home/Community';
import { NewsSection } from '@/components/home/NewsSection';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  getFeaturedGames,
  getTrendingGames,
  getNewGames,
  getTopRatedGames,
  getMostPlayedGames,
  getPlatformStats,
} from '@/lib/queries';

export default function HomePage() {
  const featured = getFeaturedGames(8);
  const trending = getTrendingGames(10);
  const newGames = getNewGames(8);
  const topRated = getTopRatedGames(8);
  const mostPlayed = getMostPlayedGames(10);
  const stats = getPlatformStats();

  return (
    <>
      <Hero spotlight={trending.slice(0, 5)} stats={stats} />

      {/* Header banner ad */}
      <AdSlot format="leaderboard" slot="home-top" className="py-4" />

      <GameSection
        eyebrow="Hand-picked"
        title="Featured Games"
        subtitle="Our editors' top picks, updated weekly."
        href="/games?sort=featured"
        games={featured}
        layout="grid"
      />

      <TrendingGames games={trending} />

      <Categories />

      <GameSection
        eyebrow="Fresh drops"
        title="New Games"
        subtitle="The latest titles to hit GameVerse."
        href="/games?sort=new"
        games={newGames}
        layout="carousel"
      />

      {/* In-content ad between rows */}
      <AdSlot format="banner" slot="home-mid" className="py-4" />

      <GameSection
        eyebrow="Player favorites"
        title="Top Rated"
        subtitle="The highest-rated games on the platform."
        href="/games?sort=top"
        games={topRated}
        layout="grid"
      />

      <LeaderboardPreview />

      <GameSection
        eyebrow="Most played"
        title="All-Time Popular"
        subtitle="The games everyone keeps coming back to."
        href="/games?sort=popular"
        games={mostPlayed}
        layout="carousel"
      />

      <Community />

      <NewsSection />
    </>
  );
}
