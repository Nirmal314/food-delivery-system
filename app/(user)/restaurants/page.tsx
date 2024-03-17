// "use client";

import RestaurantItemCard from "@/components/RestaurantItemCard";
import React, { Suspense } from "react";
import r1 from "@/public/home-r1.jpg";
import r2 from "@/public/home-r2.jpg";
import r3 from "@/public/home-r3.jpg";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
const Restaurants = () => {
  const restaurantData = [
    {
      image: r1,
      name: "Burger King",
      description: "Home of the flame-grilled Whopper and fast-food classics.",
      location: "Ahmedabad, Gujarat",
    },
    {
      image: r2,
      name: "Domino's Pizza",
      description: "Delivering hot, freshly-made pizza right to your door.",
      location: "Rajkot, Gujarat",
    },
    {
      image: r3,
      name: "Papa Louise Cuisine",
      description:
        "A family-owned Italian restaurant serving authentic dishes.",
      location: "Surat, Gujarat",
    },
    {
      image: r1,
      name: "Burger King",
      description: "Home of the flame-grilled Whopper and fast-food classics.",
      location: "Ahmedabad, Gujarat",
    },
    {
      image: r2,
      name: "Domino's Pizza",
      description: "Delivering hot, freshly-made pizza right to your door.",
      location: "Rajkot, Gujarat",
    },
    {
      image: r3,
      name: "Papa Louise Cuisine",
      description:
        "A family-owned Italian restaurant serving authentic dishes.",
      location: "Surat, Gujarat",
    },
    {
      image: r1,
      name: "Burger King",
      description: "Home of the flame-grilled Whopper and fast-food classics.",
      location: "Ahmedabad, Gujarat",
    },
    {
      image: r2,
      name: "Domino's Pizza",
      description: "Delivering hot, freshly-made pizza right to your door.",
      location: "Rajkot, Gujarat",
    },
    {
      image: r3,
      name: "Papa Louise Cuisine",
      description:
        "A family-owned Italian restaurant serving authentic dishes.",
      location: "Surat, Gujarat",
    },
    {
      image: r1,
      name: "Burger King",
      description: "Home of the flame-grilled Whopper and fast-food classics.",
      location: "Ahmedabad, Gujarat",
    },
    {
      image: r2,
      name: "Domino's Pizza",
      description: "Delivering hot, freshly-made pizza right to your door.",
      location: "Rajkot, Gujarat",
    },
    {
      image: r3,
      name: "Papa Louise Cuisine",
      description:
        "A family-owned Italian restaurant serving authentic dishes.",
      location: "Surat, Gujarat",
    },
  ];
  return (
    <>
      <div className="mt-28 min-h-screen w-full flex flex-col space-y-8 justify-center items-center">
        <p className="text-5xl text-center text-primary font-bold">
          Restaurants available
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 w-full p-4">
          {restaurantData.map((restaurant, i) => (
            <Suspense fallback={<RestaurantLoading />} key={i}>
              <RestaurantItemCard
                image={restaurant.image}
                name={restaurant.name}
                description={restaurant.description}
                location={restaurant.location}
                className={["space-y-0 w-96"]}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
