import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShortlistState {
  shortlistedIds: string[];
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  clearShortlist: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      shortlistedIds: [],

      toggleShortlist: (id) => {
        const current = get().shortlistedIds;
        const exists = current.includes(id);
        set({
          shortlistedIds: exists
            ? current.filter((existingId) => existingId !== id)
            : [...current, id],
        });
      },

      isShortlisted: (id) => get().shortlistedIds.includes(id),

      clearShortlist: () => set({ shortlistedIds: [] }),
    }),
    {
      name: 'edufund-shortlist', // localStorage key
    }
  )
);