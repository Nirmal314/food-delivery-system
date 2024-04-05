"use server";

import { getMenuByRestaurantId, getRestaurantByAdminId } from "@/data/admin";
import { db } from "@/lib/db";
import { Cuisine } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getMenuItemsByMenuId } from "./get-menuitems-by-menuid";
import { MenuItem } from "@/typings";

type MenuItemWithRestaurant = MenuItem & {
  restaurantName: string;
  restaurantId: string;
};

export const getMenuItemsByCuisine = async (cuisine: string) => {
  try {
    const restaurants = await db.restaurant.findMany({
      where: {
        cuisine: cuisine as Cuisine,
      },
    });

    const cuisineItems: MenuItemWithRestaurant[] = [];

    for (const restaurant of restaurants) {
      const menu = await getMenuByRestaurantId(restaurant.id);
      const menuItems = await getMenuItemsByMenuId(menu?.id!);
      if (menuItems) {
        menuItems.forEach((menuItem) => {
          cuisineItems.push({
            ...menuItem,
            restaurantName: restaurant.name,
            restaurantId: restaurant.id,
          });
        });
      }
    }

    return cuisineItems;
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
};
