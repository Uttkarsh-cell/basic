/** Central site configuration used across SEO, layout and footer. */
export const siteConfig = {
  name: 'GameVerse',
  tagline: 'Play Free Online Games Instantly',
  description:
    'GameVerse is the ultimate browser gaming portal. Play hundreds of free online games instantly on mobile, tablet and desktop — no downloads, no installs. Racing, action, puzzle, multiplayer and more.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gameverse.example.com',
  keywords: [
    'online games',
    'free games',
    'browser games',
    'html5 games',
    'play games online',
    'no download games',
    'racing games',
    'action games',
    'puzzle games',
    'multiplayer games',
    'GameVerse',
  ],
  twitter: '@gameverse',
  ogImage: '/og-image.png',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'All Games', href: '/games' },
    { label: 'New', href: '/games?sort=new' },
    { label: 'Trending', href: '/games?sort=trending' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ],
  social: {
    twitter: 'https://twitter.com/gameverse',
    discord: 'https://discord.gg/gameverse',
    youtube: 'https://youtube.com/@gameverse',
    instagram: 'https://instagram.com/gameverse',
  },
} as const;

export type SiteConfig = typeof siteConfig;
