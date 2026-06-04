'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, Star, Flame, Check } from 'lucide-react';
import { cn, formatCompact } from '@/lib/utils';
import type { Category, CategorySlug, Game } from '@/lib/types';

const GRADIENTS = [
  'from-primary to-secondary',
  'from-accent to-emerald-600',
  'from-orange-500 to-rose-600',
  'from-fuchsia-500 to-purple-700',
  'from-sky-500 to-blue-700',
  'from-amber-500 to-red-600',
];

const ICONS = ['Gamepad2', 'Rocket', 'Car', 'Sword', 'Puzzle', 'Trophy', 'Ghost', 'Target'];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type Draft = Pick<Game, 'title' | 'tagline' | 'embedUrl' | 'gradient' | 'icon' | 'rating' | 'featured' | 'trending'> & {
  category: CategorySlug;
};

const emptyDraft = (categories: Category[]): Draft => ({
  title: '',
  tagline: '',
  embedUrl: 'about:blank',
  gradient: GRADIENTS[0],
  icon: ICONS[0],
  rating: 4.5,
  featured: false,
  trending: false,
  category: categories[0]?.slug ?? 'casual',
});

export function GamesManager({ initialGames, categories }: { initialGames: Game[]; categories: Category[] }) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [term, setTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Game | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft(categories));
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    return q ? games.filter((g) => g.title.toLowerCase().includes(q) || g.slug.includes(q)) : games;
  }, [games, term]);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const openAdd = () => {
    setEditing(null);
    setDraft(emptyDraft(categories));
    setModalOpen(true);
  };

  const openEdit = (g: Game) => {
    setEditing(g);
    setDraft({
      title: g.title,
      tagline: g.tagline,
      embedUrl: g.embedUrl,
      gradient: g.gradient,
      icon: g.icon,
      rating: g.rating,
      featured: g.featured,
      trending: g.trending,
      category: g.categories[0] ?? categories[0].slug,
    });
    setModalOpen(true);
  };

  const save = () => {
    if (!draft.title.trim()) return;
    if (editing) {
      setGames((prev) =>
        prev.map((g) =>
          g.id === editing.id
            ? { ...g, ...draft, slug: slugify(draft.title), categories: [draft.category, ...g.categories.filter((c) => c !== draft.category)] }
            : g,
        ),
      );
      flash('Game updated');
    } else {
      const slug = slugify(draft.title);
      const newGame: Game = {
        id: `new-${Date.now()}`,
        slug,
        title: draft.title,
        tagline: draft.tagline || 'A brand new game.',
        description: draft.tagline || 'A brand new game added via the admin panel.',
        instructions: 'Play and have fun!',
        controls: [{ keys: 'Mouse / Touch', action: 'Play' }],
        embedUrl: draft.embedUrl,
        categories: [draft.category],
        tags: [draft.category],
        developer: 'GameVerse Studio',
        orientation: 'both',
        icon: draft.icon,
        gradient: draft.gradient,
        rating: draft.rating,
        ratingCount: 0,
        plays: 0,
        likes: 0,
        releasedAt: new Date().toISOString().slice(0, 10),
        featured: draft.featured,
        trending: draft.trending,
        trendingScore: draft.trending ? 70 : 0,
      };
      setGames((prev) => [newGame, ...prev]);
      flash('Game created');
    }
    setModalOpen(false);
  };

  const remove = (g: Game) => {
    if (typeof window !== 'undefined' && !window.confirm(`Delete “${g.title}”? This can’t be undone.`)) return;
    setGames((prev) => prev.filter((x) => x.id !== g.id));
    flash('Game deleted');
  };

  const toggle = (g: Game, key: 'featured' | 'trending') =>
    setGames((prev) => prev.map((x) => (x.id === g.id ? { ...x, [key]: !x[key] } : x)));

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Games</h1>
          <p className="text-sm text-text-muted">{games.length} games in the catalog.</p>
        </div>
        <button type="button" onClick={openAdd} className="btn-neon">
          <Plus className="h-4 w-4" /> Add game
        </button>
      </header>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search games..."
          className="w-full rounded-xl border border-white/10 bg-surface/70 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-primary/60"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Game</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Flags</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Plays</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((g) => (
                <tr key={g.id} className="transition-colors hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white', g.gradient)}>
                        {g.title.slice(0, 1)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{g.title}</p>
                        <p className="truncate text-xs text-text-muted">/{g.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 capitalize text-text-muted md:table-cell">{g.categories[0]?.replace('-', ' ')}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggle(g, 'featured')}
                        title="Toggle featured"
                        className={cn('rounded-md p-1.5 transition-colors', g.featured ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-text-muted hover:text-white')}
                      >
                        <Star className={cn('h-3.5 w-3.5', g.featured && 'fill-current')} />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggle(g, 'trending')}
                        title="Toggle trending"
                        className={cn('rounded-md p-1.5 transition-colors', g.trending ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-text-muted hover:text-white')}
                      >
                        <Flame className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-text-muted sm:table-cell">{formatCompact(g.plays)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button type="button" onClick={() => openEdit(g)} aria-label="Edit" className="rounded-lg border border-white/10 bg-white/5 p-2 text-text-muted transition-colors hover:text-white">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => remove(g)} aria-label="Delete" className="rounded-lg border border-white/10 bg-white/5 p-2 text-text-muted transition-colors hover:text-rose-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-text-muted">No games match “{term}”.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-glass"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit game' : 'Add new game'}</h2>
                <button type="button" onClick={() => setModalOpen(false)} aria-label="Close" className="rounded-lg p-1.5 text-text-muted hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
                <FormRow label="Title">
                  <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="admin-field" placeholder="Game title" />
                </FormRow>
                <FormRow label="Tagline">
                  <input value={draft.tagline} onChange={(e) => setDraft({ ...draft, tagline: e.target.value })} className="admin-field" placeholder="Short one-liner" />
                </FormRow>
                <FormRow label="Embed URL">
                  <input value={draft.embedUrl} onChange={(e) => setDraft({ ...draft, embedUrl: e.target.value })} className="admin-field" placeholder="/games/your-game/index.html" />
                </FormRow>
                <div className="grid grid-cols-2 gap-4">
                  <FormRow label="Category">
                    <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as CategorySlug })} className="admin-field [&>option]:bg-surface">
                      {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </FormRow>
                  <FormRow label="Rating">
                    <input type="number" min={0} max={5} step={0.1} value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })} className="admin-field" />
                  </FormRow>
                </div>
                <FormRow label="Thumbnail gradient">
                  <div className="flex flex-wrap gap-2">
                    {GRADIENTS.map((g) => (
                      <button key={g} type="button" onClick={() => setDraft({ ...draft, gradient: g })} className={cn('h-9 w-9 rounded-lg bg-gradient-to-br ring-2 transition-all', g, draft.gradient === g ? 'ring-white' : 'ring-transparent')} aria-label={g} />
                    ))}
                  </div>
                </FormRow>
                <FormRow label="Icon">
                  <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className="admin-field [&>option]:bg-surface">
                    {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </FormRow>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} className="h-4 w-4 accent-primary" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input type="checkbox" checked={draft.trending} onChange={(e) => setDraft({ ...draft, trending: e.target.checked })} className="h-4 w-4 accent-primary" /> Trending
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-white/10 px-5 py-4">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost px-4 py-2 text-sm">Cancel</button>
                <button type="button" onClick={save} disabled={!draft.title.trim()} className="btn-neon px-4 py-2 text-sm">
                  {editing ? 'Save changes' : 'Create game'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-accent/30 bg-surface px-4 py-2.5 text-sm font-medium text-white shadow-glass"
          >
            <Check className="h-4 w-4 text-accent" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .admin-field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(13,17,23,0.6);
          padding: 0.55rem 0.8rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
        }
        .admin-field:focus { border-color: rgba(108,92,231,0.6); }
      `}</style>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text-muted">{label}</span>
      {children}
    </label>
  );
}
