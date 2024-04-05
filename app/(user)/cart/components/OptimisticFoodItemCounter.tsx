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
import { useSession } from "next-auth/react";
import OptimisticTotalPrice from "@/components/OptimisticTotalPrice";
import { deleteCartItemById } from "@/actions/user/cart/delete/delete-cart-item-by-id";
import { TableCell } from "@/components/ui/table";

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
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, amount) => state + Number(amount)
  );
  const [optimisticTotalAmount, setOptimisticTotalAmount] = useState(
    count * price
  );
  const [optimisticOverallTotal, setOptimisticOverallTotal] = useState(total);

  const [isPending, startTransition] = useTransition();

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
        const resp = await deleteCartItemById(res.id);
      }
    }
  };

  return (
    <>
      <TableCell>
        <div className="py-5">
          <div className="border flex items-center justify-between w-[40%] rounded-md space-x-2">
            <Button
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => startTransition(() => updateCount(-1))}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <div>{optimisticCount}</div>
            <Button
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() => startTransition(() => updateCount(1))}
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
