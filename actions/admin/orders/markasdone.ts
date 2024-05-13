"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const markAsDone = async (oid: string) => {
  try {
    await db.order.update({
      where: {
        id: oid,
      },
      data: {
        status: OrderStatus.COMPLETED,
      },
    });
    revalidatePath("/dashboard", "page");
    console.log("done!");
    return { success: "Order completed" };
  } catch (e) {
    return { error: "Something went wrong" };
  }
};
