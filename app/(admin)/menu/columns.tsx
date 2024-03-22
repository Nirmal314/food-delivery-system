"use client";

import MenuItemLoading from "@/components/LoadingSkeletons/MenuItemLoading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MenuItem } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Action from "./components/Action";

export const columns: ColumnDef<MenuItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="text-left"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("image");
      const [isLoading, setIsLoading] = useState(true);

      const handleLoad = () => {
        setIsLoading(false);
      };

      return (
        <div className="rounded-lg w-20 h-20 relative">
          {isLoading && <MenuItemLoading />}
          <Suspense fallback={<MenuItemLoading />}>
            <Image
              src={imageUrl}
              alt="food-image"
              className={`absolute object-cover rounded-full w-20 h-20`}
              width={80}
              height={80}
              onLoad={handleLoad}
            />
          </Suspense>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Price
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <Action row={row} />,
  },
];
