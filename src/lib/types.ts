/**
 * Shared domain types for GameVerse.
 * These mirror the MongoDB collections documented in /server/models and docs/ARCHITECTURE.md
 * so the mock data layer can be swapped for a real API without changing the UI.
 */

export type CategorySlug =
  | 'racing'
  | 'bike-racing'
  | 'car-racing'
  | 'shooting'
  | 'action'
  | 'fighting'
  | 'sports'
  | 'football'
  | 'cricket'
  | 'puzzle'
  | 'arcade'
  | 'adventure'
  | 'multiplayer'
  | 'strategy'
  | 'horror'
  | 'simulation'
  | 'casual'
  | 'kids';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  /** lucide-react icon name */
  icon: string;
  /** tailwind gradient utility classes used for thumbnails/headers */
  gradient: string;
  description: string;
}

export type Orientation = 'landscape' | 'portrait' | 'both';

export interface Game {
  id: string;
  slug: string;
  title: string;
  /** short tagline for cards */
  tagline: string;
  description: string;
  instructions: string;
  controls: { keys: string; action: string }[];
  /** absolute or relative URL loaded inside the play iframe */
  embedUrl: string;
  categories: CategorySlug[];
  tags: string[];
  developer: string;
  orientation: Orientation;
  /** lucide-react icon used on the generated gradient thumbnail */
  icon: string;
  gradient: string;
  rating: number; // 0..5
  ratingCount: number;
  plays: number;
  likes: number;
  /** ISO date */
  releasedAt: string;
  featured: boolean;
  trending: boolean;
  /** trending velocity 0..100 for the live popularity bar */
  trendingScore: number;
}

export interface Player {
  id: string;
  username: string;
  avatarGradient: string;
  level: number;
  score: number;
  wins: number;
  country: string;
  badges: string[];
}

export interface Review {
  id: string;
  gameSlug: string;
  author: string;
  avatarGradient: string;
  rating: number;
  body: string;
  createdAt: string;
  helpful: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Update' | 'Release' | 'Esports' | 'Guide';
  gradient: string;
  publishedAt: string;
  readMinutes: number;
}
