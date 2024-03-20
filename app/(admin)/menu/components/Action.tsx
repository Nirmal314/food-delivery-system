import { Button } from "@/components/ui/button";
import { MenuItem } from "@/typings";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import Delete from "./Delete";

const Action = ({ row }: { row: Row<MenuItem> }) => {
  const extractPublicId = (url: string): string => {
    const urlParts = url.split("/");

    const fileName = urlParts[urlParts.length - 1];

    return fileName.split(".")[0];
  };

  const { data: session } = useSession();

  return (
    <div className="space-y-2 w-28">
      <Button
        onClick={(e) =>
          console.log({
            rowId: row.id,
            rowImage: extractPublicId(row.getValue("image")),
          })
        }
        className="bg-transparent w-24 hover:bg-[#16a34a27] rounded-sm flex justify-start items-center space-x-1 text-primary px-2 py-1 border-2 border-primary transition-all duration-300 cursor-pointer"
      >
        <Edit />
        <span>Edit</span>
      </Button>
      <Delete row={row} session={session} extractPublicId={extractPublicId} />
    </div>
  );
};

export default Action;
