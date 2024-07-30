"use server";

import { instance } from "@/lib/razorpay";
import shortid from "shortid";

export const createOrder = async (
  userId: string,
  cartId: string,
  amount: number
) => {
  const payment_capture = 1;
  const currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      userId,
      cartId,
    },
  };

  const order = await instance.orders.create(options);
  return order;
};
