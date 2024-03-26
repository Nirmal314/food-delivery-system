"use client";

import Image from "next/image";
import welcome from "@/public/home-img.jpg";
import r1 from "@/public/home-r1.jpg";
import r2 from "@/public/home-r2.jpg";
import r3 from "@/public/home-r3.jpg";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HomeAccordion from "@/components/HomeAccordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import FoodItemCard from "@/app/(user)/restaurants/[rid]/FoodItemCard";
import RestaurantItemCard from "@/components/RestaurantItemCard";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";

const formSchema = z.object({
  foodItem: z.enum([
    "Italian",
    "North Indian",
    "Punjabi",
    "South Indian",
    "Gujarati",
    "Chinese",
  ]),
});

export default function Home() {
  const router = useRouter();
  const SearchableFoodItems = [
    "Italian",
    "North Indian",
    "Punjabi",
    "South Indian",
    "Gujarati",
    "Chinese",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = ({ foodItem }: z.infer<typeof formSchema>) => {
    router.push(`/cuisine/${foodItem}`);
  };
  return (
    <>
      <div className="relative bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute space-y-8 inset-0 flex flex-col items-center justify-center text-white z-25">
          <div>
            <p className="text-center text-6xl font-bold text-primary">
              Welcome to EatEase
            </p>
            <p className="text-center text-2xl text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex w-full justify-center max-w-sm items-center space-x-2"
            >
              <FormField
                control={form.control}
                name="foodItem"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="text-gray-900 w-[275px]">
                          <SelectValue placeholder="What are you having today?" />
                        </SelectTrigger>
                        <SelectContent>
                          {SearchableFoodItems.map((item, i) => (
                            <SelectItem key={i} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="rounded-md" type="submit">
                <SearchIcon />
              </Button>
            </form>
          </Form>
        </div>
        <Image
          src={welcome}
          className="w-full h-full object-cover"
          alt="Welcome spices"
        />
      </div>
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-16 p-6">
        <p className="text-5xl text-center text-primary font-bold">
          The top 3{" "}
          <span className="text-secondary px-2 py-1 bg-primary">
            best sellers
          </span>{" "}
          of the month
        </p>
        <div className="flex justify-center items-center space-x-8">
          <RestaurantLoading />
          <RestaurantLoading />
          <RestaurantLoading />
          {/* <FoodItemCard
            // image={burger}
            name="Delicious Burger"
            price={150}
            description="A mouthwatering burger with all the fixings. "
            // address="Burger King, Ahmedabad"
            isBestSeller={true}
          />
          <FoodItemCard
            // image={pizza}
            name="Tasty Pizza"
            price={250}
            description="Freshly baked pizza with your favorite toppings."
            // address="Domino's Pizza, Rajkot"
            isBestSeller={true}
          />
          <FoodItemCard
            // image={pasta}
            name="Classic Spaghetti"
            price={180}
            description="Traditional Italian spaghetti with rich tomato sauce."
            // address="Papa Louise Italian Cuisine, Surat"
            isBestSeller={true}
          /> */}
        </div>
      </div>
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-16 p-6">
        <p className="text-5xl text-center text-primary font-bold">
          The top 3{" "}
          <span className="text-secondary px-2 py-1 bg-primary">
            best restaurants
          </span>{" "}
          of the month
        </p>
        <div className="flex justify-center items-center space-x-8">
          <RestaurantItemCard
            // image={r1}
            name="Burger King"
            description="Home of the flame-grilled Whopper and fast-food classics."
            address="Ahmedabad, Gujarat"
            phone="8899855874"
          />
          <RestaurantItemCard
            // image={r2}
            name="Domino's Pizza"
            description="Delivering hot, freshly-made pizza right to your door."
            address="Rajkot, Gujarat"
            phone="8899855874"
          />
          <RestaurantItemCard
            // image={r3}
            name="Papa Louise Cuisine"
            description="A family-owned Italian restaurant serving authentic dishes."
            address="Surat, Gujarat"
            phone="8899855874"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-16 p-6">
        <div className="w-1/2 space-y-8">
          <p className="text-5xl text-center text-primary font-bold">
            Explore options near me
          </p>
          <div className="flex justify-center items-center">
            <HomeAccordion className="border p-4 rounded-lg mb-28" />
          </div>
        </div>
      </div>
    </>
  );
}
