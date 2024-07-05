"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { ParamType, ReferenceTableType } from "@/utils/types/common";
import { useReferenceSubscriptionQuery } from "@/utils/query";
import { format, toDate } from "date-fns";
import { TableDataDefaultComponent } from "@/components/data-table-default";

export const columns: ColumnDef<ReferenceTableType>[] = [
  {
    id: "subscription-id",
    accessorKey: "subscriptionId",
    header: () => <TableHeadCustom>Subscription Id</TableHeadCustom>,
    cell: ({ row }) => <TableCellCustom className="font-semibold">{row.original.subscriptionId}</TableCellCustom>,
    meta: {
      className: "sticky left-0 bg-white",
    },
    enableSorting: false,
  },
  {
    id: "carrier",
    accessorKey: "carrier",
    header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.carrier}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "ref-type",
    accessorKey: "refType",
    header: () => <TableHeadCustom>Reference Type</TableHeadCustom>,
    cell: ({ row }) => {
      const ref = row.original.referenceType;
      let rType = ref.includes("BOOKING")
        ? "amber"
        : ref.includes("BILL")
          ? "orange"
          : ref.includes("CONTAINER")
            ? "green"
            : "blue";
      rType = "bg-" + rType + "-500";

      return (
        <TableCellCustom>
          <Badge className={`${rType}`}>{ref}</Badge>
        </TableCellCustom>
      );
    },
    enableSorting: false,
  },
  {
    id: "ref-num",
    accessorKey: "refNum",
    header: () => <TableHeadCustom>Reference Number</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.referenceNumber}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => <TableHeadCustom>Status</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.status}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "queue",
    accessorKey: "queueType",
    header: () => <TableHeadCustom>Queue</TableHeadCustom>,
    cell: ({ row }) => {
      const queue = row.original.queue;
      const qType = queue.includes("NORMAL")
        ? "Normal"
        : queue.includes("ADAPTIVE")
          ? "Adaptive"
          : queue.includes("RNF")
            ? "RNF"
            : "";

      return <TableCellCustom>{qType}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "created-at",
    accessorKey: "createdAt",
    header: () => <TableHeadCustom>Created On</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{format(toDate(row.original.createdAt), "do MMM yyyy, HH:mm:ss")}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "last-crawled-at",
    accessorKey: "lastCrawledAt",
    header: () => <TableHeadCustom>Last Crawled At</TableHeadCustom>,
    cell: ({ row }) => (
      <TableCellCustom>{format(toDate(row.original.lastCrawledAt), "do MMM yyyy, HH:mm:ss")}</TableCellCustom>
    ),
    enableSorting: false,
  },
  {
    id: "updated-at",
    accessorKey: "updatedAt",
    header: () => <TableHeadCustom>Updated At</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{format(toDate(row.original.updatedAt), "do MMM yyyy, HH:mm:ss")}</TableCellCustom>;
    },
    enableSorting: false,
  },
];

export function ReferenceSubscriptionTable() {
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  if (!searchParams.get("subscriptionId")) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl font-bold">
        Enter a subscription id to view data.
      </div>
    );
  }

  return <ReferenceSubscriptionData params={params} searchParams={searchParams} />;
}

export function ReferenceSubscriptionData({ ...props }) {
  const referenceQuery = useReferenceSubscriptionQuery(
    props.params,
    props.searchParams.get("category"),
    props.searchParams.get("subscriptionId"),
  );

  if (referenceQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (referenceQuery.isError || referenceQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {referenceQuery.error?.message}</p>
      </div>
    );
  }

  if (referenceQuery.data && !referenceQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{referenceQuery.data?.data}</p>
      </div>
    );
  }

  return <TableDataDefaultComponent data={referenceQuery.data} columns={columns} />;
}
