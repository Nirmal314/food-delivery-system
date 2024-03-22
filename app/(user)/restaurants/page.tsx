// "use client";

import RestaurantItemCard from "@/components/RestaurantItemCard";
import React, { Suspense } from "react";
import r1 from "@/public/home-r1.jpg";
import r2 from "@/public/home-r2.jpg";
import r3 from "@/public/home-r3.jpg";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
import { getRestaurants } from "@/actions/user/getrestauranrts";
import { Restaurants } from "@/typings";

const RestaurantsPage = async () => {
  const { restaurants } = await getRestaurants();
  console.log(restaurants);
  return (
    <>
      <div className="mt-10 min-h-screen w-full flex flex-col space-y-8 justify-center items-center">
        <p className="text-5xl text-center text-primary font-bold">
          Restaurants available
        </p>
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 w-full p-4">
          {restaurants?.map((restaurant, i) => (
            <>
              <Suspense fallback={<RestaurantLoading />} key={i}>
                <RestaurantItemCard
                  // image={restaurant.image}
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description!!}
                  address={restaurant.address}
                  phone={restaurant.phone}
                  className={["space-y-0 w-96"]}
                />
              </Suspense>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantsPage;
