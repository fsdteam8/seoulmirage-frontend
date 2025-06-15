export interface Item {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface CategorizedData {
  Collections: Item[];
  Skincare: Item[];
  Products: Item[];
}
