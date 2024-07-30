import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/auth";
import { db } from "@/lib/db";

const CustomerOrders = async () => {
  const session = await auth();

  const orders = await db.order.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      cartId: true,
      status: true,
      totalAmount: true,
      createdAt: true,
      cart: {
        select: {
          restaurant: {
            select: {
              name: true,
            },
          },
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

export default CustomerOrders;
