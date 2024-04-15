"use server";

import { db } from "@/lib/db";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { deleteCartItemById } from "../cart/delete/delete-cart-item-by-id";
import { deleteCartByUserId } from "../cart/delete/delete-cart-by-userid";
import { deleteCartItemsByCartId } from "../cart/delete/delete-cart-items-by-cart-id";
import { Knock } from "@knocklabs/node";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const verifyPayment = async (
  amount: number | string,
  userId: string,
  cartId: string,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const session = await auth();
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      const { id } = await db.order.create({
        data: {
          userId,
          cartId,
          status: OrderStatus.PENDING,
          totalAmount: (amount as number) / 100,
        },
      });

      await db.payment.create({
        data: {
          orderId: id,
          amount: (amount as number) / 100,
          status: PaymentStatus.COMPLETED,
          razorpayPaymentId: razorpay_payment_id,
        },
      });

      const { restaurantId } = await db.cart.update({
        where: {
          id: cartId,
        },
        data: {
          orderId: id,
          isActive: false,
        },
      });

      const restaurantOwner = await db.user.findFirst({
        where: {
          restaurant: {
            id: restaurantId,
          },
        },
      });

      const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

      const res = await knockClient.notify("orders", {
        actor: session?.user.id,
        recipients: [restaurantOwner?.id!],
      });

      console.log(res);

      revalidatePath("/orders");

      return { success: "Order placed" };
    } catch (e) {
      console.log(e);
      return { error: e };
    }
  } else {
    console.log("Invalid signature");
    return { error: "Insecure payment" };
  }
};
