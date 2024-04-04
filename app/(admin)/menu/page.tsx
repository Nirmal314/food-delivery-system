import { MenuItem } from "@/typings";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/auth";
import { ColumnDef } from "@tanstack/react-table";
import { getMenuItemsByMenuId } from "@/actions/user/menu-items/get-menuitems-by-menuid";

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
