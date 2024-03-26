"use client";

import React, { useEffect, useOptimistic, useState } from "react";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { updateCountInDb } from "@/actions/count";
import { updateCartItemCount } from "@/actions/user/updatecartitemcount";
import { useSession } from "next-auth/react";
import OptimisticTotalPrice from "./OptimisticTotalPrice";
import { deleteCartItem } from "@/actions/user/deletecartitem";

type OptimisticProps = {
  id: string;
  count: number;
  price: number;
  total: number;
};

const OptimisticFoodItemCounter = ({
  id,
  count,
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

  const updateCount = async (amount: number) => {
    if (optimisticCount + amount >= 0) {
      addOptimisticCount(amount);
      setOptimisticTotalAmount(optimisticTotalAmount + price);
      setOptimisticOverallTotal(optimisticOverallTotal + price);
      // handle db
      const res = await updateCartItemCount(id, amount);
      console.log(res);
      if (res.quantity === 0) {
        await deleteCartItem(res.id);
      }
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="border flex items-center justify-between w-[40%] rounded-md space-x-2">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={() => updateCount(-1)}
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
          <div>{optimisticCount}</div>
          {/* <div>{optimisticTotalAmount}</div> */}
          {/* <div>{optimisticOverallTotal}</div> */}
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={() => updateCount(1)}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default OptimisticFoodItemCounter;
