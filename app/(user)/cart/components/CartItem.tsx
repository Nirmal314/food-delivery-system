"use client";

import { deleteCartItemById } from "@/actions/user/cart/delete/delete-cart-item-by-id";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import { useCartContext } from "../CartContext";
import OptimisticFoodItemCounter from "./OptimisticFoodItemCounter";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

    if (res.success) setTotal(total - price * quantity);
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
        <AlertDialog>
          <Button disabled={isDBUpdating} variant={"destructive"} asChild>
            <AlertDialogTrigger>
              <Trash2Icon />
            </AlertDialogTrigger>
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want remove{" "}
                <span className="bg-destructive px-1.5 py-1 text-secondary">
                  {name}
                </span>{" "}
                from cart?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You're about to remove{" "}
                <span className="font-bold">
                  {name} x {quantity}
                </span>{" "}
                from your cart. This action cannot be undone, so take a moment
                to double-check if you're sure you don't want it. Perhaps you
                meant to add a different quantity, or browse similar items we
                offer?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                disabled={isDBUpdating}
                onClick={() => {
                  toast.promise(
                    new Promise((resolve, reject) => {
                      handleDelete()
                        .then(() => {
                          resolve(`${name} has been removed.`);
                          setIsDBUpdating(false);
                        })
                        .catch((error) => {
                          reject(error);
                          setIsDBUpdating(false);
                        });
                    }),
                    {
                      loading: `Removing ${name} from cart...`,
                      success: `${name} has been removed.`,
                      error: `Something went wrong while removing ${name}, Please try again`,
                    }
                  );
                }}
                variant={"destructive"}
              >
                <AlertDialogAction className="bg-transparent hover:bg-transparent">
                  Yes
                </AlertDialogAction>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
