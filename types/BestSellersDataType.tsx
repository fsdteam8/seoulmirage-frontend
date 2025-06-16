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
  image: string | null;
  price: string;
  category_id: number;
  status: 'active' | 'inactive';
  cost_price: string;
  stock_quantity: number;
  sales: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  orders_count: number;
  category: Category;
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
