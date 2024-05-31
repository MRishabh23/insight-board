"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { ParamType, ReferenceTableType } from "@/utils/types/common";
import { useReferenceAllQuery } from "@/utils/query";
import { format, toDate } from "date-fns";
import { TableDataStaticComponent } from "@/components/data-table-static";
import { ReferenceDrawer } from "./reference-all-drawer";
import { cn } from "@/lib/utils";

export function ReferenceAllTable() {
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  if (!searchParams.get("carrier")) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl font-bold">
        Select a carrier to view references.
      </div>
    );
  }

  return <ReferenceAllData params={params} searchParams={searchParams} />;
}

const ReferenceAllData = ({ ...props }) => {
  const columns: ColumnDef<ReferenceTableType>[] = [
    {
      id: "subscription-id",
      accessorKey: "subscriptionId",
      header: () => <TableHeadCustom className="w-32">Subscription Id</TableHeadCustom>,
      cell: ({ row }) => <TableCellCustom>{row.original.subscriptionId}</TableCellCustom>,
      meta: {
        className: "sticky left-0 bg-white",
      },
    },
    {
      id: "carrier",
      accessorKey: "carrier",
      header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{props.searchParams.get("carrier")}</TableCellCustom>;
      },
    },
    {
      id: "ref-type",
      accessorKey: "refType",
      header: () => <TableHeadCustom className="w-32">Reference Type</TableHeadCustom>,
      cell: ({ row }) => {
        let ref = row.original.subscriptionId;
        ref = ref.includes("BOOKING")
          ? "Booking"
          : ref.includes("BILL")
            ? "BillOfLading"
            : ref.includes("CONTAINER")
              ? "Container"
              : "AWB";

        let rType = ref.includes("Booking")
          ? "amber"
          : ref.includes("Bill")
            ? "orange"
            : ref.includes("Container")
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
      cell: () => {
        let status = props.searchParams.get("refStatus")!;

        return (
          <TableCellCustom className={cn(status === "ACTIVE" ? "text-green-500" : "text-red-500")}>
            {status}
          </TableCellCustom>
        );
      },
    },
    {
      id: "queue",
      accessorKey: "queueType",
      header: () => <TableHeadCustom>Queue</TableHeadCustom>,
      cell: ({ row }) => {
        const queue = props.searchParams.get("queue")!;
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
      id: "last-crawled-at",
      accessorKey: "lastCrawledAt",
      header: () => <TableHeadCustom>Last Crawled At</TableHeadCustom>,
      cell: ({ row }) => {
        const lastT = row.original.lastCrawledAt;
        let showT = "Not Crawled Yet";
        if (lastT !== "null") {
          showT = format(toDate(row.original.lastCrawledAt), "do MMM yyyy, HH:mm:ss");
        }
        return <TableCellCustom>{showT}</TableCellCustom>;
      },
    },
    {
      id: "more-info",
      accessorKey: "moreInfo",
      header: () => <TableHeadCustom>More Info</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <ReferenceDrawer
            variant="normal"
            buttonTitle="more info"
            title="Reference Information"
            params={props.params}
            searchParams={props.searchParams}
            resource={row.original.subscriptionId}
          />
        );
      },
    },
  ];

  if (props.searchParams.get("refStatus") === "CLOSED") {
    columns.splice(5, 2);
  }

  const referenceAllQuery = useReferenceAllQuery(props.params, props.searchParams);

  if (referenceAllQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (referenceAllQuery.isError || referenceAllQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {referenceAllQuery.error?.message}</p>
      </div>
    );
  }

  if (referenceAllQuery.data && !referenceAllQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{referenceAllQuery.data?.data}</p>
      </div>
    );
  }

  return <TableDataStaticComponent data={referenceAllQuery.data} columns={columns} />;
};
