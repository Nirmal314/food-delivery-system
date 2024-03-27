"use server";

import * as z from "zod";
import { GoogleLoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { cookies } from "next/headers";

export const googleLogin = async (
  values: z.infer<typeof GoogleLoginSchema>
) => {
  const validatedFields = GoogleLoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { address, contactNumber } = validatedFields.data;

  try {
    const currentCookies = cookies();
    currentCookies.set("address", address);
    currentCookies.set("contactNumber", contactNumber);

    await signIn("google", {
      redirectTo: "/",
    });

    return { success: "You have been logged in." };
    // ! won't work because of redirect
  } catch (e) {
    console.log(e);
    throw e; // ? it redirects
  }
};
