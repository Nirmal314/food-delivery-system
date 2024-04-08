"use client";

import { TableCell } from "@/components/ui/table";
import React from "react";
import { useCartContext } from "../CartContext";

const TotalAmount = () => {
  const { totalAmount } = useCartContext();
  return (
    <TableCell colSpan={2} className="font-bold">
      ₹ {totalAmount}
    </TableCell>
  );
};

export default TotalAmount;
