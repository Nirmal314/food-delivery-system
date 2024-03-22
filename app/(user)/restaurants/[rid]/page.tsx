import FoodItemCard from "@/components/FoodItemCard";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
import {
  getMenuByRestaurantId,
  getMenuItemsByMenuId,
  getRestaurantByRestaurantId,
} from "@/data/admin";
import React, { Suspense } from "react";

type PageProps = {
  params: {
    rid: string;
  };
};

const PerticularRestaurant = async ({ params: { rid } }: PageProps) => {
  const menu = await getMenuByRestaurantId(rid);
  const menuId = menu?.id;
  const menuItems = await getMenuItemsByMenuId(menuId!!);
  const restaurant = await getRestaurantByRestaurantId(rid);

  return (
    <div className="mt-10 min-h-screen w-full flex flex-col space-y-8 justify-center items-center">
      <p className="text-5xl text-center text-primary font-bold">
        Welcome to{" "}
        <span className="text-secondary px-2 py-1 bg-primary">
          {restaurant?.name}
        </span>
      </p>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 w-full p-4">
        {menuItems?.map((item, i) => (
          <>
            <Suspense fallback={<RestaurantLoading />} key={i}>
              <FoodItemCard
                imageUrl={item.image}
                // id={item.id}
                name={item.name}
                description={item.description!!}
                price={item.price}
                isBestSeller={Math.round(Math.random()) === 0}
                className={["space-y-0 w-96"]}
              />
            </Suspense>
          </>
        ))}
      </div>
    </div>
  );
};

export default PerticularRestaurant;
