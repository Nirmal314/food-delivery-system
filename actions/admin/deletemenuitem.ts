"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteMenuItems = async (values: string[]) => {
  try {
    await db.menuItem.deleteMany({
      where: {
        id: {
          in: values,
        },
      },
    });

    console.log(values);

    revalidatePath("/menu");
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }

  return { success: "Food items deleted!" };
};
