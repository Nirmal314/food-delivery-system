import { deleteCartItemById } from "@/actions/user/cart/delete/delete-cart-item-by-id";
import OptimisticFoodItemCounter from "@/app/(user)/cart/components/OptimisticFoodItemCounter";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";

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

type CartItemProps = {
  item: CartItem;
  totalAmount: number;
  cid: string;
};

const CartItem = ({ item, totalAmount, cid }: CartItemProps) => {
  // console.log(item, cid);
  const handleDelete = async () => {
    "use server";
    await deleteCartItemById(item.id);
  };
  return (
    <TableRow>
      <TableCell>
        <Suspense
          fallback={
            <div className="w-[200px] h-[200px] rounded-lg bg-gray-300 animate-pulse"></div>
          }
        >
          <Image
            src={item.menuItem.image}
            alt={item.menuItem.name}
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        </Suspense>
      </TableCell>
      <TableCell>{item.menuItem.name}</TableCell>
      <TableCell>₹ {item.menuItem.price}</TableCell>
      <OptimisticFoodItemCounter
        id={item.menuItem.id}
        cid={cid}
        count={item.quantity}
        price={item.menuItem.price}
        total={totalAmount}
      />
      <TableCell className="text-center">
        <form action={handleDelete}>
          <Button variant={"destructive"}>
            <Trash2Icon />
          </Button>
        </form>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
