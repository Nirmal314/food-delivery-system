import { auth } from "@/auth";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import React from "react";
import { DataTable } from "./data-table";
import { IncomingOrder, columns } from "./columns";

const OrderPage = async () => {
  const session = await auth();

  const orders: IncomingOrder[] = await db.order.findMany({
    where: {
      cart: {
        restaurantId: session?.user.restaurantId,
        Order: {
          status: OrderStatus.PENDING,
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
      <div className="flex w-full h-screen justify-center">
        <DataTable columns={columns} data={orders} />
      </div>
    </>
  );
};

export default OrderPage;

export const revalidate = 60;
