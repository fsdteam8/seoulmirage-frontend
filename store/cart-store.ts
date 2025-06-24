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
export interface Media {
  id: number;
  product_id: number;
  file_path: string;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
}

export interface Product {
  id: number;
  arrival_status?:string
  name: string;
  description: string;
  image: string | null; // ✅ not optional
  price: string;
  category_id: number;
  status: "active" | "inactive";
  cost_price: string;
  stock_quantity: number;
  sales: number;
  // orders_count: number;
  created_at: string;
  updated_at: string;
  category: Category;
  media: Media[];
  images?: string[]; // if you're adding this for cart/store compatibility
  reviews_avg_rating?: number | string;
  reviews_count?:number | string
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
