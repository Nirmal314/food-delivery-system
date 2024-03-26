"use server";

import { db } from "@/lib/db";

export const getCartItemCount = async (menuItemId: string) => {
  const cartItem = await db.cartItem.findFirst({
    where: {
      menuItemId: menuItemId,
    },
  });

  return { cartItem };
};
