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
import { MapPinIcon, ShoppingCartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import OptimisticFoodItemCounter from "./OptimisticFoodItemCounter";
import AddToCart from "./AddToCart";

const FoodItemCard = async ({
  id,
  imageUrl,
  name,
  price,
  description,
  isBestSeller,
  className,
}: FoodItem) => {
  // let count = 0;
  const res = await fetch("http://localhost:3000/api/count", {
    cache: "no-cache",
    next: {
      tags: ["count"],
    },
  });

  const { count } = await res.json();
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
            <span className="text-sm line-through">₹{price * 2}</span>
            <span className="text-lg font-bold">₹{price}</span>
            <span className="text-lg font-bold">({(1 / 2) * 100}% off)</span>
          </p>
          <OptimisticFoodItemCounter id={id!!} count={count} />
        </CardContent>

        <CardFooter className="flex justify-between pb-8 px-4 h-12">
          <AddToCart />
        </CardFooter>
      </Card>
    </>
  );
};

export default FoodItemCard;
