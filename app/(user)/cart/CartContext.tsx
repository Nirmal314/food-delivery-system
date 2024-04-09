"use client";

import { createContext, useState, useContext, useMemo } from "react";

type CartContextType = {
  total: number;
  setTotal: (amount: number) => void;
  isDBUpdating: boolean;
  setIsDBUpdating: (updating: boolean) => void;
  cartId: string;
  setCartId: (cartId: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState(0);
  const [isDBUpdating, setIsDBUpdating] = useState(false);
  const [cartId, setCartId] = useState("");

  const contextValue = useMemo(
    () => ({
      total,
      setTotal,
      isDBUpdating,
      setIsDBUpdating,
      cartId,
      setCartId,
    }),
    [total, isDBUpdating, cartId]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
