"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Knock } from "@knocklabs/node";
import { revalidatePath } from "next/cache";

export const cancel = async (oid: string) => {
  const session = await auth();
  try {
    const { userId, totalAmount } = await db.order.update({
      where: {
        id: oid,
      },
      data: {
        status: "CANCELLED",
      },
    });

    revalidatePath("/orders");
    // revalidatePath("/yourorders");
    // revalidatePath("/yourorders/[oid]/page", "page");

    const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

    await knockClient.notify("order-cancelled", {
      actor: session?.user.id,
      recipients: [userId],
      data: {
        amount: totalAmount as number,
      },
    });

    return { success: "Order cancelled" };
  } catch (e) {
    return { error: "Something went wrong" };
  }
};
