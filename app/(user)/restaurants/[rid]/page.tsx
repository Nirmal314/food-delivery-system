import { getCartByUserId } from "@/actions/user/cart/select/get-cart-by-userid";
import { getMenuItemsByMenuId } from "@/actions/user/menu-items/get-menuitems-by-menuid";
import FoodItemCard from "@/app/(user)/restaurants/[rid]/FoodItemCard";
import { auth } from "@/auth";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
import {
  getMenuByRestaurantId,
  getRestaurantByRestaurantId,
} from "@/data/admin";
import React, { Suspense } from "react";

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

type PageProps = {
  params: {
    rid: string;
  };
};

const PerticularRestaurant = async ({ params: { rid } }: PageProps) => {
  const session = await auth();
  const menu = await getMenuByRestaurantId(rid);
  const menuId = menu?.id;
  const menuItems = await getMenuItemsByMenuId(menuId!!);
  const restaurant = await getRestaurantByRestaurantId(rid);
  const cartData = await getCartByUserId(session?.user.id!);
  return (
    <>
      <p className="text-5xl my-10 text-center text-primary font-bold">
        Welcome to{" "}
        <span className="text-secondary px-2 py-1 bg-primary">
          {restaurant?.name}
        </span>
      </p>
      <div className="h-screen w-full flex flex-col space-y-8 items-center">
        <div
          className={`w-full grid justify-items-center gap-y-8 gap-x-4 justify-center ${getGridColumns(
            menuItems?.length!
          )}`}
        >
          {menuItems?.map((item, i) => (
            <>
              <Suspense fallback={<RestaurantLoading />} key={i}>
                <FoodItemCard
                  imageUrl={item.image}
                  id={item.id}
                  rid={restaurant?.id}
                  cid={cartData.cart?.id}
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

export default PerticularRestaurant;
