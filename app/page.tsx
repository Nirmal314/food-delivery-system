"use client";

import Image from "next/image";
import welcome from "@/public/home-img.jpg";
import pizza from "@/public/home-pizza.jpg";
import pasta from "@/public/home-pasta.jpg";
import burger from "@/public/home-burger.jpg";
import r1 from "@/public/home-r1.jpg";
import r2 from "@/public/home-r2.jpg";
import r3 from "@/public/home-r3.jpg";
import { motion } from "framer-motion";
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
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import FoodItemCard from "@/components/FoodItemCard";
import RestaurantItemCard from "@/components/RestaurantItemCard";

const formSchema = z.object({
  foodItem: z.enum([
    "pizza",
    "burger",
    "north indian",
    "punjabi",
    "south indian",
    "gujarati thalis",
    "pasta",
    "chinese",
  ]),
});

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const selectFoodUI = (
    field: ControllerRenderProps<
      {
        foodItem:
          | "pizza"
          | "burger"
          | "north indian"
          | "punjabi"
          | "south indian"
          | "gujarati thalis"
          | "pasta"
          | "chinese";
      },
      "foodItem"
    >
  ) => (
    <FormItem>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger className="text-gray-900 w-[275px]">
            <SelectValue placeholder="What are you having today?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pizza">Pizza</SelectItem>
            <SelectItem value="burger">Burger</SelectItem>
            <SelectItem value="north indian">North Indian</SelectItem>
            <SelectItem value="punjabi">Punjabi</SelectItem>
            <SelectItem value="south indian">South Indian</SelectItem>
            <SelectItem value="gujarati thalis">Gujarati Thalis</SelectItem>
            <SelectItem value="pasta">Pasta</SelectItem>
            <SelectItem value="chinese">Chinese</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );

  const handleSubmit = ({ foodItem }: z.infer<typeof formSchema>) => {
    router.push(`/searchfood?q=${foodItem}`);
  };
  return (
    <>
      <div className="relative bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute space-y-8 inset-0 flex flex-col items-center justify-center text-white z-50"
        >
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
                render={({ field }) => selectFoodUI(field)}
              />
              <Button className="rounded-md" type="submit">
                <SearchIcon />
              </Button>
            </form>
          </Form>
        </motion.div>
        <Image
          src={welcome}
          className="w-full h-full object-cover"
          alt="Welcome spices"
        />
      </div>

      <div className="p-6">
        <p className="text-4xl text-center text-primary font-bold">
          The top 3 best sellers of the month
        </p>
      </div>
      <div className="flex justify-center items-center space-x-8">
        <FoodItemCard
          image={burger}
          name="Delicious Burger"
          price="150"
          description="A mouthwatering burger with all the fixings. "
          location="Burger King, Ahmedabad"
          isBestSeller={true}
        />
        <FoodItemCard
          image={pizza}
          name="Tasty Pizza"
          price="250"
          description="Freshly baked pizza with your favorite toppings."
          location="Domino's Pizza, Rajkot"
          isBestSeller={true}
        />
        <FoodItemCard
          image={pasta}
          name="Classic Spaghetti"
          price="180"
          description="Traditional Italian spaghetti with rich tomato sauce."
          location="Papa Louise Italian Cuisine, Surat"
          isBestSeller={true}
        />
      </div>
      <div className="p-6">
        <p className="text-4xl text-center text-primary font-bold">
          The top 3 best restaurants of the month
        </p>
      </div>
      <div className="flex justify-center items-center space-x-8">
        <RestaurantItemCard
          image={r1}
          name="Burger King"
          description="A mouthwatering burger with all the fixings. "
          location="Ahmedabad, Gujarat"
        />
        <RestaurantItemCard
          image={r2}
          name="Domino's Pizza"
          description="Freshly baked pizza with your favorite toppings."
          location="Rajkot, Gujarat"
        />
        <RestaurantItemCard
          image={r3}
          name="Papa Louise Italian Cuisine "
          description="Traditional Italian spaghetti with rich tomato sauce."
          location="Surat, Gujarat"
        />
      </div>
      <div className="p-6">
        <HomeAccordion />
      </div>
    </>
  );
}
