"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateCartItemCount = async (
  menuItemId: string,
  amount: number
) => {
  const cartItem = await db.cartItem.findFirst({
    where: { menuItemId: menuItemId },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  const newQuantity = cartItem.quantity + Number(amount);

  const updatedCartItem = await db.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity: newQuantity },
  });
  revalidatePath("/cart");
  revalidatePath("/restaurants/[rid]/page.tsx", "page");

  return updatedCartItem;
};
