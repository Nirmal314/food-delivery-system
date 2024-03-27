"use server";

import { auth } from "@/auth";
import {
  getMenuItemByMenuItemId,
  getRestaurantByRestaurantId,
} from "@/data/admin";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function addToCart(
  menuItemId: string,
  restaurantId: string,
  quantity: number
) {
  const session = await auth();
  const userId = session?.user?.id;
  const menuItem = await getMenuItemByMenuItemId(menuItemId);

  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  let cart = await db.cart.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: {
        userId: userId!,
        restaurantId: restaurantId,
        items: {
          create: [],
        },
      },
    });
  }

  if (cart?.restaurantId !== restaurantId) {
    const restaurantInCart = await getRestaurantByRestaurantId(
      cart.restaurantId
    );
    return {
      error: `You can choose your dish from the ${restaurantInCart?.name}. or discard their items to proceed from ${restaurant.name}`,
    };
  }

  try {
    const existingItem = await db.cartItem.findFirst({
      where: {
        menuItemId: menuItemId,
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + Number(quantity);

      const updateExistingItem = await db.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
      revalidatePath("/cart");

      return {
        success: `Updated quantity of ${menuItem?.name} from ${
          newQuantity - quantity
        } to ${newQuantity}.`,
      };
    } else {
      const add = await db.cartItem.create({
        data: {
          cartId: cart?.id as string,
          menuItemId: menuItemId,
          quantity: quantity,
        },
      });
      revalidatePath("/cart");
      return { success: `Added ${quantity} ${menuItem?.name} to your cart.` };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
