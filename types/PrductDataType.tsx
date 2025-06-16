export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string | null;
  price: string;
  category_id: number;
  status: "active" | "inactive";
  cost_price: string;
  stock_quantity: number;
  sales: number;
  created_at: string; // ISO 8601 string
  updated_at: string; // ISO 8601 string
  category: Category;
  media: Media[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  product_id: number;
  file_path: string;
  created_at: string;
  updated_at: string;
}
