import { SectionHeader } from '@/components/ui/SectionHeader';
import { GameGrid } from '@/components/game/GameGrid';
import { GameCarousel } from '@/components/game/GameCarousel';
import type { Game } from '@/lib/types';

interface GameSectionProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  href?: string;
  games: Game[];
  layout?: 'grid' | 'carousel';
  cols?: 3 | 4 | 5 | 6;
}

export function GameSection({
  title,
  eyebrow,
  subtitle,
  href,
  games,
  layout = 'grid',
  cols = 4,
}: GameSectionProps) {
  if (games.length === 0) return null;
  return (
    <section className="container-page section-padding py-12">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} href={href} />
      {layout === 'carousel' ? <GameCarousel games={games} /> : <GameGrid games={games} cols={cols} />}
    </section>
  );
}
