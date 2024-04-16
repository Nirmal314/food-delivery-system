"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const cancel = async (oid: string) => {
  try {
    await db.order.update({
      where: {
        id: oid,
      },
      data: {
        status: "CANCELLED",
      },
    });

    revalidatePath("/orders");
    revalidatePath("/yourorders");
    revalidatePath("/yourorders/[oid]/page", "page");

    return { success: "Order rejected" };
  } catch (e) {
    return { error: "Something went wrong" };
  }
};
