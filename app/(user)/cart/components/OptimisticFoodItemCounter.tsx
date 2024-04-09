"use client";

import React, {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { updateCartItemCount } from "@/actions/user/cart/update/update-cartitem-count";
import { deleteCartItemById } from "@/actions/user/cart/delete/delete-cart-item-by-id";
import { TableCell } from "@/components/ui/table";
import { useCartContext } from "../CartContext";

type OptimisticProps = {
  id: string;
  quantity: number;
  price: number;
};

const OptimisticFoodItemCounter = ({
  id,
  quantity,
  price,
}: OptimisticProps) => {
  const { cartId, total, setTotal, isDBUpdating } = useCartContext();

  const [optimisticQuantity, addOptimisticQuantity] = useOptimistic(
    quantity,
    (state, amount) => state + Number(amount)
  );

  const [optimisticTotalAmount, setOptimisticTotalAmount] = useState(
    quantity * price
  );

  const updateQuantity = async (amount: number) => {
    if (optimisticQuantity + amount > 0) {
      addOptimisticQuantity(amount);

      switch (amount) {
        case 1:
          setTotal(total + price);
          setOptimisticTotalAmount(optimisticTotalAmount + price);
          break;
        case -1:
          setTotal(total - price);
          setOptimisticTotalAmount(optimisticTotalAmount - price);
          break;
        default:
          break;
      }

      // ! handle db
      await updateCartItemCount(id, cartId, amount);
    }
  };

  return (
    <>
      <TableCell>
        <div className="py-5">
          <div className="border flex items-center justify-between w-[40%] rounded-md space-x-2">
            <Button
              disabled={isDBUpdating}
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => updateQuantity(-1)}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <div>{optimisticQuantity}</div>
            <Button
              disabled={isDBUpdating}
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => updateQuantity(1)}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </TableCell>
      <TableCell>₹ {optimisticTotalAmount}</TableCell>
    </>
  );
};

export default OptimisticFoodItemCounter;
