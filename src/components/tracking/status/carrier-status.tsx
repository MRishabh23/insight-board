"use client";

import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableStatusForm } from "./carrier-status-form";
import { useParams } from "next/navigation";
import { ParamType, StatusType } from "@/utils/types/common";
import { useStatusQuery } from "@/utils/query";
import { Button } from "@/components/ui/button";
import { ColumnDef, SortingFn } from "@tanstack/react-table";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TableDataStaticComponent } from "@/components/data-table-static";

export const CarrierStatus = () => {
  const params = useParams<ParamType>();

  const sortStatusFn: SortingFn<StatusType> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.status;
    const statusB = rowB.original.status;
    const statusOrder = ["OPERATIONAL", "DEGRADED-PERFORMANCE", "PARTIAL-OUTAGE", "OUTAGE"];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  };

  const columns: ColumnDef<StatusType>[] = [
    {
      id: "carrier",
      accessorKey: "carrier",
      header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
      cell: ({ row }) => <TableCellCustom className="font-semibold">{row.original.carrier}</TableCellCustom>,
      enableSorting: true,
      sortDescFirst: false,
      sortUndefined: "last",
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => <TableHeadCustom>Status</TableHeadCustom>,
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <TableCellCustom>
            <Badge
              className={cn(
                "tracking-wide",
                status.toLowerCase().includes("operation")
                  ? "bg-green-500 hover:bg-green-400"
                  : status.toLowerCase().includes("partial")
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : status.toLowerCase().includes("degraded")
                      ? "bg-orange-500 hover:bg-orange-400"
                      : status.toLowerCase().includes("outage")
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-black",
              )}
            >
              {status}
            </Badge>
          </TableCellCustom>
        );
      },
      sortingFn: sortStatusFn,
    },
    {
      id: "actions",
      accessorKey: "actions",
      header: () => <TableHeadCustom>Actions</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableStatusForm params={params} item={row.original} />;
      },
      enableSorting: false,
    },
  ];

  const carrierStatusQuery = useStatusQuery(params);

  if (carrierStatusQuery.isPending) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (carrierStatusQuery.isError || carrierStatusQuery.error) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {carrierStatusQuery.error?.message}</p>
      </div>
    );
  }

  if (carrierStatusQuery.data && !carrierStatusQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{carrierStatusQuery.data?.data}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-5">
        <Button onMouseDown={() => carrierStatusQuery.refetch()} disabled={carrierStatusQuery.isFetching}>
          {carrierStatusQuery.isFetching ? "Fetching..." : "Refresh"}
        </Button>
      </div>
      {carrierStatusQuery.isFetching ? (
        <div className="flex h-full flex-col items-center justify-center">
          <CgSpinnerAlt className="animate-spin text-lg" />
        </div>
      ) : (
        <TableDataStaticComponent data={carrierStatusQuery.data} columns={columns} />
      )}
    </div>
  );
};
