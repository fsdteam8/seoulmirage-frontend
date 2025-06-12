export interface CategoryItem {
  id: number;
  name: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export type CategoryData = {
  [categoryType: string]: CategoryItem[];
};
