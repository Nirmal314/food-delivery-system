"use client";

import React, { useEffect } from "react";
import { useCartContext } from "../CartContext";

type ContextProps = {
  cartId: string;
  totalAmount: number;
};

const InitContext = ({ cartId, totalAmount }: ContextProps) => {
  const { setTotal, setCartId } = useCartContext();

  useEffect(() => {
    setTotal(totalAmount);
    setCartId(cartId);
  }, []);

  return <></>;
};

export default InitContext;
