import { MenuItem } from "@/typings";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import getData from "./dummy-items";
import { redirect } from "next/navigation";
import AddMenuItem from "@/components/AddMenuItem";

const Menu = async () => {
  const data: MenuItem[] = await getData();

  return (
    <>
      <div className="flex w-full h-screen justify-center">
        <DataTable columns={columns} data={data} />
        <AddMenuItem />
      </div>
    </>
  );
};

export default Menu;
