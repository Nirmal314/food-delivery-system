"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Knock } from "@knocklabs/node";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const markAsDone = async (oid: string) => {
  const session = await auth();
  try {
    const { userId, totalAmount } = await db.order.update({
      where: {
        id: oid,
      },
      data: {
        status: OrderStatus.COMPLETED,
      },
    });
    revalidatePath("/dashboard");

    const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

    await knockClient.notify("order-accepted", {
      actor: session?.user.id,
      recipients: [userId],
      data: {
        amount: totalAmount as number,
      },
    });

    return { success: "Order completed" };
  } catch (e) {
    return { error: "Something went wrong" };
  }
};
