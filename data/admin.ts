import { db } from "@/lib/db";

export const getRestaurantByAdminId = async (id: string) => {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { adminId: id },
    });

    return restaurant;
  } catch (error) {
    return null;
  }
};

export const getRestaurantByRestaurantId = async (id: string) => {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { id: id },
    });

    return restaurant;
  } catch (error) {
    return null;
  }
};

export const getMenuByRestaurantId = async (id: string) => {
  try {
    const menu = await db.menu.findUnique({
      where: { restaurantId: id },
    });

    return menu;
  } catch (error) {
    return null;
  }
};

export const getRestaurantByMenuId = async (menuId: string) => {
  const menu = await db.menu.findUnique({ where: { id: menuId } });
  const restaurantId = menu?.restaurantId;
  const restaurant = await getRestaurantByRestaurantId(restaurantId!);

  return restaurant;
};
