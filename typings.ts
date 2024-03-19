import { Decimal } from "@prisma/client/runtime/library";
import { type ClassValue } from "clsx";
import { StaticImageData } from "next/image";

export type FoodItem = {
  image: StaticImageData;
  name: string;
  price: string;
  description?: string;
  location: string;
  isBestSeller: boolean;
  className?: ClassValue[];
};

export type FoodItems = {
  foodItems: FoodItem[];
};

export type Restaurant = {
  image: StaticImageData;
  name: string;
  description?: string;
  location: string;
  className?: ClassValue[];
};

export type Restaurants = {
  foodItems: Restaurant[];
};

export type MenuItem = {
  name: string;
  description?: string | null;
  price: number;
  image: string;
};

export type Menu = {
  menu: MenuItem[];
};
