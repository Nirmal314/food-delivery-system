"use server";

import { db } from "@/lib/db";

export const getCartByUserId = async (userId: string) => {
  try {
    const cart = await db.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    return { cart };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
};
