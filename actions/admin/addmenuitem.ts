"use server";

import * as z from "zod";
import { MenuItemSchema } from "@/schemas";
import { db } from "@/lib/db";
import { MenuItem } from "@/typings";
import { auth } from "@/auth";
import { getMenuByRestaurantId, getRestaurantByAdminId } from "@/data/admin";
import { revalidatePath } from "next/cache";

export const addMenuItem = async (values: z.infer<typeof MenuItemSchema>) => {
  const session = await auth();
  const validatedFields = MenuItemSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { name, description, price }: MenuItem = validatedFields.data;

  try {
    const restaurant = await getRestaurantByAdminId(session?.user.id!);
    const restaurantId = restaurant?.id;

    const menu = await getMenuByRestaurantId(restaurantId!);

    await db.menuItem.create({
      data: {
        name: name as string,
        description: description as string,
        price,
        menuId: menu?.id as string,
      },
    });

    revalidatePath("/menu");
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }

  return { success: "Your new recipe is added successfully!" };
};
