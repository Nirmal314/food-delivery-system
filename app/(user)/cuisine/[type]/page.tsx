import React from "react";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    type: string;
  };
};

const CuisinePage = ({ params: { type } }: PageProps) => {
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

  console.log(cuisine);
  return (
    <>
      <div className="mt-10 min-h-screen w-full flex flex-col space-y-8 justify-center items-center">
        <p className="text-5xl text-center text-primary font-bold">
          You searched for{" "}
          <span className="text-secondary px-2 py-1 bg-primary">{cuisine}</span>
        </p>
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 w-full p-4">
          {/* {menuItems?.map((item, i) => (
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
        ))} */}
        </div>
      </div>
    </>
  );
};

export default CuisinePage;
