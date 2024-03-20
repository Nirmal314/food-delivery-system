import { MenuItem } from "@/typings";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getMenuItemsByMenuId } from "@/data/admin";
import { auth } from "@/auth";
import { ColumnDef } from "@tanstack/react-table";

interface AdditionalProps {
  id: string;
  image: string;
}

const RestaurantMenu = async () => {
  const session = await auth();

  const data: MenuItem[] = (await getMenuItemsByMenuId(
    session?.user.menuId!
  )) as MenuItem[];

  return (
    <>
      <div className="flex w-full h-screen justify-center">
        <DataTable<any, ColumnDef<AdditionalProps>[]>
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
};

export default RestaurantMenu;
