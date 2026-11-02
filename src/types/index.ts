export type DrinkAnimationType =
  | 'guarana'
  | 'guaravita'
  | 'guaraviton'
  | 'h2oh'
  | 'monster'
  | 'powerade'
  | 'redbull'
  | 'aguacomgas'
  | 'cocacola'
  | 'fanta'
  | 'limoneto'
  | 'sprite'
  | 'tita';

export interface Product {
  id: string;
  name: string;
  price: number; // in BRL float (e.g. 6.00)
  priceInCents: number; // in integer cents (e.g. 600)
  image: string;
  videoUrl?: string;
  description: string;
  animationType: DrinkAnimationType;
  category: string;
  hasVariants?: boolean;
  variants?: string[];
  defaultVariant?: string;
  mais_vendido?: boolean;
}

export interface CartItem {
  cartItemId: string; // unique for product + variant combo
  productId: string;
  name: string;
  priceInCents: number;
  quantity: number;
  variant?: string;
  image: string;
}
