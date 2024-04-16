"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowUpDownIcon, CrossIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { accept } from "@/actions/admin/orders/accpet";
import { cancel } from "@/actions/admin/orders/cancel";

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
    cell: ({ getValue }) => {
      type ItemName = {
        menuItem: { name: string; price: number };
        quantity: number;
      };

      const items: ItemName[] = getValue() as ItemName[];
      const totalAmount = items.reduce(
        (acc, item) => acc + item.menuItem.price * item.quantity,
        0
      );
      return (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"}>View</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex justify-between">
                  <AlertDialogTitle className="text-2xl font-bold mb-4">
                    Ordered items
                  </AlertDialogTitle>
                  <AlertDialogCancel className="p-0 rounded-none border-none border-0 outline-none hover:bg-transparent">
                    <X />
                  </AlertDialogCancel>
                </div>
                <Separator />
                <AlertDialogDescription className="w-full text-gray-700">
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium">
                              {item.menuItem.name}
                            </h3>
                            <p>
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                              }).format(Number(item.menuItem.price.toFixed(2)))}
                              x {item.quantity}
                            </p>
                          </div>
                          <div className="text-lg font-medium">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(
                              Number(item.menuItem.price) *
                                Number(item.quantity)
                            )}
                          </div>
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-xl">Total: </p>
                    <p className="font-bold text-lg">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(Number(totalAmount.toFixed(2)))}
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
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
    cell: ({ getValue }) => {
      type User = {
        address: string | null;
        contactNumber: string | null;
        email: string | null;
        image: string | null;
        name: string | null;
      };

      const user: User = getValue() as User;

      useEffect(() => {
        console.log(user);
      }, []);

      const getInitials = (name: string) => {
        const parts = name.split(" ");

        let initials = "";

        parts.forEach((part: string) => {
          initials += part.charAt(0).toUpperCase();
        });

        return initials;
      };
      return (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-transparent transition-colors duration-200 rounded-full"
              >
                <Avatar>
                  <AvatarFallback>
                    {getInitials(user.name as string)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto z-[100] shadow-md bg-white rounded-lg p-4 animate-fade-in-80 animate-scale-in-80"
              align="end"
            >
              <div className="flex items-center space-x-4 p-2 rounded-lg bg-white">
                <Avatar className="w-16 h-18">
                  <AvatarImage
                    src={user.image as string}
                    alt={user.name as string}
                  />
                  <AvatarFallback className="p-4 text-xl">
                    {getInitials(user.name as string)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-gray-800">
                    {user.name as string}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {user.email as string}
                  </p>
                  <DropdownMenuSeparator />
                  <p className="text-xs">
                    Contact:
                    {user.contactNumber as string}
                  </p>
                  <p className="text-xs">
                    Address:
                    {user.address as string}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <Button className="px-3" onClick={() => accept(row.getValue("id"))}>
            Accept
          </Button>
          <Button
            className="px-3"
            onClick={() => cancel(row.getValue("id"))}
            variant={"destructive"}
          >
            Cancel
          </Button>
        </div>
      );
    },
  },
];
