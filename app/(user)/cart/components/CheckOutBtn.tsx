"use client";

import { Button } from "@/components/ui/button";
import Script from "next/script";
import React from "react";

const CheckOutBtn = () => {
  const checkout = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      // amount: res.order.amount,
      // amount: res.order.amount,
      amount: 92000,

      currency: "INR",
      name: "Nirmal Ambasana",
      description: "Test Transaction",
      // order_id: res.order.id,
      // order_id: res.order.id,
      theme: {
        color: "#16a34a",
      },
      overlay: false,
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
      <Button onClick={checkout}>Place Order</Button>
    </>
  );
};

export default CheckOutBtn;
