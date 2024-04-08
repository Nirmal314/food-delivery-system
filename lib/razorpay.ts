import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: "rzp_test_tH0UJQrfDX5nm0",
  key_secret: process.env.RAZORPAY_SECRET,
});
