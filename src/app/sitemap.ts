import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllGames, getCategories } from '@/lib/queries';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/games`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/leaderboard`, lastModified: now, changeFrequency: 'hourly', priority: 0.6 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = getAllGames().map((g) => ({
    url: `${base}/games/${g.slug}`,
    lastModified: new Date(g.releasedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...gameRoutes];
}
