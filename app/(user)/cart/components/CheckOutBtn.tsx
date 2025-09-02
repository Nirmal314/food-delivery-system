"use client";

import { Button } from "@/components/ui/button";
import Script from "next/script";
import React from "react";
import { useCartContext } from "../CartContext";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/user/order/create";
import { verifyPayment } from "@/actions/user/payment/verify";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { socket } from "@/app/socket";

const CheckOutBtn = () => {
  const { cartId, total, isDBUpdating, setIsDBUpdating } = useCartContext();
  const { data: session } = useSession();
  const router = useRouter();

  const checkout = async () => {
    setIsDBUpdating(true);

    const order = await createOrder(session?.user.id as string, cartId, total);

    const options = {
      key: "rzp_test_3NfiOVqPAMxOTX",
      currency: order.currency,
      amount: total,
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
          cartId,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        );

        if (resp.success) {
          router.push("/yourorders");

          if (resp.order) socket.emit("new-order", resp.order);
          else socket.emit("new-order", { order: "You have a new order!" });
        } else {
          toast.error(resp.error as string);
        }
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
      <Button
        disabled={isDBUpdating}
        onClick={() => {
          toast.promise(
            new Promise((resolve, reject) => {
              checkout()
                .then(() => {
                  resolve("Payment processed successfully!");
                  setIsDBUpdating(false);
                })
                .catch((error) => {
                  reject(error);
                  setIsDBUpdating(false);
                });
            }),
            {
              loading: "Processing payment options...",
              success: "Payment processed successfully!",
              error: "Payment processing failed. Please try again.",
            }
          );
        }}
      >
        Place Order
      </Button>
    </>
  );
};

export default CheckOutBtn;
