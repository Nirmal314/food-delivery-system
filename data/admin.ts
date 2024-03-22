import { db } from "@/lib/db";
import { Menu, MenuItem, Restaurant } from "@/typings";

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

export const getMenuItemByMenuItemId = async (
  id: string
): Promise<MenuItem | null> => {
  try {
    const menuItem = await db.menuItem.findUnique({
      where: {
        id: id,
      },
    });
    console.log("first", menuItem);
    return menuItem;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMenuItemsByMenuId = async (
  id: string
): Promise<MenuItem[] | null> => {
  try {
    const menuItems = await db.menuItem.findMany({
      where: { menuId: id },
    });
    return menuItems;
  } catch (error) {
    console.log(error);
    return null;
  }
};
