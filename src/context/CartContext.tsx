import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { safeSessionStorage, safeLocalStorage } from '../utils/storage';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity: number, variant?: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalCents: number;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'barbearia_drinks_session_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      // Remove any previous persistent localStorage to avoid lingering orders
      safeLocalStorage.removeItem('barbearia_drinks_cart_v1');

      // Use safeSessionStorage so cart is wiped when biosite closes
      const saved = safeSessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Validate against authoritative catalog prices
          return parsed.map((item: CartItem) => {
            const authoritative = PRODUCTS.find((p) => p.id === item.productId);
            return authoritative
              ? { ...item, priceInCents: authoritative.priceInCents }
              : item;
          });
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      if (items.length > 0) {
        safeSessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } else {
        safeSessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Product, rawQuantity: number, variant?: string) => {
    const quantity = Math.floor(Math.max(1, Math.min(99, Number(rawQuantity) || 1)));

    // Retrieve official price from catalog
    const authoritative = PRODUCTS.find((p) => p.id === product.id) || product;
    const cartItemId = variant ? `${product.id}-${variant}` : product.id;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newTotalQty = Math.min(99, updated[existingIndex].quantity + quantity);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newTotalQty,
          priceInCents: authoritative.priceInCents,
        };
        setLastAddedItem(updated[existingIndex]);
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          priceInCents: authoritative.priceInCents,
          quantity,
          variant,
          image: product.image,
        };
        setLastAddedItem(newItem);
        return [...prev, newItem];
      }
    });
  };

  const updateQuantity = (cartItemId: string, rawQuantity: number) => {
    const newQuantity = Math.floor(Number(rawQuantity) || 0);
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const safeQuantity = Math.min(99, newQuantity);
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    try {
      safeSessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalCents = items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalCents,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
