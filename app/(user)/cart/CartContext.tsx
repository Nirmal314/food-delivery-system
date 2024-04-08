"use client";

import { createContext, useState, useContext, useMemo } from "react";

type CartContextType = {
  totalAmount: number;
  setTotalAmount: (amount: number) => void;
  isDBUpdating: boolean;
  setIsDBUpdating: (updating: boolean) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDBUpdating, setIsDBUpdating] = useState(false);

  const contextValue = useMemo(
    () => ({
      totalAmount,
      setTotalAmount,
      isDBUpdating,
      setIsDBUpdating,
    }),
    [totalAmount, isDBUpdating]
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
