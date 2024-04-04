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
import { deleteMenuItems } from "@/actions/admin/menu-items/delete";
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
import AddMenuItem from "@/app/(admin)/menu/components/AddMenuItem";
import { toast } from "sonner";

interface AdditionalProps {
  id: string;
  image: string;
}

interface DataTableProps<TData extends AdditionalProps, TValue> {
  columns: ColumnDef<TData, TValue>[];
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

  table.getState().pagination.pageSize = 5;

  const extractPublicId = (url: string): string => {
    const urlParts = url.split("/");

    const fileName = urlParts[urlParts.length - 1];

    return fileName.split(".")[0];
  };

  useEffect(() => {
    const newSelectedRows = Object.entries(rowSelection).reduce(
      (acc, [key, value]) => {
        const row = data[parseInt(key)];

        if (
          row &&
          typeof row.id === "string" &&
          typeof row.image === "string"
        ) {
          acc.push({ id: row.id, image: extractPublicId(row.image) });
        }

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

    if (res.success) {
      const cres = await fetch("/api/deletecloudinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedImages }),
      });

      const cresponse = await cres.json();
      if (cresponse.success) {
        toast.success(res.success);
      } else {
        toast.error(cresponse.error);
      }
    } else {
      toast.error(res.error);
    }

    setIsDeleting(false);
  };

  return (
    <div className="w-3/4">
      <div className="flex items-center justify-between py-4">
        <AddMenuItem />

        <Input
          placeholder="Filter dishes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div>
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
                    <TableCell
                      className={`${
                        cell.id.split("_")[cell.id.split("_").length - 1] ===
                          ("description" || "name") && "text-justify"
                      }`}
                      key={cell.id}
                    >
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
            <div className="flex items-center space-x-4">
              <div>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    disabled={isDeleteing ? true : false}
                    variant={"destructive"}
                  >
                    {isDeleteing ? "Deleting..." : "Delete selected rows"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete selected items?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Deletion will be reflected to all the customers
                      immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      disabled={isDeleteing ?? true}
                      className="bg-transparent hover:bg-transparent"
                      onClick={handleDelete}
                    >
                      <AlertDialogAction>Yes</AlertDialogAction>
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <div className="space-x-2">
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
