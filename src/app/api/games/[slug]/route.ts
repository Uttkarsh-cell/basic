import { NextResponse } from 'next/server';
import { getGameBySlug, getRelatedGames } from '@/lib/queries';

/** GET /api/games/[slug] — single game + related titles. */
export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }
  return NextResponse.json(
    { data: game, related: getRelatedGames(game, 6) },
    { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' } },
  );
}
