import type { Category } from '@/lib/types';

/**
 * Game categories. `icon` matches a lucide-react export; `gradient` drives
 * the neon thumbnail / header backgrounds.
 */
export const categories: Category[] = [
  { id: 'c01', slug: 'racing', name: 'Racing', icon: 'Flag', gradient: 'from-rose-500 to-orange-500', description: 'Burn rubber across neon tracks at breakneck speed.' },
  { id: 'c02', slug: 'bike-racing', name: 'Bike Racing', icon: 'Bike', gradient: 'from-amber-500 to-red-500', description: 'Wheelies, stunts and high-octane two-wheel mayhem.' },
  { id: 'c03', slug: 'car-racing', name: 'Car Racing', icon: 'Car', gradient: 'from-orange-500 to-yellow-500', description: 'Drift, boost and overtake in arcade racers.' },
  { id: 'c04', slug: 'shooting', name: 'Shooting', icon: 'Crosshair', gradient: 'from-red-500 to-fuchsia-600', description: 'Sharpen your aim across FPS and arcade shooters.' },
  { id: 'c05', slug: 'action', name: 'Action', icon: 'Swords', gradient: 'from-violet-500 to-fuchsia-500', description: 'Fast reflexes, big combos, non-stop adrenaline.' },
  { id: 'c06', slug: 'fighting', name: 'Fighting', icon: 'Sword', gradient: 'from-purple-500 to-pink-500', description: 'Combo your way to victory in 1v1 brawlers.' },
  { id: 'c07', slug: 'sports', name: 'Sports', icon: 'Trophy', gradient: 'from-emerald-500 to-teal-500', description: 'Compete in every sport, anytime, anywhere.' },
  { id: 'c08', slug: 'football', name: 'Football', icon: 'Goal', gradient: 'from-green-500 to-emerald-600', description: 'Score screamers and lift the trophy.' },
  { id: 'c09', slug: 'cricket', name: 'Cricket', icon: 'Target', gradient: 'from-lime-500 to-green-600', description: 'Smash sixes and bowl out the opposition.' },
  { id: 'c10', slug: 'puzzle', name: 'Puzzle', icon: 'Puzzle', gradient: 'from-sky-500 to-blue-600', description: 'Bend your brain with logic and match games.' },
  { id: 'c11', slug: 'arcade', name: 'Arcade', icon: 'Joystick', gradient: 'from-cyan-500 to-sky-600', description: 'Timeless one-more-go arcade classics.' },
  { id: 'c12', slug: 'adventure', name: 'Adventure', icon: 'Map', gradient: 'from-teal-500 to-cyan-600', description: 'Explore worlds, solve quests, find treasure.' },
  { id: 'c13', slug: 'multiplayer', name: 'Multiplayer', icon: 'Users', gradient: 'from-indigo-500 to-violet-600', description: 'Play live with friends and rivals worldwide.' },
  { id: 'c14', slug: 'strategy', name: 'Strategy', icon: 'Brain', gradient: 'from-blue-500 to-indigo-600', description: 'Outthink and outmaneuver your opponents.' },
  { id: 'c15', slug: 'horror', name: 'Horror', icon: 'Ghost', gradient: 'from-slate-600 to-purple-700', description: 'Survive the scares if you dare.' },
  { id: 'c16', slug: 'simulation', name: 'Simulation', icon: 'Factory', gradient: 'from-stone-500 to-amber-600', description: 'Build, manage and simulate your own worlds.' },
  { id: 'c17', slug: 'casual', name: 'Casual', icon: 'Sparkles', gradient: 'from-pink-500 to-rose-500', description: 'Pick-up-and-play fun for every moment.' },
  { id: 'c18', slug: 'kids', name: 'Kids', icon: 'Baby', gradient: 'from-fuchsia-500 to-pink-500', description: 'Friendly, colorful games for younger players.' },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
