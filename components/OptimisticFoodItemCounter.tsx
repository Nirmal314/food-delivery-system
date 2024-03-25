"use client";

import React, { useEffect, useOptimistic } from "react";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { updateCountInDb } from "@/actions/count";

type OptimisticProps = {
  id: string;
  count: number;
};

const OptimisticFoodItemCounter = ({ id, count }: OptimisticProps) => {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, amount) => state + Number(amount)
  );

  const updateCount = async (amount: number) => {
    addOptimisticCount(amount);
    // handle db
    await updateCountInDb(amount);
  };

  useEffect(() => {
    console.log(id);
  }, []);

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
