"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getRestaurants = async () => {
  try {
    const restaurants = await db.restaurant.findMany();

    const modifiedRestaurants = restaurants.map(({ adminId, ...rest }) => rest);

    revalidatePath("/restaurants");
    return { restaurants: modifiedRestaurants };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
};
