"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getTop3Restaurants = async () => {
  try {
    const restaurants = await db.restaurant.findMany({
      take: 3,
    });

    const modifiedRestaurants = restaurants.map(({ adminId, ...rest }) => rest);

    revalidatePath("/");
    return { restaurants: modifiedRestaurants };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
};
