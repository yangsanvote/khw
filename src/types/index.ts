export interface Promise {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  region: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: any;
}

export interface Region {
  id: string;
  name: string;
  icon?: any;
} 