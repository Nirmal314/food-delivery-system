"use server";

import { auth } from "@/auth";
import { getMenuItemByMenuItemId } from "@/data/admin";
import { db } from "@/lib/db";

export default async function addToCart(
  menuItemId: string,
  restaurantId: string,
  quantity: number
) {
  const session = await auth();
  const userId = session?.user?.id;
  const menuItem = await getMenuItemByMenuItemId(menuItemId);

  // Validate the restaurantId
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

    console.log("no cart");
  }

  if (cart?.restaurantId !== restaurantId)
    return {
      error: `You can choose your dish from the ${restaurant.name}.`,
    };

  try {
    const add = await db.cartItem.create({
      data: {
        cartId: cart?.id as string,
        menuItemId: menuItemId,
        quantity: quantity,
      },
    });

    console.log(add);
    return { success: `Added ${menuItem?.name} to your cart.` };
  } catch (error) {
    console.log(error);
  }
}
