"use server";

import { db } from "@/lib/db";

export const deleteCartByUserId = async (userId: string) => {
  const cart = await db.cart.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

  if (cart) {
    await db.cart.delete({
      where: {
        id: cart?.id,
      },
    });
  }
};
