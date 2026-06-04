import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { GamesExplorer } from '@/components/game/GamesExplorer';
import { Icon } from '@/components/ui/Icon';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getAllGames, getCategories, getCategoryBySlug, getGamesByCategory } from '@/lib/queries';
import { siteConfig } from '@/lib/site';
import type { CategorySlug } from '@/lib/types';

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: 'Category not found' };
  return {
    title: `${category.name} Games — Play Free Online`,
    description: `${category.description} Play the best free ${category.name.toLowerCase()} games online at GameVerse — instant play, no downloads.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const count = getGamesByCategory(category.slug as CategorySlug).length;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: category.name, url: `${siteConfig.url}/category/${category.slug}` },
        ]}
      />

      {/* category hero */}
      <section className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${category.gradient}`}>
        <div className="absolute inset-0 bg-background/70" />
        <div className="container-page section-padding relative py-10">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{category.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-neon`}>
              <Icon name={category.icon} className="h-8 w-8" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{category.name} Games</h1>
              <p className="mt-1 max-w-xl text-sm text-white/80">{category.description}</p>
              <p className="mt-1 text-xs text-white/60">{count} games available</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page section-padding py-8">
        <GamesExplorer
          games={getAllGames()}
          categories={getCategories()}
          initialCategory={category.slug as CategorySlug}
          initialSort="popular"
        />
      </div>
    </>
  );
}
