import { auth } from "@/auth";
import React, { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteCartByUserId } from "@/actions/user/cart/delete/delete-cart-by-userid";
import CartRowLoading from "@/components/LoadingSkeletons/CartRowLoading";
import Link from "next/link";
import CartTotalLoading from "@/components/LoadingSkeletons/CartTotalLoading";
import CartItem from "./components/CartItem";
import { getCartByUserId } from "@/actions/user/cart/select/get-cart-by-userid";
import CheckOutBtn from "./components/CheckOutBtn";
import { getCartItemsById } from "@/actions/user/cart/select/get-cartitems-by-id";
import { getMenuItemByMenuItemId } from "@/actions/user/menu-items/get-menuitem-by-id";
import {
  getRestaurantByMenuId,
  getRestaurantByRestaurantId,
} from "@/data/admin";
import TotalAmount from "./components/TotalAmount";
import { db } from "@/lib/db";
import TestComp from "./components/InitContext";
import { deleteCartItemById } from "@/actions/user/cart/delete/delete-cart-item-by-id";
import InitContext from "./components/InitContext";

type CartProps = {
  id: string;
  menuItemId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

const getTotalAmount = (cart: CartProps[]) => {
  return cart.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
};

const Cart = async () => {
  const session = await auth();
  const activeCart = await db.cart.findFirst({
    where: {
      userId: session?.user.id!,
      isActive: true,
    },
    select: {
      id: true,
      restaurantId: true,
    },
  });

  let isCartEmpty = false;
  let cartItems = null;
  let totalAmount = 0;
  let restaurant = null;

  const cart: CartProps[] = [];

  if (!activeCart) {
    isCartEmpty = true;
  } else {
    restaurant = await getRestaurantByRestaurantId(activeCart.restaurantId);
    cartItems = await db.cartItem.findMany({
      where: {
        cartId: activeCart?.id,
      },
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        menuItemId: true,
        quantity: true,
      },
    });

    if (cartItems.length === 0) {
      await deleteCartByUserId(session?.user.id!);
      isCartEmpty = true;
    }

    for (const cartItem of cartItems) {
      const menuItem = await db.menuItem.findUnique({
        where: {
          id: cartItem.menuItemId,
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
        },
      });
      cart.push({
        ...cartItem,
        name: menuItem?.name!,
        price: menuItem?.price!,
        image: menuItem?.image!,
      });
    }

    totalAmount = getTotalAmount(cart);
  }

  return (
    <>
      {!isCartEmpty && (
        <>
          <h1 className="text-4xl font-bold text-center text-primary mt-8 mb-14">
            You are ordering from{" "}
            <span className="bg-primary px-2 py-1 text-secondary">
              {restaurant?.name}
              <InitContext cartId={activeCart?.id!} totalAmount={totalAmount} />
            </span>
          </h1>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <tr className="bg-gray-200">
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price per item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {cart.map((item, i) => (
                  <Suspense
                    fallback={
                      <>
                        {Array.from({
                          length: cartItems ? cartItems.length : 0,
                        }).map((_, i) => (
                          <CartRowLoading key={i} />
                        ))}
                      </>
                    }
                  >
                    <CartItem
                      id={item.id}
                      menuItemId={item.menuItemId}
                      quantity={item.quantity}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  </Suspense>
                ))}
              </TableBody>
              <TableFooter>
                <Suspense fallback={<CartTotalLoading />}>
                  <tr className="bg-gray-100">
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="font-bold">Total</TableCell>
                    <TotalAmount />
                  </tr>
                </Suspense>
              </TableFooter>
            </Table>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                <p className="text-gray-600">
                  Total items: <span className="font-bold">{cart.length}</span>
                </p>
              </div>
              <CheckOutBtn />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Delivery Details</h3>
              <p className="text-gray-600 mb-2 font-bold">
                Address:{" "}
                <span className="font-normal">{session?.user.address}</span>
              </p>
              <p className="text-gray-600 mb-2 font-bold">
                Contact:{" "}
                <span className="font-normal">
                  {session?.user.contactNumber}
                </span>
              </p>
            </div>
          </div>
        </>
      )}

      {isCartEmpty && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h1 className="text-4xl font-bold text-primary">
                Your cart is empty
              </h1>
              <p className="text-gray-600 text-center">
                Looks like you haven't added any items to your cart yet. Explore
                our wide range of restaurants and cuisines to find something
                delicious!
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/restaurants">
                  <Button>Explore restaurants</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

export const revalidate = 3;
