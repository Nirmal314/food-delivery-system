"use server";

import * as z from "zod";
import { SignupSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  // ? get validated values

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 15);

  try {
    const existingUser = await getUserByEmail(email);

    // ! if user [email] does not exist, create user

    if (existingUser) return { error: "Email already in use." };

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (e) {
    return { error: e };
  }

  // TODO: send verification mail

  return { success: "Your account has been created." };
};
