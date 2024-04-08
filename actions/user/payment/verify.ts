"use server";

import { db } from "@/lib/db";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { deleteCartItemById } from "../cart/delete/delete-cart-item-by-id";
import { deleteCartByUserId } from "../cart/delete/delete-cart-by-userid";
import { deleteCartItemsByCartId } from "../cart/delete/delete-cart-items-by-cart-id";

export const verifyPayment = async (
  amount: number | string,
  userId: string,
  cartId: string,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
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

    await db.cart.update({
      where: {
        id: cartId,
      },
      data: {
        orderId: id,
        isActive: false,
      },
    });
    // await deleteCartItemsByCartId(cartId);

    redirect("/yourorders");
  } else {
    console.log("Invalid signature");
  }
};
