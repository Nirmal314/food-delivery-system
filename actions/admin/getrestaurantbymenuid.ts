"use server";

import { getRestaurantByRestaurantId } from "@/data/admin";
import { db } from "@/lib/db";

export const getRestaurantByMenuId = async (menuId: string) => {
  const menu = await db.menu.findUnique({ where: { id: menuId } });
  const restaurantId = menu?.restaurantId;
  const restaurant = await getRestaurantByRestaurantId(restaurantId!);

  return restaurant;
};
