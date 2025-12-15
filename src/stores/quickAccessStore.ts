import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuickAccessItem {
  id: string;
  name: string;
  url: string;
  icon?: string;
  order: number;
}

interface QuickAccessStore {
  items: QuickAccessItem[];
  addItem: (item: Omit<QuickAccessItem, 'id' | 'order'>) => void;
  updateItem: (id: string, updates: Partial<QuickAccessItem>) => void;
  removeItem: (id: string) => void;
  reorderItems: (items: QuickAccessItem[]) => void;
  clearAll: () => void;
}

export const useQuickAccessStore = create<QuickAccessStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: '1',
          name: 'GitHub',
          url: 'github.com',
          order: 0,
        },
        {
          id: '2',
          name: 'Stack Overflow',
          url: 'stackoverflow.com',
          order: 1,
        },
        {
          id: '3',
          name: 'YouTube',
          url: 'youtube.com',
          order: 2,
        },
        {
          id: '4',
          name: 'Twitter',
          url: 'twitter.com',
          order: 3,
        },
      ],
      addItem: (newItem) => {
        const item: QuickAccessItem = {
          ...newItem,
          id: Date.now().toString(),
          order: get().items.length,
        };
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      reorderItems: (items) => {
        set({ items });
      },
      clearAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'quick-access-storage',
    }
  )
);