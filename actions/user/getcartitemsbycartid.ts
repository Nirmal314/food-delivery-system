"use server";

import { db } from "@/lib/db";

export const getCartItemsByCartId = async (id: string) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: id,
    },
  });

  return { cartItems };
};
