"use server";

import * as z from "zod";
import { AdminSignupSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";
import { Cuisine, UserRole } from "@prisma/client";

const getCuisine = (cuisineType: string) => {
  switch (cuisineType) {
    case "ITALIAN":
      return Cuisine.ITALIAN;
    case "NORTH_INDIAN":
      return Cuisine.NORTH_INDIAN;
    case "PUNJABI":
      return Cuisine.PUNJABI;
    case "SOUTH_INDIAN":
      return Cuisine.SOUTH_INDIAN;
    case "GUJARATI":
      return Cuisine.GUJARATI;
    case "CHINESE":
      return Cuisine.CHINESE;
  }
};

export const adminSignup = async (
  values: z.infer<typeof AdminSignupSchema>
) => {
  const validatedFields = AdminSignupSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  // ? get validated values

  const {
    email,
    password,
    name,
    contactNumber,
    restaurantName,
    cuisine,
    address,
    description,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 13);

  try {
    const existingUser = await getUserByEmail(email);

    // ! if user [email] does not exist, create user

    if (existingUser)
      return {
        error: "Another account already exists with the same email address.",
      };
    const createdUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.ADMIN,
        contactNumber,
      },
    });

    const createdRestaurant = await db.restaurant.create({
      data: {
        name: restaurantName,
        cuisine: Cuisine[getCuisine(cuisine)!],
        address,
        phone: contactNumber,
        description,
        admin: { connect: { id: createdUser.id } },
      },
    });

    await db.menu.create({
      data: {
        restaurantId: createdRestaurant.id,
        items: { create: [] },
      },
    });
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }

  // TODO: send verification mail

  return { success: "Your admin account has been created." };
};
