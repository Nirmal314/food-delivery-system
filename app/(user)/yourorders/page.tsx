import { MenuItem } from "@/typings";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/auth";
import { ColumnDef } from "@tanstack/react-table";
import { getMenuItemsByMenuId } from "@/actions/user/menu-items/get-menuitems-by-menuid";
import { db } from "@/lib/db";
import { getCartItemsById } from "@/actions/user/cart/select/get-cartitems-by-id";
import { OrderStatus } from "@prisma/client";

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
