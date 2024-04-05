"use server";

import * as z from "zod";
import { GoogleLoginSchema } from "@/schemas";
import { auth, signIn } from "@/auth";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const googleLogin = async (
  values: z.infer<typeof GoogleLoginSchema>
) => {
  const validatedFields = GoogleLoginSchema.safeParse(values);
  const session = await auth();

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { address, contactNumber } = validatedFields.data;

  try {
    const res = await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        address,
        contactNumber,
      },
    });

    if (res) {
      return { success: "Contact details submitted." };
    } else {
      return { error: "Something went wrong. Try again" };
    }

    // ! won't work because of redirect
  } catch (e) {
    console.log(e);
    throw e; // ? it redirects
  }
};
