import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { MenuItem } from "@/typings";
import { Session } from "next-auth";
import { deleteMenuItems } from "@/actions/admin/deletemenuitem";
import { toast } from "sonner";

type DeleteProps = {
  row: Row<MenuItem>;
  session: Session | null;
  extractPublicId: (url: string) => string;
};

const Delete = ({ row, session, extractPublicId }: DeleteProps) => {
  const [isDeleteing, setIsDeleteing] = useState(false);

  const handleDelete = async (id: string, public_id: string) => {
    setIsDeleteing(true);
    const index = parseInt(id);
    console.log({ index, public_id });

    try {
      const response = await fetch(`/api/menuitems/${session?.user.menuId}`);
      const menuItems = await response.json();
      const menuItemToDelete = menuItems.menuItems[index].id;

      if (!menuItemToDelete) {
        toast.warning(
          "No menu found associated to your restaurant, contact to EatEase"
        );
        setIsDeleteing(false);
        return;
      }

      const res = await deleteMenuItems([menuItemToDelete]);

      await fetch("/api/deletecloudinary", {
        method: "POST",
        body: JSON.stringify({ selectedImages: public_id }),
      });

      if (res.success) {
        toast.success("Food item deleted.");
      } else {
        toast.error(res.error);
      }
      setIsDeleteing(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button
          asChild
          disabled={isDeleteing ? true : false}
          className="bg-transparent w-24 hover:bg-[#ef444431] rounded-sm flex justify-start items-center space-x-1 text-destructive px-2 py-1 border-2 border-destructive transition-all duration-300 cursor-pointer"
        >
          <AlertDialogTrigger>
            <Trash2Icon />
            <span>{isDeleteing ? "Deleting..." : "Delete"}</span>
          </AlertDialogTrigger>
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete {row.getValue("name")}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deletion will be reflected to all the customers immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant={"ghost"}
              className="hover:bg-transparent"
              onClick={() =>
                handleDelete(row.id, extractPublicId(row.getValue("image")))
              }
            >
              <AlertDialogAction>Yes</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete;
