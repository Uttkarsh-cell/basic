'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect, useState } from 'react';

export type AuthProvider = 'google' | 'guest' | null;

export interface UserProfile {
  name: string;
  provider: AuthProvider;
  avatarGradient: string;
}

interface UserState {
  profile: UserProfile | null;
  favorites: string[]; // game slugs
  likes: string[]; // game slugs
  history: string[]; // recently played slugs (most recent first)

  loginGuest: () => void;
  loginGoogleMock: () => void;
  logout: () => void;

  toggleFavorite: (slug: string) => void;
  toggleLike: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  isLiked: (slug: string) => boolean;
  recordPlay: (slug: string) => void;
}

const GRADIENTS = [
  'from-primary to-secondary',
  'from-accent to-emerald-600',
  'from-pink-500 to-rose-600',
  'from-orange-500 to-red-600',
];

function randomGradient() {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      favorites: [],
      likes: [],
      history: [],

      loginGuest: () =>
        set({ profile: { name: `Guest${Math.floor(Math.random() * 9000 + 1000)}`, provider: 'guest', avatarGradient: randomGradient() } }),
      // NOTE: replace with real Firebase Auth in production (see docs/ARCHITECTURE.md).
      loginGoogleMock: () =>
        set({ profile: { name: 'Player One', provider: 'google', avatarGradient: 'from-primary to-secondary' } }),
      logout: () => set({ profile: null }),

      toggleFavorite: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug)
            ? s.favorites.filter((x) => x !== slug)
            : [slug, ...s.favorites],
        })),
      toggleLike: (slug) =>
        set((s) => ({
          likes: s.likes.includes(slug) ? s.likes.filter((x) => x !== slug) : [slug, ...s.likes],
        })),
      isFavorite: (slug) => get().favorites.includes(slug),
      isLiked: (slug) => get().likes.includes(slug),
      recordPlay: (slug) =>
        set((s) => ({ history: [slug, ...s.history.filter((x) => x !== slug)].slice(0, 30) })),
    }),
    {
      name: 'gameverse-user',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ profile: s.profile, favorites: s.favorites, likes: s.likes, history: s.history }),
    },
  ),
);

/**
 * Guards against hydration mismatches: persisted state is only available after
 * the client mounts. Use this before rendering store-derived UI.
 */
export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
