"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type OrderedItem = {
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export const columns: ColumnDef<OrderedItem>[] = [
  {
    accessorKey: "index",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(Number(row.getValue("price")))}
      </>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total: number =
        (row.getValue("price") as number) *
        (row.getValue("quantity") as number);
      return (
        <>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(Number(total))}
        </>
      );
    },
  },
];
