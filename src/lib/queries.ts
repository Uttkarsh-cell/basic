import { games, gameBySlug } from '@/lib/data/games';
import { categories, categoryBySlug } from '@/lib/data/categories';
import { players } from '@/lib/data/players';
import { news } from '@/lib/data/news';
import type { CategorySlug, Game } from '@/lib/types';

/**
 * Data access layer. The UI only imports from here, so replacing these
 * functions with `fetch('/api/...')` or MongoDB queries later is a drop-in
 * change. All functions are synchronous today and return cloned arrays.
 */

export function getAllGames(): Game[] {
  return [...games];
}

export function getGameBySlug(slug: string): Game | undefined {
  return gameBySlug.get(slug);
}

export function getFeaturedGames(limit = 8): Game[] {
  return games.filter((g) => g.featured).slice(0, limit);
}

export function getTrendingGames(limit = 8): Game[] {
  return [...games]
    .filter((g) => g.trending)
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);
}

export function getNewGames(limit = 8): Game[] {
  return [...games]
    .sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt))
    .slice(0, limit);
}

export function getTopRatedGames(limit = 8): Game[] {
  return [...games]
    .sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount)
    .slice(0, limit);
}

export function getMostPlayedGames(limit = 8): Game[] {
  return [...games].sort((a, b) => b.plays - a.plays).slice(0, limit);
}

export function getGamesByCategory(slug: CategorySlug): Game[] {
  return games.filter((g) => g.categories.includes(slug));
}

export function getRelatedGames(game: Game, limit = 6): Game[] {
  return games
    .filter((g) => g.slug !== game.slug)
    .map((g) => ({
      game: g,
      overlap: g.categories.filter((c) => game.categories.includes(c)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap || b.game.plays - a.game.plays)
    .slice(0, limit)
    .map((x) => x.game);
}

export interface SearchResult {
  games: Game[];
  total: number;
}

export function searchGames(query: string, limit = 50): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) return { games: [], total: 0 };
  const scored = games
    .map((g) => {
      const haystacks: [string, number][] = [
        [g.title.toLowerCase(), 5],
        [g.tags.join(' ').toLowerCase(), 3],
        [g.categories.join(' ').toLowerCase(), 2],
        [g.tagline.toLowerCase(), 1],
        [g.developer.toLowerCase(), 1],
      ];
      let score = 0;
      for (const [text, weight] of haystacks) {
        if (text.includes(q)) score += weight;
        if (text.startsWith(q)) score += weight; // boost prefix matches
      }
      return { g, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.g.plays - a.g.plays);

  return { games: scored.slice(0, limit).map((x) => x.g), total: scored.length };
}

export function getCategories() {
  return [...categories];
}

export function getCategoryBySlug(slug: string) {
  return categoryBySlug.get(slug as CategorySlug);
}

export function getCategoryGameCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const c of categories) counts[c.slug] = 0;
  for (const g of games) for (const c of g.categories) counts[c] = (counts[c] ?? 0) + 1;
  return counts;
}

export function getLeaderboard(limit = 10) {
  return [...players].sort((a, b) => b.score - a.score).slice(0, limit);
}

export function getNews(limit = 4) {
  return [...news].slice(0, limit);
}

/** Aggregate stats for animated counters on the homepage. */
export function getPlatformStats() {
  const totalPlays = games.reduce((sum, g) => sum + g.plays, 0);
  return {
    games: games.length,
    categories: categories.length,
    totalPlays,
    players: 1_240_000,
  };
}
