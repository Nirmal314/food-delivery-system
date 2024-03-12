"use server";

import * as z from "zod";
import { AdminSignupSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";

export const adminSignup = async (
  values: z.infer<typeof AdminSignupSchema>
) => {
  const validatedFields = AdminSignupSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  // ? get validated values

  const { email, password, name, contactNumber } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 20);

  try {
    const existingUser = await getUserByEmail(email);

    // ! if user [email] does not exist, create user

    if (existingUser)
      return {
        error: "Another account already exists with the same email address.",
      };

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        contactNumber,
      },
    });
  } catch (e) {
    return { error: e };
  }

  // TODO: send verification mail

  return { success: "Your account has been created." };
};
