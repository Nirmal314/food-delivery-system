"use server";

import * as z from "zod";
import { SignupSchema } from "@/schemas";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  console.log(values);
};
