export interface SearchProduct {
    id: number;
    name: string;
    description: string;
    image: string | null;
    price: string;
    category_id: number;
    status: string;
    cost_price: string;
    stock_quantity: number;
    sales: number;
    created_at: string;
    updated_at: string;
    media: Array<{
      id: number;
      product_id: number;
      file_path: string;
      created_at: string;
      updated_at: string;
    }>;
    category: {
      id: number;
      name: string;
    };
  }
  
  export interface SearchResponse {
    success: boolean;
    data: {
      current_page: number;
      data: SearchProduct[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{
        url: string | null;
        label: string;
        active: boolean;
      }>;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
    current_page: number;
    total_pages: number;
    per_page: number;
    total: number;
  }
  