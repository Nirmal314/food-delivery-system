"use server";

import { getMenuByRestaurantId, getRestaurantByAdminId } from "@/data/admin";
import { db } from "@/lib/db";
import { Cuisine } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getMenuItemsByMenuId } from "./get-menuitems-by-menuid";

export const getMenuItemsByCuisine = async (cuisine: string) => {
  try {
    const restaurants = await db.restaurant.findMany({
      where: {
        cuisine: cuisine as Cuisine,
      },
    });

    restaurants.map(async (restaurant) => {
      const menu = await getMenuByRestaurantId(restaurant.id);
      const menuItems = await getMenuItemsByMenuId(menu?.id!);

      console.log(menuItems);
    });

    // console.log(restaurants);

    return { restaurants };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
};
