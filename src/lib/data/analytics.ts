import { games } from '@/lib/data/games';
import { seededRandom } from '@/lib/utils';

/**
 * Deterministic mock analytics for the admin dashboard. Values are derived
 * with a seeded PRNG so server and client render identically (no hydration
 * mismatch) and the numbers stay stable between reloads. Replace with real
 * aggregation queries (MongoDB $group / a warehouse) in production.
 */

export interface SeriesPoint {
  label: string;
  value: number;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getPlaysLast14Days(): SeriesPoint[] {
  return Array.from({ length: 14 }).map((_, i) => {
    const r = seededRandom(`plays-${i}`);
    const base = 38000 + Math.round(r * 26000);
    const weekendBoost = i % 7 >= 5 ? 9000 : 0;
    return { label: `${DAYS[i % 7]}`, value: base + weekendBoost };
  });
}

export function getRevenueByMonth(): SeriesPoint[] {
  return MONTHS.map((m, i) => {
    const r = seededRandom(`rev-${m}`);
    return { label: m, value: 4200 + Math.round(r * 9800) + i * 320 };
  });
}

export function getTrafficSources(): SeriesPoint[] {
  return [
    { label: 'Organic Search', value: 46 },
    { label: 'Direct', value: 24 },
    { label: 'Social', value: 18 },
    { label: 'Referral', value: 8 },
    { label: 'Ads', value: 4 },
  ];
}

export function getTopGamesByPlays(limit = 6) {
  return [...games].sort((a, b) => b.plays - a.plays).slice(0, limit);
}

export function getDashboardKpis() {
  const totalPlays = games.reduce((s, g) => s + g.plays, 0);
  const revenue = getRevenueByMonth().reduce((s, p) => s + p.value, 0);
  return {
    totalPlays,
    revenue,
    users: 1_240_000,
    activeNow: 12840,
    games: games.length,
    // % deltas vs previous period
    deltas: { plays: 12.4, revenue: 8.1, users: 5.7, activeNow: -2.3 },
  };
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'banned';
  joinedAt: string;
  gradient: string;
}

export const adminUsers: AdminUserRow[] = [
  { id: 'u1', name: 'NeonReaper', email: 'reaper@gameverse.gg', role: 'user', status: 'active', joinedAt: '2026-01-12', gradient: 'from-primary to-secondary' },
  { id: 'u2', name: 'PixelQueen', email: 'pixel@gameverse.gg', role: 'moderator', status: 'active', joinedAt: '2026-02-03', gradient: 'from-pink-500 to-rose-600' },
  { id: 'u3', name: 'DriftKingJP', email: 'drift@gameverse.gg', role: 'user', status: 'active', joinedAt: '2026-02-20', gradient: 'from-orange-500 to-red-600' },
  { id: 'u4', name: 'AdminOne', email: 'admin@gameverse.gg', role: 'admin', status: 'active', joinedAt: '2025-11-01', gradient: 'from-accent to-emerald-600' },
  { id: 'u5', name: 'ShadowByte', email: 'shadow@gameverse.gg', role: 'user', status: 'banned', joinedAt: '2026-03-08', gradient: 'from-slate-500 to-purple-700' },
  { id: 'u6', name: 'LunaStrike', email: 'luna@gameverse.gg', role: 'user', status: 'active', joinedAt: '2026-03-19', gradient: 'from-cyan-500 to-teal-600' },
];

export interface AdminAd {
  id: string;
  name: string;
  placement: 'header' | 'sidebar' | 'in-content' | 'footer' | 'rewarded';
  active: boolean;
  impressions: number;
  clicks: number;
}

export const adminAds: AdminAd[] = [
  { id: 'a1', name: 'Homepage Top Leaderboard', placement: 'header', active: true, impressions: 2840221, clicks: 31204 },
  { id: 'a2', name: 'Game Page Sidebar', placement: 'sidebar', active: true, impressions: 1980332, clicks: 24880 },
  { id: 'a3', name: 'Between Rows Banner', placement: 'in-content', active: true, impressions: 1520900, clicks: 18233 },
  { id: 'a4', name: 'Rewarded Video', placement: 'rewarded', active: false, impressions: 420110, clicks: 9920 },
  { id: 'a5', name: 'Footer Banner', placement: 'footer', active: true, impressions: 1100450, clicks: 8120 },
];

export interface AdminReport {
  id: string;
  type: 'Game' | 'Review' | 'User';
  target: string;
  reason: string;
  reporter: string;
  status: 'open' | 'resolved';
  createdAt: string;
}

export const adminReports: AdminReport[] = [
  { id: 'r1', type: 'Review', target: 'Turbo Drift X', reason: 'Spam / advertising', reporter: 'AceVortex', status: 'open', createdAt: '2026-06-03' },
  { id: 'r2', type: 'Game', target: 'Mansion of Dread', reason: 'Broken / not loading', reporter: 'MetaGhost', status: 'open', createdAt: '2026-06-02' },
  { id: 'r3', type: 'User', target: 'ShadowByte', reason: 'Harassment', reporter: 'PixelQueen', status: 'resolved', createdAt: '2026-05-29' },
  { id: 'r4', type: 'Review', target: 'Neon Snake', reason: 'Offensive language', reporter: 'RetroRey', status: 'open', createdAt: '2026-05-27' },
];
