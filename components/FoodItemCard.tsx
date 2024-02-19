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
import { MapPinIcon } from "lucide-react";

const FoodItemCard = ({
  image,
  name,
  price,
  description,
  location,
  isBestSeller,
}: FoodItem) => (
  <Card className="w-80 overflow-hidden">
    <div className="relative overflow-hidden">
      <Image
        src={image}
        alt={name}
        className="rounded-t-lg hover:scale-105 transition-all duration-300"
      />
      {isBestSeller ? (
        <>
          <div className="absolute top-2 right-2">
            <Badge className="cursor-default">Best Seller</Badge>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
    <CardHeader>
      <div className="p-4">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-lg font-semibold text-gray-800">₹{price}</p>
    </CardContent>
    <CardFooter>
      <p className="text-sm text-gray-600 flex space-x-1 items-center">
        <MapPinIcon />
        <span>{location}</span>
      </p>
    </CardFooter>
  </Card>
);

export default FoodItemCard;
