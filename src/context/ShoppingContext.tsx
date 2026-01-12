import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Cookie, Order, ShippingInfo } from "../types";

interface ShoppingContextType {
  cart: CartItem[];
  addToCart: (cookie: Cookie) => void;
  removeFromCart: (cookieId: string) => void;
  updateQuantity: (cookieId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  createOrder: (shippingInfo: ShippingInfo) => Order;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

export const useShoppingCart = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShoppingCart must be used within a ShoppingProvider");
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

export const ShoppingProvider = ({ children }: ShoppingProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (cookie: Cookie) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.cookie.id === cookie.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.cookie.id === cookie.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { cookie, quantity: 1 }];
    });
  };

  const removeFromCart = (cookieId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cookie.id !== cookieId)
    );
  };

  const updateQuantity = (cookieId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cookieId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cookie.id === cookieId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.cookie.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (shippingInfo: ShippingInfo): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      shippingInfo,
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: "completed",
    };
    clearCart();
    return order;
  };

  const value: ShoppingContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    createOrder,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};
