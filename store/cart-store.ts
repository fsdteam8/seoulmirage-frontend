import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MediaItem {
  id: number;
  product_id: number;
  file_path: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  category: Category;
  name: string;
  price: string; // original API returns as string
  cost_price?: string;
  stock_quantity?: number;
  rating?: number;
  reviews?: number;
  image: string | null;
  media: MediaItem[];
  images: string[]
  status?: "active" | "draft";
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: quantity > 0 ? quantity : 1,
                }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = parseFloat(item.price);
          return total + (isNaN(price) ? 0 : price * item.quantity);
        }, 0);
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
