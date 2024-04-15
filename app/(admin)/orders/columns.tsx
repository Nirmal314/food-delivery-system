"use client";

import { ColumnDef } from "@tanstack/react-table";

export type IncomingOrder = {
  id: string;
  createdAt: Date;
  totalAmount: number;
  cart: {
    items: {
      menuItem: {
        name: string;
        price: number;
      };
      quantity: number;
    }[];
  };
  user: {
    address: string | null;
    contactNumber: string | null;
    email: string | null;
    image: string | null;
    name: string | null;
  };
};

export const columns: ColumnDef<IncomingOrder>[] = [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  { header: "Order ID", accessorKey: "id" },
  {
    header: "Order date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    header: "Order time",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleTimeString();
    },
  },
  {
    header: "Items",
    accessorKey: "cart.items",
    cell: ({ getValue }) => {
      type ItemName = { menuItem: { name: string } };

      const items: ItemName[] = getValue() as ItemName[];
      return <>{items.map((item) => item.menuItem.name + ", ")}</>;
    },
  },
];
