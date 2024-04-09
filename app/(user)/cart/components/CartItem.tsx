"use client";

import { deleteCartItemById } from "@/actions/user/cart/delete/delete-cart-item-by-id";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import { useCartContext } from "../CartContext";
import OptimisticFoodItemCounter from "./OptimisticFoodItemCounter";
import { getCartItemsById } from "@/actions/user/cart/select/get-cartitems-by-id";
import { db } from "@/lib/db";

type CartProps = {
  id: string;
  menuItemId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

const CartItem = ({
  id,
  menuItemId,
  quantity,
  name,
  price,
  image,
}: CartProps) => {
  const { isDBUpdating, setIsDBUpdating, total, setTotal } = useCartContext();
  const handleDelete = async () => {
    setIsDBUpdating(true);
    const res = await deleteCartItemById(id);
    setTotal(total - price * quantity);
    setTimeout(() => {
      setIsDBUpdating(false);
    }, 3000);
  };
  return (
    <TableRow key={id}>
      <TableCell>
        <Suspense
          fallback={
            <div className="w-[200px] h-[200px] rounded-lg bg-gray-300 animate-pulse"></div>
          }
        >
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        </Suspense>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>₹ {price}</TableCell>
      <OptimisticFoodItemCounter
        id={menuItemId}
        quantity={quantity}
        price={price}
      />
      <TableCell className="text-center">
        <Button
          disabled={isDBUpdating}
          onClick={handleDelete}
          variant={"destructive"}
        >
          <Trash2Icon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
