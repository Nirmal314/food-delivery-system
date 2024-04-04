import RestaurantItemCard from "@/components/RestaurantItemCard";
import React, { Suspense } from "react";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
import { getRestaurants } from "@/actions/user/restaurants/get-restaurants";

const getGridColumns = (length: number) => {
  switch (true) {
    case length === 1:
      return "grid-cols-1";
    case length === 2:
      return "grid-cols-2";
    case length === 3:
      return "grid-cols-3";
    default:
      return "grid-cols-4";
  }
};

const RestaurantsPage = async () => {
  const { restaurants } = await getRestaurants();

  return (
    <>
      <p className="text-5xl my-10 text-center text-primary font-bold">
        Restaurants available
      </p>
      <div className="h-screen w-full flex flex-col items-center">
        <div
          className={`w-full grid justify-items-center gap-y-8 gap-x-4 justify-center ${getGridColumns(
            restaurants?.length!
          )}`}
        >
          {restaurants?.map((restaurant, i) => (
            <div key={i} className="max-w-[24rem]">
              <Suspense fallback={<RestaurantLoading />}>
                <RestaurantItemCard
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description!!}
                  address={restaurant.address}
                  phone={restaurant.phone}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantsPage;
