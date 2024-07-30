"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Order = {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
};

export const columns: ColumnDef<Order>[] = [
  // TODO: add if required
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  { header: "Order ID", accessorKey: "id" },
  {
    accessorKey: "cart.restaurant.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Restaurant
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const getVariant = (status: OrderStatus) => {
        switch (status) {
          case OrderStatus.COMPLETED:
            return "default";
          case OrderStatus.CANCELLED:
            return "destructive";
          case OrderStatus.PENDING:
            return "secondary";
          case OrderStatus.PROCESSING:
            return "outline";
          default:
            return null;
        }
      };

      return (
        <Badge
          className={`cursor-pointer ${
            row.getValue("status") === OrderStatus.PROCESSING
              ? "animate-pulse"
              : ""
          }`}
          variant={getVariant(row.getValue("status") as OrderStatus)}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      const status = row.getValue(columnId);
      return filterStatuses.includes(status);
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
];
