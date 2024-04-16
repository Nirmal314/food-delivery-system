"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const accept = async (oid: string) => {
  try {
    await db.order.update({
      where: {
        id: oid,
      },
      data: {
        status: "PROCESSING",
      },
    });
    revalidatePath("/orders");
    revalidatePath("/yourorders");
    revalidatePath("/yourorders/[oid]/page", "page");

    return { success: "Order accepted" };
  } catch (e) {
    return { error: "Something went wrong" };
  }
};
