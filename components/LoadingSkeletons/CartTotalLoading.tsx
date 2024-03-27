import React from "react";
import { TableCell, TableRow } from "../ui/table";

const CartTotalLoading = () => {
  return (
    <TableRow>
      <TableCell colSpan={4}>
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
      </TableCell>
      <TableCell className="text-right">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
      </TableCell>
    </TableRow>
  );
};

export default CartTotalLoading;
