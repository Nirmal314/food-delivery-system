"use client";

import { Button } from "@/components/ui/button";
import Script from "next/script";
import React, { useTransition } from "react";
import { useCartContext } from "../CartContext";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/user/order/create";
import { verifyPayment } from "@/actions/user/payment/verify";

const CheckOutBtn = ({ cid }: { cid: string }) => {
  const { totalAmount, isDBUpdating } = useCartContext();
  const { data: session } = useSession();

  const checkout = async () => {
    const order = await createOrder(
      session?.user.id as string,
      cid,
      totalAmount
    );

    const options = {
      key: "rzp_test_tH0UJQrfDX5nm0",
      currency: order.currency,
      amount: totalAmount,
      name: "Nirmal Ambasana",
      description: "Test Transaction",
      order_id: order.id,
      theme: {
        color: "#16a34a",
      },
      overlay: false,
      handler: async (response: any) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        const resp = await verifyPayment(
          order.amount,
          session?.user.id!,
          cid,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        );

        console.log(resp);
      },
    };
    const rpay = new window.Razorpay(options);
    rpay.open();
  };
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button disabled={isDBUpdating} onClick={checkout}>
        Place Order
      </Button>
    </>
  );
};

export default CheckOutBtn;
