import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET,
});
