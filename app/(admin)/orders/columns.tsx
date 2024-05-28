"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDownIcon, CrossIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { accept } from "@/actions/admin/orders/accpet";
import { cancel } from "@/actions/admin/orders/cancel";
import User from "./components/User";
import Items from "./components/Items";
import { socket } from "@/app/socket";

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
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Order date
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleString();
    },
  },

  {
    header: "Items",
    accessorKey: "cart.items",
    cell: ({ getValue }) => <Items getValue={getValue} />,
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Total Amount
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(Number((row.getValue("totalAmount") as number).toFixed(2)));
    },
  },
  {
    header: "User",
    accessorKey: "user",
    cell: ({ getValue }) => <User getValue={getValue} />,
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      const handleAccept = async (id: string) => {
        const res = await accept(id);

        if (res.success) socket.emit("order-accepted", res.success);
        else socket.emit("order-accepted", res.error);
      };

      const handleCancel = async (id: string) => {
        const res = await cancel(id);

        if (res.success) socket.emit("order-cancelled", res.success);
        else socket.emit("order-cancelled", res.error);
      };

      return (
        <div className="space-x-2">
          <Button
            className="px-3"
            onClick={() => handleAccept(row.getValue("id"))}
          >
            Accept
          </Button>
          <Button
            className="px-3"
            onClick={() => handleCancel(row.getValue("id"))}
            variant={"destructive"}
          >
            Cancel
          </Button>
        </div>
      );
    },
  },
];
