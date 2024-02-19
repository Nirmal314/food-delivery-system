import { StaticImageData } from "next/image";

export type FoodItem = {
  image: StaticImageData;
  name: string;
  price: string;
  description: string;
  location: string;
  isBestSeller: boolean;
};

export type FoodItems = {
  foodItems: FoodItem[];
};

export type Restaurant = {
  image: StaticImageData;
  name: string;
  description: string;
  location: string;
};

export type Restaurants = {
  foodItems: Restaurant[];
};
