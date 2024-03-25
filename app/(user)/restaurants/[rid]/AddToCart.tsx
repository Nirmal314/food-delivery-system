"use client";

import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";
import addToCart from "@/actions/user/addtocart";

type AddCartProps = { id: string; rid: string };

const AddToCart = async ({ id, rid }: AddCartProps) => {
  const handleAddToCart = async () => {
    const res = await addToCart(id, rid, 1);
    if (res?.success) {
      toast.success(res.success);
    } else {
      toast.error(res?.error);
    }
  };
  return (
    <div>
      <Button
        onClick={() => handleAddToCart()}
        className="flex space-x-1 items-center"
      >
        <ShoppingCartIcon className="w-4 h-4" />
        <span>Add to cart</span>
      </Button>
    </div>
  );
};

export default AddToCart;
