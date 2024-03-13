"use client";

import RestaurantItemCard from "@/components/RestaurantItemCard";
import React from "react";
import r1 from "@/public/home-r1.jpg";
import r2 from "@/public/home-r2.jpg";
import r3 from "@/public/home-r3.jpg";

const Restaurants = () => {
  const items = [];
  let count = 0;

  const getItem = (count: number) => {
    switch (count) {
      case 0:
        return (
          <div className="flex justify-center items-center w-full">
            <RestaurantItemCard
              image={r1}
              name="Burger King"
              description="Home of the flame-grilled Whopper and fast-food classics."
              location="Ahmedabad, Gujarat"
              className={["space-y-0 w-96"]}
            />
          </div>
        );
      case 1:
        return (
          <div className="flex justify-center items-center w-full">
            <RestaurantItemCard
              image={r2}
              name="Domino's Pizza"
              description="Delivering hot, freshly-made pizza right to your door."
              location="Rajkot, Gujarat"
              className={["space-y-0 w-96"]}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-center items-center w-full">
            <RestaurantItemCard
              image={r3}
              name="Papa Louise Cuisine"
              description="A family-owned Italian restaurant serving authentic dishes."
              location="Surat, Gujarat"
              className={["space-y-0 w-96"]}
            />
          </div>
        );
    }
  };

  for (let i = 0; i < 16 * 4; i++) {
    items.push(<>{getItem(count)}</>);

    if (i % 4 === 3) {
      count = (count + 1) % 4;
    }
  }
  return (
    <>
      <div className="mt-36 min-h-screen w-full flex flex-col space-y-8 justify-center items-center">
        <p className="text-5xl text-center text-primary font-bold">
          Restaurants available
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 w-full p-4">
          {items}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
