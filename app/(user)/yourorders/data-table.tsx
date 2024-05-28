"use client";

import {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface StatusColumnFilter extends ColumnFilter {
  value: string[];
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { socket } from "@/app/socket";
import { revalidatePathClient } from "@/actions/revalidatePathClient";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  useEffect(() => {
    socket.on("order-accepted", (order) => {
      revalidatePathClient("/yourorders");
    });

    socket.on("order-cancelled", (order) => {
      revalidatePathClient("/yourorders");
    });
  }, []);

  const getColumnName = (column: string) => {
    switch (column) {
      case "id":
        return "Order ID";
      case "cart_restaurant.name":
        return "Restaurant";
      case "status":
        return "Status";
      case "totalAmount":
        return "Total Amount";
      case "createdAt":
        return "Date of order";
      default:
        return column;
    }
  };

  const handleStatusFilterChange = (status: string) => {
    setColumnFilters((prev) => {
      const existingStatusFilter = prev.find(
        (filter): filter is StatusColumnFilter => filter.id === "status"
      );
      if (existingStatusFilter) {
        // ! If there's an existing status filter, add the new value to the array
        return [
          { id: "status", value: [...existingStatusFilter.value, status] },
          ...prev.filter((filter) => filter.id !== "status"),
        ];
      } else {
        // ! If there's no existing status filter, create a new one
        return [{ id: "status", value: [status] }, ...prev];
      }
    });
  };

  return (
    <div className="w-3/4">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter Restaurant..."
          value={
            (table
              .getColumn("cart_restaurant.name")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("cart_restaurant.name")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {getColumnName(column.id.toString())}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto focus:outline-none">
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.values(OrderStatus).map((status, i) => (
                <DropdownMenuCheckboxItem
                  key={i}
                  id={status}
                  className="capitalize"
                  checked={columnFilters.some(
                    (filter) =>
                      filter.id === "status" &&
                      (filter as StatusColumnFilter).value.includes(status)
                  )}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleStatusFilterChange(status);
                    } else {
                      setColumnFilters((prev) => {
                        const existingStatusFilter = prev.find(
                          (filter): filter is StatusColumnFilter =>
                            (filter as StatusColumnFilter).id === "status"
                        );
                        if (existingStatusFilter) {
                          // TODO: remove if necessary

                          if (existingStatusFilter.value.length === 1) {
                            return [
                              {
                                id: "status",
                                value: [
                                  "PROCESSING",
                                  "PENDING",
                                  "COMPLETED",
                                  "CANCELLED",
                                ],
                              },
                            ];
                          }
                          return [
                            {
                              id: "status",
                              value: existingStatusFilter.value.filter(
                                (s) => s !== status
                              ),
                            },
                            ...prev.filter((filter) => filter.id !== "status"),
                          ];
                        } else {
                          return prev;
                        }
                      });
                    }
                  }}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/yourorders/${row.getValue("id")}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {table.getFilteredSelectedRowModel().rows.length !== 0 && (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
