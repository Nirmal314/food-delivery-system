"use server";

import { db } from "@/lib/db";

export const createCart = async (userId: string, restaurantId: string) => {
  try {
    await db.cart.create({
      data: {
        userId: userId!,
        restaurantId: restaurantId,
        items: {
          create: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
