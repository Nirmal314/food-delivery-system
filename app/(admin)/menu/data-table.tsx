"use client";

import {
  ColumnDef,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteMenuItems } from "@/actions/admin/deletemenuitem";
import { toast } from "@/components/ui/use-toast";
import cloudinary from "@/lib/cloudinary";
import { json } from "stream/consumers";

interface AdditionalProps {
  id: string;
  image: string;
}

interface DataTableProps<TData extends AdditionalProps, TValue> {
  columns: ColumnDef<TData, TValue>[]; // Update constraint to accept types extending AdditionalProps
  data: TData[];
}
export function DataTable<TData extends AdditionalProps, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleteing, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const extractPublicId = (url: string): string => {
    const urlParts = url.split("/");

    const fileName = urlParts[urlParts.length - 1];

    return fileName.split(".")[0];
  };

  useEffect(() => {
    const newSelectedRows = Object.entries(rowSelection).reduce(
      (acc, [key, value]) => {
        const row = data[parseInt(key)];

        // if (row && typeof row.id === 'string' && typeof row.image === 'string') {
        acc.push({ id: row.id, image: extractPublicId(row.image) });
        // }

        return acc;
      },
      [] as { id: string; image: string }[]
    );
    setSelectedImages(newSelectedRows.map(({ image }) => image));
    setSelectedRows(newSelectedRows.map(({ id }) => id));
  }, [rowSelection, data]);

  const handleDelete = async () => {
    setIsDeleting(true);

    const res = await deleteMenuItems(selectedRows);
    const cres = await fetch("/api/deletecloudinary", {
      method: "POST",
      body: JSON.stringify({ selectedImages }),
    });

    const data = await cres.json();
    console.log(data);

    if (res.success) {
      toast({
        description: res.success,
      });
      setIsDeleting(false);
    } else {
      toast({
        description: res.error,
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-3/4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter dishes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  className="h-20 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length !== 0 && (
            <>
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </span>
              <Button
                disabled={isDeleteing ?? true}
                className="ml-4"
                variant={"destructive"}
                onClick={handleDelete}
              >
                {isDeleteing ? "Deleting..." : "Delete selected rows"}
              </Button>
            </>
          )}
        </div>

        <div>
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
    </div>
  );
}
