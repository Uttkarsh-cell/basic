import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Gamepad2, Eye, Calendar, Keyboard, BookOpen, Building2 } from 'lucide-react';
import { GamePlayer } from '@/components/game/GamePlayer';
import { GameActions } from '@/components/game/GameActions';
import { GameCard } from '@/components/game/GameCard';
import { Reviews } from '@/components/game/Reviews';
import { RatingStars } from '@/components/ui/RatingStars';
import { Badge } from '@/components/ui/Badge';
import { AdSlot } from '@/components/ads/AdSlot';
import { GameJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getAllGames, getGameBySlug, getRelatedGames } from '@/lib/queries';
import { reviewsForGame } from '@/lib/data/reviews';
import { categoryBySlug } from '@/lib/data/categories';
import { siteConfig } from '@/lib/site';
import { formatCompact, formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getAllGames().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return { title: 'Game not found' };
  const title = `Play ${game.title} Online Free`;
  const url = `${siteConfig.url}/games/${game.slug}`;
  return {
    title,
    description: game.description,
    keywords: [game.title, ...game.tags, ...game.categories, 'play online', 'free game'],
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.title} — ${siteConfig.name}`,
      description: game.description,
      url,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: game.title, description: game.tagline },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();

  const related = getRelatedGames(game, 6);
  const recommended = getRelatedGames(game, 12).slice(6);
  const gameReviews = reviewsForGame(game.slug);

  return (
    <>
      <GameJsonLd game={game} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Games', url: `${siteConfig.url}/games` },
          { name: game.title, url: `${siteConfig.url}/games/${game.slug}` },
        ]}
      />

      <div className="container-page section-padding py-6">
        {/* breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-sm text-text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/games" className="hover:text-white">Games</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate text-white">{game.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* main */}
          <div className="min-w-0">
            <GamePlayer game={game} />

            {/* title row */}
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">{game.title}</h1>
                <p className="mt-1 text-text-muted">{game.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <RatingStars value={game.rating} size={14} showValue />
                    <span>({formatCompact(game.ratingCount)})</span>
                  </span>
                  <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {formatCompact(game.plays)} plays</span>
                  <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {game.developer}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(game.releasedAt)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <GameActions game={game} />
            </div>

            {/* categories + tags */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {game.categories.map((c) => {
                const cat = categoryBySlug.get(c);
                return (
                  <Link key={c} href={`/category/${c}`}>
                    <Badge variant="primary">{cat?.name ?? c}</Badge>
                  </Link>
                );
              })}
              {game.tags.map((t) => (
                <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="chip">#{t}</Link>
              ))}
            </div>

            {/* description / instructions / controls */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-surface p-5">
                <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-white">
                  <BookOpen className="h-5 w-5 text-secondary" /> About this game
                </h2>
                <p className="text-sm leading-relaxed text-text-muted">{game.description}</p>
                <h3 className="mb-1.5 mt-4 font-semibold text-white">How to play</h3>
                <p className="text-sm leading-relaxed text-text-muted">{game.instructions}</p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-surface p-5">
                <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-white">
                  <Keyboard className="h-5 w-5 text-accent" /> Controls
                </h2>
                <ul className="space-y-2">
                  {game.controls.map((c) => (
                    <li key={c.action} className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2">
                      <span className="text-sm text-text-muted">{c.action}</span>
                      <kbd className="rounded-md border border-white/15 bg-background px-2 py-1 text-xs font-semibold text-white">{c.keys}</kbd>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* related */}
            <div className="mt-10">
              <h2 className="mb-4 font-display text-xl font-bold text-white">Related Games</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {related.map((g, i) => (
                  <GameCard key={g.id} game={g} index={i} />
                ))}
              </div>
            </div>

            <AdSlot format="banner" slot="game-mid" className="mt-10 !px-0" />

            {/* reviews */}
            <div className="mt-10">
              <Reviews gameSlug={game.slug} initialReviews={gameReviews} />
            </div>
          </div>

          {/* sidebar */}
          <aside className="space-y-6">
            <AdSlot format="rectangle" slot="game-sidebar" className="!px-0" label="Sidebar Ad" />

            <div className="rounded-2xl border border-white/10 bg-surface p-4">
              <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-white">
                <Gamepad2 className="h-4 w-4 text-secondary" /> Recommended
              </h2>
              <ul className="space-y-3">
                {recommended.map((g) => (
                  <li key={g.id}>
                    <Link href={`/games/${g.slug}`} className="group flex items-center gap-3">
                      <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        {/* reuse card thumb via small grid card would be heavy; simple thumb */}
                        <span className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${g.gradient}`}>
                          <span className="text-xs font-bold text-white">{g.title.slice(0, 1)}</span>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white group-hover:text-secondary">{g.title}</span>
                        <span className="flex items-center gap-1"><RatingStars value={g.rating} size={10} /></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
