import { db } from "@/lib/db";

export const getRestaurantByAdminId = async (id: string) => {
  try {
    const user = await db.restaurant.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};
