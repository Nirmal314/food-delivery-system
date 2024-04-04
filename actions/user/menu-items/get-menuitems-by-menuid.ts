"use server";

import { db } from "@/lib/db";

export const getMenuItemsByMenuId = async (id: string) => {
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
