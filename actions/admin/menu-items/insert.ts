"use server";

import * as z from "zod";
import { MenuItemSchemaWithImageString } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getMenuByRestaurantId } from "@/data/admin";
import { revalidatePath } from "next/cache";

export const insertMenuItem = async (
  values: z.infer<typeof MenuItemSchemaWithImageString>
) => {
  const session = await auth();
  const validatedFields = MenuItemSchemaWithImageString.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { name, description, price, image } = validatedFields.data;

  try {
    const menu = await getMenuByRestaurantId(session?.user.restaurantId!);

    await db.menuItem.create({
      data: {
        name: name as string,
        description: description as string,
        price,
        menuId: menu?.id as string,
        image: image as string,
      },
    });

    revalidatePath("/menu");
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }

  return { success: "Your new dish is added successfully!" };
};
