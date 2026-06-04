import type { NewsArticle } from '@/lib/types';

export const news: NewsArticle[] = [
  {
    id: 'n01',
    slug: 'summer-neon-event-live',
    title: 'Summer Neon Event Goes Live with Daily Rewards',
    excerpt:
      'Log in every day this season to spin the Lucky Wheel, unlock exclusive avatars and climb the limited-time leaderboard.',
    category: 'Update',
    gradient: 'from-primary to-secondary',
    publishedAt: '2026-06-02',
    readMinutes: 3,
  },
  {
    id: 'n02',
    slug: 'battle-royale-io-season-3',
    title: 'Battle Royale.io Season 3: New Map & Ranked Mode',
    excerpt:
      'The biggest update yet brings a redesigned map, a competitive ranked ladder and three fresh weapon classes.',
    category: 'Release',
    gradient: 'from-indigo-500 to-violet-700',
    publishedAt: '2026-05-29',
    readMinutes: 4,
  },
  {
    id: 'n03',
    slug: 'gameverse-cup-finals',
    title: 'GameVerse Cup Finals: Watch the Top 8 Battle It Out',
    excerpt:
      'Our first community tournament reaches its climax this weekend with a prize pool and live spectating in the arena.',
    category: 'Esports',
    gradient: 'from-accent to-emerald-700',
    publishedAt: '2026-05-26',
    readMinutes: 5,
  },
  {
    id: 'n04',
    slug: 'mastering-turbo-drift-x',
    title: 'Guide: Mastering the Perfect Drift in Turbo Drift X',
    excerpt:
      'Pro tips on nitro chaining, racing lines and the braking technique that separates rookies from legends.',
    category: 'Guide',
    gradient: 'from-orange-500 to-rose-600',
    publishedAt: '2026-05-21',
    readMinutes: 6,
  },
];
