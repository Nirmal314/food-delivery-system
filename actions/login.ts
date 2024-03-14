"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials." };

        default:
          return { error: "Something went wrong." };
      }
    }

    throw e;
  }

  return { success: "You have been logged in." };
  // ! won't work because of redirect
};
