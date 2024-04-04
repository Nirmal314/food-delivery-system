"use server";

import { db } from "@/lib/db";

export const getMenuItemByMenuItemId = async (id: string) => {
  try {
    const menuItem = await db.menuItem.findUnique({
      where: {
        id: id,
      },
    });

    return menuItem;
  } catch (error) {
    console.log(error);
    return null;
  }
};
