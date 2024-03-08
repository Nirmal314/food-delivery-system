"use client";

import FoodItemCard from "@/components/FoodItemCard";
import React from "react";
import pizza from "@/public/home-pizza.jpg";
import pasta from "@/public/home-pasta.jpg";
import burger from "@/public/home-burger.jpg";
import { useSearchParams } from "next/navigation";

const searchfood = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  const items = [];
  let count = 0;

  const getItem = (count: number) => {
    switch (count) {
      case 0:
        return (
          <div className="flex justify-center items-center w-full">
            <FoodItemCard
              image={burger}
              name="Delicious Burger"
              price="150"
              description="A mouthwatering burger with all the fixings. "
              location="Burger King, Ahmedabad"
              isBestSeller={true}
              className={["space-y-0 w-96"]}
            />
          </div>
        );
      case 1:
        return (
          <div className="flex justify-center items-center w-full">
            <FoodItemCard
              image={pizza}
              name="Tasty Pizza"
              price="250"
              description="Freshly baked pizza with your favorite toppings."
              location="Domino's Pizza, Rajkot"
              isBestSeller={true}
              className={["space-y-0 w-96"]}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-center items-center w-full">
            <FoodItemCard
              image={pasta}
              name="Classic Spaghetti"
              price="180"
              description="Traditional Italian spaghetti with rich tomato sauce."
              location="Papa Louise Italian Cuisine, Surat"
              isBestSeller={true}
              className={["space-y-0 w-96"]}
            />
          </div>
        );
    }
  };

  for (let i = 0; i < 8 * 4; i++) {
    items.push(<>{getItem(count)}</>);

    if (i % 4 === 3) {
      count = (count + 1) % 4;
    }
  }
  return (
    <>
      <div className="mt-36 min-h-screen w-full flex flex-col space-y-8 justify-center items-center">
        <p className="text-5xl text-center text-primary font-bold">
          You searched for{" "}
          <span className="text-secondary px-2 py-1 bg-primary">{search}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 w-full p-4">
          {items}
        </div>
      </div>
    </>
  );
};

export default searchfood;
