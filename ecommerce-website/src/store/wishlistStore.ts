import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productSku: string) => void;
  isInWishlist: (productSku: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const isAlreadyInWishlist = get().items.some(item => item.sku === product.sku);
        
        if (!isAlreadyInWishlist) {
          set(state => ({
            items: [...state.items, product]
          }));
        }
      },

      removeItem: (productSku: string) => {
        set(state => ({
          items: state.items.filter(item => item.sku !== productSku)
        }));
      },

      isInWishlist: (productSku: string) => {
        return get().items.some(item => item.sku === productSku);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);