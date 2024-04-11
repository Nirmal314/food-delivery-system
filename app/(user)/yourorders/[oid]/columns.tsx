"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <p>{row.getValue("price") * row.getValue("quantity")}</p>
    ),
  },
];
