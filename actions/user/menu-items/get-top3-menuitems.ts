"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getTop3MenuItems = async () => {
  try {
    const menuItems = await db.menuItem.findMany({
      skip: 2,
      take: 3,
      orderBy: {
        price: "desc",
      },
    });

    revalidatePath("/");
    return { menuItems };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
};
