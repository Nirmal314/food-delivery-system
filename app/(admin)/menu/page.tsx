import { MenuItem } from "@/typings";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AddMenuItem from "@/components/AddMenuItem";
import { getMenuItemsByMenuId } from "@/data/admin";
import { auth } from "@/auth";

const RestaurantMenu = async () => {
  const session = await auth();

  const data: MenuItem[] = (await getMenuItemsByMenuId(
    session?.user.menuId!
  )) as MenuItem[];

  return (
    <>
      <div className="flex w-full h-screen justify-center">
        <DataTable columns={columns} data={data} />
        <div className="fixed bottom-10 right-10">
          <AddMenuItem />
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
