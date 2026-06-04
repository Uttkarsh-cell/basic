import { NextResponse, type NextRequest } from 'next/server';
import { searchGames } from '@/lib/queries';

/** GET /api/search?q=...&limit=... — full-text-ish game search. */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const limit = Number(searchParams.get('limit')) || 20;
  const { games, total } = searchGames(q, limit);
  return NextResponse.json({ query: q, total, data: games });
}
