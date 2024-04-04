import React from "react";
import Edit from "./Edit";
import Delete from "./Delete";
import { Row } from "@tanstack/react-table";
import { MenuItem } from "@/typings";
import { useSession } from "next-auth/react";

const Actions = ({ row }: { row: Row<MenuItem> }) => {
  const { data: session } = useSession();
  return (
    <div className="space-y-2">
      <Edit row={row} session={session} />
      <Delete row={row} session={session} />
    </div>
  );
};

export default Actions;
