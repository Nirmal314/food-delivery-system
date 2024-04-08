"use server";

import CartItem from "@/app/(user)/cart/components/CartItem";
import { db } from "@/lib/db";

export const getCartByUserId = async (userId: string) => {
  try {
    const cart = await db.cart.findFirst({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    return cart as CartItem | null;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
