"use server";

import { db } from "@/lib/db";

export const getCartItemsById = async (id: string) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: id,
    },
  });

  return { cartItems };
};
