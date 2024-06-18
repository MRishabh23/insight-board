"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  PaginationState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import MultipleSelector from "./multi-select";
import { Input } from "./ui/input";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

export function TableDataStaticStateComponent({ ...props }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const inputValue = React.useRef("");
  const tableType = React.useMemo(() => props.tableType, [props.tableType]);
  const propData = React.useMemo(
    () => (Array.isArray(props.data.data) ? (props.data.data.length > 0 ? props.data.data : []) : []),
    [props.data.data],
  );
  const [data, setData] = React.useState(propData);

  React.useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setData(propData);
    }
    return () => {
      ignore = true;
    };
  }, [propData]);

  const handleFilter = React.useCallback(
    (e: any) => {
      inputValue.current = e.target.value;
      if (e.target.value === "") {
        setData(propData);
      } else {
        const newData = propData.filter((item: any) => {
          return item.k.includes(e.target.value);
        });
        setData(newData);
      }
    },
    [propData],
  );
  const columns = React.useMemo(() => props.columns, [props.columns]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const tablePageCountArray = React.useMemo(() => {
    return Array.from(Array(table.getPageCount()).keys());
  }, [table]);

  const tablePageCountMulti = React.useMemo(() => {
    const arr = Array.from(Array(table.getPageCount()).keys());
    const newArr: any = [];
    arr.map((item) => {
      const opt = {
        label: (item + 1).toString(),
        value: (item + 1).toString(),
      };
      newArr.push(opt);
    });
    return newArr;
  }, [table]);

  const SelectPage = () => {
    return (
      <Select
        onValueChange={(e) => {
          const page = e ? Number(e) - 1 : 0;
          setPagination((prev) => ({ ...prev, pageIndex: page }));
        }}
        value={(pagination.pageIndex + 1).toString()}
      >
        <SelectTrigger className="h-9 w-20 justify-around p-0 focus:ring-0">
          <SelectValue placeholder="Choose a page..." />
        </SelectTrigger>
        <SelectContent>
          {tablePageCountArray.map((option) => (
            <SelectItem key={option} value={(option + 1).toString()}>
              {option + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const MultiSelectPage = () => {
    return (
      <MultipleSelector
        value={[
          {
            label: (pagination.pageIndex + 1).toString(),
            value: (pagination.pageIndex + 1).toString(),
          },
        ]}
        onChange={(e) => {
          if (e.length > 0) {
            const page = e[0] ? Number(e[0].value) - 1 : 0;
            setPagination((prev) => ({ ...prev, pageIndex: page }));
          }
        }}
        className="h-10 w-24"
        defaultOptions={tablePageCountMulti}
        placeholder="page..."
        hidePlaceholderWhenSelected
        maxSelected={1}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>
        }
      />
    );
  };

  return (
    <div className="mt-6 w-full">
      {tableType === "history" && (
        <div>
          <Input
            placeholder="Filter schedulerId..."
            value={inputValue.current ?? ""}
            onChange={(event) => handleFilter(event)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="flex items-start justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">Total Items: {data.length}</div>
        <div>
          <MultiSelectPage />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount().toLocaleString()}
          </div>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={cn(header.column.columnDef.meta?.className ?? "")}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn(cell.column.columnDef.meta?.className ?? "")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">Total Items: {data.length}</div>
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount().toLocaleString()}
          </div>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
