import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getMenuItemsByCuisine } from "@/actions/user/menu-items/get-menuitems-by-cuisine";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
import FoodItemCard from "../../restaurants/[rid]/FoodItemCard";

type PageProps = {
  params: {
    type: string;
  };
};

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

const CuisinePage = async ({ params: { type } }: PageProps) => {
  const cuisine = type.split("%20").join(" ");
  const cuisineDb = cuisine.toUpperCase().split(" ").join("_");

  const SearchableFoodItems = [
    "Italian",
    "North Indian",
    "Punjabi",
    "South Indian",
    "Gujarati",
    "Chinese",
  ];

  if (!SearchableFoodItems.includes(cuisine)) redirect("/cuisine-not-found");

  const cuisineItems = await getMenuItemsByCuisine(cuisineDb);
  return (
    <>
      <p className="text-6xl my-10 text-center space-x-2 space-y-1 text-primary font-bold">
        <span className="text-secondary px-2 bg-primary">{cuisine}</span>
        <span>cuisine</span>
      </p>
      <div className="min-h-screen w-full flex flex-col space-y-8 items-center">
        <div
          className={`w-full grid justify-items-center gap-y-8 gap-x-4 justify-center ${getGridColumns(
            Object.values(cuisineItems)?.length!
          )}`}
        >
          {Object.values(cuisineItems)?.map((item, i) => (
            <>
              <Suspense fallback={<RestaurantLoading />} key={i}>
                <FoodItemCard
                  imageUrl={item.image}
                  id={item.id}
                  rid={item?.restaurantId}
                  restaurantName={item.restaurantName}
                  name={item.name}
                  description={item.description!}
                  price={item.price}
                  isBestSeller={Math.round(Math.random()) === 0}
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

export default CuisinePage;
