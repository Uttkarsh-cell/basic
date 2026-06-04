import type { Review } from '@/lib/types';

/** Sample reviews keyed loosely by game slug; used on game detail pages. */
export const reviews: Review[] = [
  { id: 'r01', gameSlug: 'neon-snake', author: 'ArcadeAddict', avatarGradient: 'from-accent to-emerald-600', rating: 5, body: 'Perfect modern take on a classic. The neon trail effect is so satisfying and it runs buttery smooth on my phone.', createdAt: '2026-05-30', helpful: 142 },
  { id: 'r02', gameSlug: 'neon-snake', author: 'RetroRey', avatarGradient: 'from-primary to-secondary', rating: 4, body: 'Great pick-up-and-play game. Would love a hardcore mode with faster speed scaling.', createdAt: '2026-05-28', helpful: 64 },
  { id: 'r03', gameSlug: 'neon-breakout', author: 'BrickBuster', avatarGradient: 'from-secondary to-blue-600', rating: 5, body: 'Brings me right back to the arcade days. The particle effects when bricks shatter are chef\'s kiss.', createdAt: '2026-05-29', helpful: 88 },
  { id: 'r04', gameSlug: 'turbo-drift-x', author: 'DriftKingJP', avatarGradient: 'from-orange-500 to-red-600', rating: 5, body: 'Best browser racer I have played. Drifting feels weighty and the nitro chaining has real depth.', createdAt: '2026-05-25', helpful: 201 },
  { id: 'r05', gameSlug: 'turbo-drift-x', author: 'SpeedDemon', avatarGradient: 'from-amber-500 to-orange-600', rating: 4, body: 'Looks gorgeous and controls great. Could use a few more tracks but what is here is excellent.', createdAt: '2026-05-22', helpful: 73 },
];

export function reviewsForGame(slug: string): Review[] {
  const matches = reviews.filter((r) => r.gameSlug === slug);
  if (matches.length > 0) return matches;
  // Fallback generic reviews so every game page feels populated.
  return [
    { id: `${slug}-gr1`, gameSlug: slug, author: 'GamerPro99', avatarGradient: 'from-primary to-secondary', rating: 5, body: 'Loads instantly and plays great. Added it to my favorites!', createdAt: '2026-05-20', helpful: 31 },
    { id: `${slug}-gr2`, gameSlug: slug, author: 'CasualClicker', avatarGradient: 'from-accent to-emerald-600', rating: 4, body: 'Fun way to kill ten minutes. Smooth on mobile too.', createdAt: '2026-05-12', helpful: 18 },
  ];
}
