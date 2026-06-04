import { NextResponse, type NextRequest } from 'next/server';
import {
  getAllGames,
  getFeaturedGames,
  getTrendingGames,
  getNewGames,
  getTopRatedGames,
  getMostPlayedGames,
  getGamesByCategory,
} from '@/lib/queries';
import type { CategorySlug, Game } from '@/lib/types';

/**
 * GET /api/games
 * Query params:
 *   sort     = featured | trending | new | top | popular
 *   category = <category-slug>
 *   limit    = number
 *
 * Today this serves the in-memory catalog. Swap the body for a MongoDB query
 * (see /server/models/Game.ts) without changing the response shape.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort');
  const category = searchParams.get('category') as CategorySlug | null;
  const limit = Number(searchParams.get('limit')) || 0;

  let games: Game[];
  switch (sort) {
    case 'featured':
      games = getFeaturedGames(limit || 12);
      break;
    case 'trending':
      games = getTrendingGames(limit || 12);
      break;
    case 'new':
      games = getNewGames(limit || 12);
      break;
    case 'top':
      games = getTopRatedGames(limit || 12);
      break;
    case 'popular':
      games = getMostPlayedGames(limit || 12);
      break;
    default:
      games = category ? getGamesByCategory(category) : getAllGames();
      if (limit) games = games.slice(0, limit);
  }

  return NextResponse.json(
    { data: games, count: games.length },
    { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } },
  );
}
