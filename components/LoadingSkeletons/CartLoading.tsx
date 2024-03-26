import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CartLoading = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            </TableHead>
            <TableHead>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            </TableHead>
            <TableHead>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            </TableHead>
            <TableHead>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            </TableHead>
            <TableHead className="text-right">
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
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
              <TableCell className="text-right">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell className="text-right">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default CartLoading;
