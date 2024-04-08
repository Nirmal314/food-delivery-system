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
import { getRestaurantByMenuId } from "@/data/admin";
import TotalAmount from "./components/TotalAmount";

type MenuItem = {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const getTotalAmount = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    return total + item.quantity * item.menuItem.price;
  }, 0);
};

const Cart = async () => {
  const session = await auth();
  const cart = await getCartByUserId(session?.user.id!);
  let isCartEmpty = false;

  if (!cart) isCartEmpty = true;

  const { cartItems } = await getCartItemsById(cart?.id!);

  const userCart: CartItem[] | null = [];
  let totalAmount = 0;
  let restaurant = null;

  if (cartItems && cartItems.length !== 0) {
    for (const item of cartItems) {
      //@ts-ignore
      const menuItem: MenuItem = await getMenuItemByMenuItemId(item.menuItemId);
      userCart.push({ ...item, menuItem });
    }
    totalAmount = getTotalAmount(userCart);

    restaurant = await getRestaurantByMenuId(userCart[0].menuItem.menuId);
  } else {
    await deleteCartByUserId(session?.user.id!);
  }

  const cartData = await getCartByUserId(session?.user.id!);

  return (
    <>
      {userCart.length !== 0 && !isCartEmpty ? (
        <>
          <h1 className="text-4xl font-bold text-center text-primary mt-8 mb-14">
            You are ordering from{" "}
            <span className="bg-primary px-2 py-1 text-secondary">
              {restaurant?.name}
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
                <Suspense
                  fallback={
                    <>
                      {Array.from({ length: cartItems.length }).map((_, i) => (
                        <CartRowLoading key={i} />
                      ))}
                    </>
                  }
                >
                  {userCart.map((item, i) => (
                    <CartItem
                      key={i}
                      cid={cartData?.id!}
                      item={item}
                      totalAmount={totalAmount}
                    />
                  ))}
                </Suspense>
              </TableBody>
              <TableFooter>
                <Suspense fallback={<CartTotalLoading />}>
                  <tr className="bg-gray-100">
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="font-bold">Total</TableCell>
                    <TotalAmount />
                    {/* <TableCell colSpan={2} className="font-bold">
                      ₹ {totalAmount}
                    </TableCell> */}
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
                  Total items:{" "}
                  <span className="font-bold">{userCart.length}</span>
                </p>
              </div>
              <CheckOutBtn cid={cartData?.id!} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Delivery Details</h3>
              <p className="text-gray-600 mb-2">
                Address:{" "}
                <span className="font-bold">{session?.user.address}</span>
              </p>
            </div>
          </div>
        </>
      ) : (
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
