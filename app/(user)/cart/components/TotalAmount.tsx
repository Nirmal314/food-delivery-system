"use client";

import { TableCell } from "@/components/ui/table";
import React from "react";
import { useCartContext } from "../CartContext";

const TotalAmount = () => {
  const { total } = useCartContext();
  return (
    <TableCell colSpan={2} className="font-bold">
      ₹ {total}
    </TableCell>
  );
};

export default TotalAmount;
