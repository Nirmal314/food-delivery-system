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
import { MapPinIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const RestaurantCard = ({
  image,
  name,
  description,
  location,
  className,
}: Restaurant) => (
  <Card className={cn("w-80 overflow-hidden", className)}>
    <div className="relative overflow-hidden">
      <Image
        src={image}
        alt={name}
        className="rounded-t-lg hover:scale-105 transition-all duration-300"
      />
    </div>
    <CardHeader>
      <div className="p-4">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <CardFooter>
        <p className="text-sm text-gray-600 flex space-x-1 items-center">
          <MapPinIcon />
          <span>{location}</span>
        </p>
      </CardFooter>
    </CardContent>
  </Card>
);

export default RestaurantCard;
