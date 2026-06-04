import { Icon } from '@/components/ui/Icon';
import { getCategories, getCategoryGameCounts } from '@/lib/queries';
import { cn } from '@/lib/utils';

export default function AdminCategoriesPage() {
  const categories = getCategories();
  const counts = getCategoryGameCounts();

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Categories</h1>
        <p className="text-sm text-text-muted">{categories.length} categories. Counts reflect games tagged with each genre.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.slug} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface p-4">
            <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg', c.gradient)}>
              <Icon name={c.icon} className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">{c.name}</p>
              <p className="truncate text-xs text-text-muted">/{c.slug}</p>
            </div>
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-secondary">{counts[c.slug] ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
