import React from "react";
import { TableCell, TableRow } from "../ui/table";

const CartRowLoading = () => {
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="h-32 w-32 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell className="text-right">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartRowLoading;
