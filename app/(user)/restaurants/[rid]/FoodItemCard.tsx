"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FoodItem } from "@/typings";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import addToCart from "@/actions/user/addtocart";
import { toast } from "sonner";

const FoodItemCard = ({
  id,
  rid,
  imageUrl,
  name,
  price,
  description,
  isBestSeller,
  className,
}: FoodItem) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (quantity !== 0) {
      setIsAdding(true);
      const res = await addToCart(id!, rid!, quantity);

      if (res?.success) {
        toast.success(res.success);
      } else {
        toast.error(res?.error as string);
      }
      setQuantity(0);
      setIsAdding(false);
    }
  };

  const updateCount = async (amount: number) => {
    if (quantity + amount >= 0) {
      setQuantity(quantity + Number(amount));
    }
  };

  return (
    <>
      <Card
        className={cn("w-80 overflow-hidden rounded-lg shadow-lg", className)}
      >
        <div className="relative overflow-hidden h-48">
          <Image
            src={imageUrl!!}
            alt={name}
            width={384}
            height={320}
            className="rounded-t-lg hover:scale-105 transition-all duration-300 h-full w-full object-cover"
          />
          {isBestSeller && (
            <div className="absolute top-2 right-2">
              <Badge className="cursor-default bg-green-500 text-white">
                Best Seller
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="bg-white p-4 h-48">
          <CardTitle>
            <span className="bg-gradient-to-r from-[#16a34a] to-[#21c462] text-transparent bg-clip-text">
              {name}
            </span>
          </CardTitle>
          <CardDescription className="text-gray-600 mt-4 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 h-36">
          <p className="text-lg space-x-2 text-gray-800">
            <span className="text-sm line-through">₹ {price * 2}</span>
            <span className="text-lg font-bold">₹ {price}</span>
            <span className="text-lg font-bold">({(1 / 2) * 100}% off)</span>
          </p>
          <div className="py-5">
            <div className="border flex items-center justify-between w-[40%] rounded-md space-x-2">
              <Button
                variant={"ghost"}
                className="hover:bg-transparent"
                onClick={() => updateCount(-1)}
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <div>{quantity}</div>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent"
                onClick={() => updateCount(1)}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pb-8 px-4 h-12">
          <div>
            <Button
              disabled={isAdding ?? false}
              onClick={() => handleAddToCart()}
              className="flex space-x-1 items-center"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>{isAdding ? "Adding..." : "Add to cart"}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default FoodItemCard;
