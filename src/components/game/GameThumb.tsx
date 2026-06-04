import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { Game } from '@/lib/types';

/**
 * Generated neon thumbnail for a game. We render a deterministic gradient +
 * the game's icon instead of relying on external image files, so the grid
 * always looks intentional and never shows broken images. Swap the inner
 * markup for <Image> once you have real thumbnails.
 */
export function GameThumb({
  game,
  className,
  iconSize = 56,
}: {
  game: Game;
  className?: string;
  iconSize?: number;
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
        game.gradient,
        className,
      )}
      role="img"
      aria-label={game.title}
    >
      {/* dotted texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* glow blob */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      <Icon name={game.icon} className="relative z-10 text-white drop-shadow-lg" width={iconSize} height={iconSize} strokeWidth={1.5} />
      {/* bottom gradient for text legibility when overlaid */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}
