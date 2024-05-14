"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { ParamType, ReferenceTableType } from "@/utils/types/common";
import { UserContext } from "@/components/dashboard-layout-component";
import { useReferenceAllQuery } from "@/utils/query";
import { TableDataDynamicComponent } from "@/components/data-table-dynamic";

export const columns: ColumnDef<ReferenceTableType>[] = [
  {
    id: "subscription-id",
    accessorKey: "subscriptionId",
    header: () => <TableHeadCustom className="w-32">Subscription Id</TableHeadCustom>,
    cell: ({ row }) => (
      <TableCellCustom>{row.original.subscriptionId}</TableCellCustom>
    ),
    meta: {
      className: "sticky left-0 bg-white",
    },
  },
  {
    id: "carrier",
    accessorKey: "carrier",
    header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.carrier}</TableCellCustom>;
    },
  },
  {
    id: "ref-type",
    accessorKey: "refType",
    header: () => (
      <TableHeadCustom className="w-32">Reference Type</TableHeadCustom>
    ),
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
  },
  {
    id: "ref-num",
    accessorKey: "refNum",
    header: () => <TableHeadCustom>Reference Number</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.referenceNumber}</TableCellCustom>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => <TableHeadCustom>Status</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.status}</TableCellCustom>;
    },
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
  },
  {
    id: "created-at",
    accessorKey: "createdAt",
    header: () => <TableHeadCustom>Created On</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.createdAt}</TableCellCustom>;
    },
  },
  {
    id: "last-crawled-at",
    accessorKey: "lastCrawledAt",
    header: () => <TableHeadCustom>Last Crawled At</TableHeadCustom>,
    cell: ({ row }) => (
      <TableCellCustom>{row.original.lastCrawledAt}</TableCellCustom>
    ),
  },
  {
    id: "updated-at",
    accessorKey: "updatedAt",
    header: () => <TableHeadCustom>Updated At</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.updatedAt}</TableCellCustom>;
    },
  },
];

export function ReferenceAllTable() {
  const username = React.useContext(UserContext);
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();
  const queryCarriers = searchParams.get("carriers")
    ? searchParams.get("carriers")?.split(",")
    : [];
  let newCarrOpt: any = [];

  if (queryCarriers !== undefined && queryCarriers.length > 0) {
    queryCarriers.map((carrier) => {
      if (carrier) {
        newCarrOpt.push(carrier);
      }
    });
  }

  const referenceAllQuery = useReferenceAllQuery(
    username || "",
    params,
    newCarrOpt,
    searchParams
  );

  if (referenceAllQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }

  if (referenceAllQuery.isError || referenceAllQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <p className="text-red-500">Error: {referenceAllQuery.error?.message}</p>
      </div>
    );
  }

  if (referenceAllQuery.data && !referenceAllQuery.data?.data?.success) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-red-500">{referenceAllQuery.data?.data?.message}</p>
      </div>
    );
  }

  if (!referenceAllQuery.data) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-lg font-bold">Select a carrier to view latency.</p>
      </div>
    );
  }

  return (
    <TableDataDynamicComponent data={referenceAllQuery.data} columns={columns} />
  );
}
