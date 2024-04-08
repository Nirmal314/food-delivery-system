import Image from "next/image";
import welcome from "@/public/home-img.jpg";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeAccordion from "@/components/HomeAccordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FoodItemCard from "@/app/(user)/restaurants/[rid]/FoodItemCard";
import RestaurantItemCard from "@/components/RestaurantItemCard";
import RestaurantLoading from "@/components/LoadingSkeletons/RestaurantLoading";
import { redirect } from "next/navigation";
import { getTop3Restaurants } from "@/actions/user/restaurants/get-top3-restaurants";
import { Suspense } from "react";
import { getTop3MenuItems } from "@/actions/user/menu-items/get-top3-menuitems";

export default async function Home() {
  const SearchableFoodItems = [
    "Italian",
    "North Indian",
    "Punjabi",
    "South Indian",
    "Gujarati",
    "Chinese",
  ];

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const foodItem = formData.get("search-food-item");
    redirect(`/cuisine/${foodItem}`);
  };

  const { restaurants } = await getTop3Restaurants();
  const { menuItems } = await getTop3MenuItems();
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
          <form
            className="flex w-full justify-center max-w-sm items-center space-x-2"
            action={handleSubmit}
          >
            <Select name="search-food-item">
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
            <Button
              id="search-btn"
              aria-label="btn"
              aria-labelledby="search-btn"
              tabIndex={-1}
              className="rounded-md"
              type="submit"
            >
              <SearchIcon />
            </Button>
          </form>
        </div>
        <Image
          src={welcome}
          className="w-full h-full object-cover"
          alt="Welcome spices"
        />
      </div>
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-16 p-6">
        <p className="text-5xl text-center text-primary font-bold">
          The top{" "}
          <span className="text-secondary px-2 py-1 bg-primary">
            best sellers
          </span>{" "}
          of the month
        </p>
        <div className="flex justify-center items-center space-x-8">
          {menuItems?.map((item, i) => (
            <>
              <Suspense fallback={<RestaurantLoading />} key={i}>
                <FoodItemCard
                  imageUrl={item.image}
                  id={item.id}
                  name={item.name}
                  description={item.description!!}
                  price={item.price}
                  isBestSeller={true}
                  className={["space-y-0 w-96"]}
                />
              </Suspense>
            </>
          ))}
        </div>
      </div>
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-16 p-6">
        <p className="text-5xl text-center text-primary font-bold">
          The top{" "}
          <span className="text-secondary px-2 py-1 bg-primary">
            best restaurants
          </span>{" "}
          of the month
        </p>
        <div className="flex justify-center items-center space-x-8">
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
