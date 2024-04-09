"use client";

import React, { useEffect } from "react";
import { useCartContext } from "../CartContext";

type Props = {
  cartId: string;
  totalAmount: number;
};

const InitContext = ({ cartId, totalAmount }: Props) => {
  const { setTotal, total, setCartId, cartId: cid } = useCartContext();

  useEffect(() => {
    setTotal(totalAmount);
    setCartId(cartId);
  }, []);

  return <></>;
};

export default InitContext;
