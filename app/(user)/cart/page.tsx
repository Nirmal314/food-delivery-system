import { auth } from "@/auth";
import React, { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getRestaurantByMenuId } from "@/actions/admin/getrestaurantbymenuid";
import { deleteCartByUserId } from "@/actions/user/deletecartbyuserid";
import CartRowLoading from "@/components/LoadingSkeletons/CartRowLoading";
import Link from "next/link";
import CartTotalLoading from "@/components/LoadingSkeletons/CartTotalLoading";
import CartItem from "./components/CartItem";

type MenuItem = {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type TCartItem = {
  id: string;
  cartId: string;
  menuItemId: string;
  quantity: number;
  menuItem: MenuItem;
};

const getTotalAmount = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    return total + item.quantity * item.menuItem.price;
  }, 0);
};

const Cart = async () => {
  const session = await auth();
  const res = await fetch("http://localhost:3000/api/getcart", {
    method: "POST",
    body: JSON.stringify({ userId: session?.user.id }),
  });

  const { cartItems } = await res.json();

  const cart: TCartItem[] = [];
  let totalAmount = 0;
  let restaurant = null;

  if (cartItems.cartItems.length !== 0) {
    for (const item of cartItems.cartItems) {
      const itemRes = await fetch(
        `http://localhost:3000/api/menuitem/${item.menuItemId}`
      );
      const { menuItem } = await itemRes.json();
      cart.push({ ...item, menuItem });
    }
    console.log(cart);
    totalAmount = getTotalAmount(cart);

    restaurant = await getRestaurantByMenuId(cart[0].menuItem.menuId);
  } else {
    await deleteCartByUserId(session?.user.id!);
  }

  return (
    <>
      {cart.length !== 0 ? (
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
                      {Array.from({ length: cart.length }).map((_, i) => (
                        <CartRowLoading key={i} />
                      ))}
                    </>
                  }
                >
                  {cart.map((item, i) => (
                    <CartItem key={i} item={item} totalAmount={totalAmount} />
                  ))}
                </Suspense>
              </TableBody>
              <TableFooter>
                <Suspense fallback={<CartTotalLoading />}>
                  <tr className="bg-gray-100">
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell colSpan={2} className="font-bold">
                      ₹ {totalAmount}
                    </TableCell>
                  </tr>
                </Suspense>
              </TableFooter>
            </Table>
          </div>

          <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                <p className="text-gray-600">
                  Total items: <span className="font-bold">{cart.length}</span>
                </p>
                <p className="text-gray-600">
                  Total cost: <span className="font-bold">₹ {totalAmount}</span>
                </p>
              </div>
              <Button>Place Order</Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Delivery Details</h3>
              <p className="text-gray-600 mb-2">
                Address:{" "}
                <span className="font-bold">123 Main Street, City</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold text-primary mt-8">
            Your cart is empty
          </h1>
          <p className="text-gray-600 text-center">
            Looks like you haven't added any items to your cart yet. Explore our
            wide range of restaurants and cuisines to find something delicious!
          </p>
          <Link href="/restaurants">
            <Button>Explore restaurants</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;

export const revalidate = 3;
