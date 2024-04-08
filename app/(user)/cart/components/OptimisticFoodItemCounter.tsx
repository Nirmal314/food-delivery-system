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
  cid: string;
  count: number;
  price: number;
  total: number;
};

const OptimisticFoodItemCounter = ({
  id,
  count,
  cid,
  price,
  total,
}: OptimisticProps) => {
  const { setTotalAmount, isDBUpdating, setIsDBUpdating } = useCartContext();

  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, amount) => state + Number(amount)
  );
  const [optimisticTotalAmount, setOptimisticTotalAmount] = useState(
    count * price
  );
  const [optimisticOverallTotal, setOptimisticOverallTotal] = useState(total);

  useEffect(() => {
    setTotalAmount(optimisticOverallTotal);
  }, [optimisticOverallTotal]);

  const updateCount = async (amount: number) => {
    if (optimisticCount + amount >= 0) {
      addOptimisticCount(amount);

      if (amount === 1) {
        setOptimisticTotalAmount(optimisticTotalAmount + price);
        setOptimisticOverallTotal(optimisticOverallTotal + price);
      } else {
        setOptimisticTotalAmount(optimisticTotalAmount - price);
        setOptimisticOverallTotal(optimisticOverallTotal - price);
      }

      // ! handle db
      const res = await updateCartItemCount(id, cid, amount);

      if (res.quantity === 0) {
        await deleteCartItemById(res.id);
      }
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
              onClick={() => updateCount(-1)}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <div>{optimisticCount}</div>
            <Button
              disabled={isDBUpdating}
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => updateCount(1)}
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
