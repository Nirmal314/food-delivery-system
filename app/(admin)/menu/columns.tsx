"use client";

import { deleteMenuItems } from "@/actions/admin/deletemenuitem";
import MenuItemLoading from "@/components/LoadingSkeletons/MenuItemLoading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Menu, MenuItem } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  DeleteIcon,
  Edit,
  Edit2Icon,
  EditIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  MouseEvent,
  Suspense,
  useEffect,
  useState,
  useTransition,
} from "react";

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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("image");
      const [isLoading, setIsLoading] = useState(true);

      const handleLoad = () => {
        setIsLoading(false);
        console.log("set loading = false");
      };

      return (
        <div className="rounded-lg w-72 h-48 relative">
          {isLoading && <MenuItemLoading />}
          <Image
            src={imageUrl}
            alt="food-image"
            className={`absolute object-cover rounded-lg`}
            width={288}
            height={192}
            onLoad={handleLoad}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const extractPublicId = (url: string): string => {
        const urlParts = url.split("/");

        const fileName = urlParts[urlParts.length - 1];

        return fileName.split(".")[0];
      };

      const handleDelete = async (id: string, public_id: string) => {
        console.log({ id: parseInt(id), public_id });
        // parseInt(id)
        // const res = await deleteMenuItems([id]);
        // const cres = await fetch("/api/deletecloudinary", {
        //   method: "POST",
        //   body: JSON.stringify({ selectedImages: public_id }),
        // });

        // const data = await cres.json();
        // console.log(data);

        // if (res.success) {
        //   toast({
        //     description: res.success,
        //   });
        // } else {
        //   toast({
        //     description: res.error,
        //     variant: "destructive",
        //   });
        // }
      };

      return (
        <div className="space-y-3 w-28">
          <Button
            onClick={(e) =>
              console.log({
                rowId: row.id,
                rowImage: extractPublicId(row.getValue("image")),
              })
            }
            className="bg-transparent hover:bg-transparent flex justify-start items-center space-x-1 text-primary px-2 py-1 border-2 border-transparent transition-all duration-300 rounded-none hover:rounded-sm cursor-pointer hover:border-primary"
          >
            <Edit />
            <span>Edit</span>
          </Button>
          <Button
            onClick={() =>
              handleDelete(row.id, extractPublicId(row.getValue("image")))
            }
            className="bg-transparent hover:bg-transparent flex justify-start items-center space-x-1 text-destructive px-2 py-1 border-2 border-transparent transition-all duration-300 rounded-none hover:rounded-sm cursor-pointer hover:border-destructive"
          >
            <Trash2Icon />
            <span>Delete</span>
          </Button>
        </div>
      );
    },
  },
];
