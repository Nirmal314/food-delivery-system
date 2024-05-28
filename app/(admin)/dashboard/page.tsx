import { auth } from "@/auth";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import React from "react";
import ProcessingOrder from "./components/ProcessingOrder";

const Dashboard = async () => {
  const session = await auth();

  const processingOrders = await db.order.findMany({
    where: {
      cart: {
        restaurantId: session?.user.restaurantId,
        Order: {
          status: OrderStatus.PROCESSING,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      totalAmount: true,

      cart: {
        select: {
          items: {
            select: {
              menuItem: {
                select: {
                  name: true,
                  price: true,
                },
              },
              quantity: true,
            },
          },
        },
      },
      user: {
        select: {
          address: true,
          contactNumber: true,
          email: true,
          image: true,
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex w-full h-full justify-center items-center flex-col ">
        <p className="text-secondary px-2 py-1 bg-primary my-4 text-4xl font-bold">
          Current orders
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {processingOrders.map((order, index) => (
            <>
              <div key={index} className="flex justify-center">
                <ProcessingOrder order={order} />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
