import {
  Flag,
  Bike,
  Car,
  Crosshair,
  Swords,
  Sword,
  Trophy,
  Goal,
  Target,
  Puzzle,
  Joystick,
  Map,
  Users,
  Brain,
  Ghost,
  Factory,
  Sparkles,
  Baby,
  Worm,
  Rocket,
  Gem,
  Castle,
  Footprints,
  LayoutGrid,
  Boxes,
  Gamepad2,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

/**
 * Maps the string icon names stored in our data layer to lucide-react
 * components. Unknown names fall back to a gamepad so a typo can never
 * break a build/render.
 */
const ICONS: Record<string, ComponentType<LucideProps>> = {
  Flag,
  Bike,
  Car,
  Crosshair,
  Swords,
  Sword,
  Trophy,
  Goal,
  Target,
  Puzzle,
  Joystick,
  Map,
  Users,
  Brain,
  Ghost,
  Factory,
  Sparkles,
  Baby,
  Worm,
  Rocket,
  Gem,
  Castle,
  Footprints,
  Gamepad2,
  // aliases / safe substitutes
  LayoutGrid,
  Grid3x3: LayoutGrid,
  Boxes,
  Grid2x2: Boxes,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = ICONS[name] ?? Gamepad2;
  return <Cmp {...props} />;
}
