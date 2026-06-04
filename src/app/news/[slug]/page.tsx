import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { news } from '@/lib/data/news';
import { cn, formatDate } from '@/lib/utils';

const variant = { Update: 'primary', Release: 'secondary', Esports: 'accent', Guide: 'hot' } as const;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = news.find((n) => n.slug === params.slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: 'article' },
  };
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = news.find((n) => n.slug === params.slug);
  if (!article) notFound();
  const more = news.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <article className="container-page section-padding py-8">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-4 flex items-center gap-1.5 text-sm text-text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/news" className="hover:text-white">News</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate text-white">{article.title}</span>
        </nav>

        <Badge variant={variant[article.category]}>{article.category}</Badge>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">{article.title}</h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(article.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readMinutes} min read</span>
        </div>

        <div className={cn('mt-6 aspect-[16/7] rounded-2xl bg-gradient-to-br', article.gradient)} />

        <div className="mt-8 space-y-5 text-base leading-relaxed text-text-muted">
          <p className="text-lg text-white">{article.excerpt}</p>
          <p>
            This is sample article content for the GameVerse demo. In production, article bodies would
            come from a CMS or the database. Wire the news collection to your backend to publish real
            posts with rich content, images and embeds.
          </p>
          <p>
            GameVerse keeps players informed about new releases, seasonal events, tournaments and tips
            to climb the leaderboards. Subscribe and check back often for the latest.
          </p>
        </div>
      </div>

      {more.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl border-t border-white/10 pt-8">
          <h2 className="mb-4 font-display text-xl font-bold text-white">More from GameVerse</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {more.map((m) => (
              <Link key={m.id} href={`/news/${m.slug}`} className="group rounded-xl border border-white/10 bg-surface p-4 transition-colors hover:border-white/20">
                <Badge variant={variant[m.category]}>{m.category}</Badge>
                <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-secondary">{m.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
