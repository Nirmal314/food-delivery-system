"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCartItemById = async (id: string) => {
  const deletedItem = await db.cartItem.delete({
    where: {
      id: id,
    },
  });

  // revalidatePath("/cart");
  revalidatePath("/restaurants/[rid]/page.tsx", "page");
  return { success: "Item deleted." };
};
