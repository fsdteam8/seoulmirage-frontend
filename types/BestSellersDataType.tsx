// bestSellingProducts.types.ts

export interface ApiResponse {
  success: boolean;
  data: PaginatedData;
  current_page: number;
  total_pages: number;
  per_page: number;
  total: number;
}

export interface PaginatedData {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string | null; // ✅ not optional
  price: string;
  category_id: number;
  status: "active" | "inactive";
  cost_price: string;
  stock_quantity: number;
  sales: number;
  orders_count: number;
  created_at: string;
  updated_at: string;
  category: Category;
  media: Media[];
  images?: string[]; // if you're adding this for cart/store compatibility
}

export interface Media {
  id: number;
  product_id: number;
  file_path: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface Category {
  id: number;
  name: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
