"use server";

import { db } from "@/lib/db";
import { deleteCartItemById } from "./delete-cart-item-by-id";

export const deleteCartItemsByCartId = async (cartId: string) => {
  try {
    const cart = await db.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: true,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    for (const cartItem of cart.items) {
      await deleteCartItemById(cartItem.id);
    }

    console.log("Cart items deleted successfully");
  } catch (error) {
    console.error("Error deleting cart items:", error);
    throw error;
  }
};
