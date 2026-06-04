import { SectionHeader } from '@/components/ui/SectionHeader';
import { CategoryCard } from '@/components/home/CategoryCard';
import { getCategories, getCategoryGameCounts } from '@/lib/queries';

export function Categories() {
  const categories = getCategories();
  const counts = getCategoryGameCounts();

  return (
    <section className="container-page section-padding py-12">
      <SectionHeader
        eyebrow="Browse by genre"
        title="Game Categories"
        subtitle="Find exactly what you're in the mood for."
      />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
        {categories.map((c, i) => (
          <CategoryCard key={c.slug} category={c} count={counts[c.slug]} index={i} />
        ))}
      </div>
    </section>
  );
}
