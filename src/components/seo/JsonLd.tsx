import { siteConfig } from '@/lib/site';
import type { Game } from '@/lib/types';

/** Renders a JSON-LD <script> for rich results / structured data. */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted (built from our own content).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon-512.png`,
        sameAs: Object.values(siteConfig.social),
      }}
    />
  );
}

export function GameJsonLd({ game }: { game: Game }) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: game.title,
        description: game.description,
        url: `${siteConfig.url}/games/${game.slug}`,
        applicationCategory: 'Game',
        operatingSystem: 'Web Browser',
        author: { '@type': 'Organization', name: game.developer },
        genre: game.categories,
        datePublished: game.releasedAt,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: game.rating,
          ratingCount: game.ratingCount,
          bestRating: 5,
          worstRating: 1,
        },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
