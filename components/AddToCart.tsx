"use client";

import React from "react";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";

const AddToCart = () => {
  return (
    <div>
      <Button
        onClick={() => toast.success("Added to cart")}
        className="flex space-x-1 items-center"
      >
        <ShoppingCartIcon className="w-4 h-4" />
        <span>Add to cart</span>
      </Button>
    </div>
  );
};

export default AddToCart;
