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

export const getMenuItemsByMenuId = async (id: string) => {
  try {
    const menuItems = await db.menuItem.findMany({
      where: { menuId: id },
    });
    return menuItems;
  } catch (error) {
    return null;
  }
};
