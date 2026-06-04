import { GameCard } from '@/components/game/GameCard';
import { cn } from '@/lib/utils';
import type { Game } from '@/lib/types';

export function GameGrid({
  games,
  className,
  cols = 4,
}: {
  games: Game[];
  className?: string;
  cols?: 3 | 4 | 5 | 6;
}) {
  const colClass = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  }[cols];

  return (
    <div className={cn('grid gap-4', colClass, className)}>
      {games.map((game, i) => (
        <GameCard key={game.id} game={game} index={i} />
      ))}
    </div>
  );
}
