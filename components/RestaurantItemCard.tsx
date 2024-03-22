import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Restaurant } from "@/typings";
import { MapPinIcon, PhoneCallIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
const RestaurantCard = ({
  id,
  image,
  name,
  description,
  address,
  phone,
  className,
}: Restaurant) => (
  <Card className={cn("w-80 overflow-hidden rounded-lg shadow-lg", className)}>
    <CardHeader className="bg-gradient-to-r from-[#16a34a] to-[#21c462] p-4 h-20 flex justify-center items-center">
      <CardTitle className="text-white text-2xl font-semibold">
        {name}
      </CardTitle>
    </CardHeader>

    <CardContent className="p-4 flex-grow">
      <CardDescription className="text-gray-600 text-justify text-sm mb-4 h-16 overflow-hidden">
        {description}
      </CardDescription>
    </CardContent>

    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center space-x-2 text-gray-600">
        <MapPinIcon className="w-4 h-4" />
        <span>{address}</span>
      </div>

      <div className="flex items-center space-x-2 text-gray-600">
        <PhoneCallIcon className="w-4 h-4" />
        <span>{phone}</span>
      </div>
    </div>

    <div className="flex justify-center py-6">
      <Button
        variant="outline"
        className="text-primary hover:bg-primary hover:text-white border-primary"
      >
        <Link href={`/restaurants/${id}`}>View menu</Link>
      </Button>
    </div>
  </Card>
);

export default RestaurantCard;
