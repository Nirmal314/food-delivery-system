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
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { getRestaurantByMenuId } from "@/actions/admin/getrestaurantbymenuid";
import CartLoading from "@/components/LoadingSkeletons/CartLoading";
import OptimisticFoodItemCounter from "@/components/OptimisticFoodItemCounter";
import OptimisticTotalPrice from "@/components/OptimisticTotalPrice";
type MenuItem = {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type CartItem = {
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

  const cart: CartItem[] = [];
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
    // TODO: delete cart
    // await deleteCart(res.)
  }

  return (
    <>
      {cartItems.cartItems.length !== 0 && (
        <>
          <p className="text-5xl text-center text-primary font-bold my-8">
            Your cart from{" "}
            <span className="text-secondary px-2 py-1 bg-primary">
              {restaurant?.name}
            </span>
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price per item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Suspense
                fallback={
                  <>
                    {Array.from({ length: cart.length }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="h-32 w-32 bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                }
              >
                {cart.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Image
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        width={200}
                        height={200}
                        className="object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell>{item.menuItem.name}</TableCell>
                    <TableCell>₹ {item.menuItem.price}</TableCell>
                    <TableCell>
                      <OptimisticFoodItemCounter
                        id={item.menuItem.id}
                        count={item.quantity}
                        price={item.menuItem.price}
                        total={totalAmount}
                      />
                    </TableCell>
                    {/* <TableCell>{item.quantity}</TableCell> */}
                    <TableCell className="text-right">
                      ₹ {item.quantity * item.menuItem.price}
                    </TableCell>
                  </TableRow>
                ))}
              </Suspense>
            </TableBody>
            <TableFooter>
              <Suspense
                fallback={
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                }
              >
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">₹ {totalAmount}</TableCell>
                </TableRow>
              </Suspense>
            </TableFooter>
          </Table>
        </>
      )}

      {cartItems.cartItems.length === 0 && (
        <p className="text-5xl text-center text-primary font-bold my-8">
          Your cart is empty
          {/* <span className="text-secondary px-2 py-1 bg-primary">

    </span> */}
        </p>
      )}
    </>
  );
};

export default Cart;

export const revalidate = 3;
