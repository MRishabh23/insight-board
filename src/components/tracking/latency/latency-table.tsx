"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { LatencyTableType, ParamType } from "@/utils/types/common";
import { UserContext } from "@/components/dashboard-layout-component";
import { useLatencyQuery } from "@/utils/query";
import { TableDataLatencyComponent } from "./latency-data-table";

export const columns: ColumnDef<LatencyTableType>[] = [
  {
    id: "carrier",
    accessorKey: "carrier",
    header: () => <TableHeadCustom className="w-32">Carrier</TableHeadCustom>,
    cell: ({ row }) => (
      <TableCellCustom>{row.original.carrier}</TableCellCustom>
    ),
    meta: {
      className: "sticky left-0 bg-white",
    },
  },
  {
    id: "ref-type",
    accessorKey: "refType",
    header: () => (
      <TableHeadCustom className="w-32">Reference Type</TableHeadCustom>
    ),
    cell: ({ row }) => {
      const ref = row.original.refType;
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
    id: "queue",
    accessorKey: "queueType",
    header: () => <TableHeadCustom>Queue</TableHeadCustom>,
    cell: ({ row }) => {
      const queue = row.original.queue;
      const qType = queue.includes("normal")
        ? "Normal"
        : queue.includes("adaptive")
        ? "Adaptive"
        : queue.includes("rnf")
        ? "RNF"
        : "";

      return <TableCellCustom>{qType}</TableCellCustom>;
    },
  },
  {
    id: "total",
    accessorKey: "total",
    header: () => {
      return <TableHeadCustom>Total</TableHeadCustom>;
    },
    cell: ({ row }) => {
      const totalC =
        (row.original.first || 0) +
        (row.original.second || 0) +
        (row.original.third || 0) +
        (row.original.fourth || 0) +
        (row.original.fifth || 0) +
        (row.original.sixth || 0) +
        (row.original.seventh || 0) +
        (row.original.eight || 0) +
        (row.original.ninth || 0);
      return <TableCellCustom>{totalC}</TableCellCustom>;
    },
  },
  {
    id: "first",
    accessorKey: "first",
    header: () => <TableHeadCustom>0_1</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.first || 0}</TableCellCustom>;
    },
  },
  {
    id: "second",
    accessorKey: "second",
    header: () => <TableHeadCustom>1_2</TableHeadCustom>,
    cell: ({ row }) => (
      <TableCellCustom>{row.original.second || 0}</TableCellCustom>
    ),
  },
  {
    id: "third",
    accessorKey: "third",
    header: () => <TableHeadCustom>2_4</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.third || 0}</TableCellCustom>;
    },
  },
  {
    id: "fourth",
    accessorKey: "fourth",
    header: () => <TableHeadCustom>4_8</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.fourth || 0}</TableCellCustom>;
    },
  },
  {
    id: "fifth",
    accessorKey: "fifth",
    header: () => <TableHeadCustom>8_12</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.fifth || 0}</TableCellCustom>;
    },
  },
  {
    id: "sixth",
    accessorKey: "sixth",
    header: () => <TableHeadCustom>12_16</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.sixth || 0}</TableCellCustom>;
    },
  },
  {
    id: "seventh",
    accessorKey: "seventh",
    header: () => <TableHeadCustom>16_24</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.seventh || 0}</TableCellCustom>;
    },
  },
  {
    id: "eight",
    accessorKey: "eight",
    header: () => <TableHeadCustom>24_48</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.eight || 0}</TableCellCustom>;
    },
  },
  {
    id: "ninth",
    accessorKey: "ninth",
    header: () => <TableHeadCustom>{">48"}</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.ninth || 0}</TableCellCustom>;
    },
  },
];

export function LatencyTable() {
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

  const latencyQuery = useLatencyQuery(
    username || "",
    params,
    newCarrOpt,
    searchParams
  );

  if (latencyQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }

  if (latencyQuery.isError || latencyQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <p className="text-red-500">Error: {latencyQuery.error?.message}</p>
      </div>
    );
  }

  if (latencyQuery.data && !latencyQuery.data?.data?.success) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-red-500">{latencyQuery.data?.data?.message}</p>
      </div>
    );
  }

  if (!latencyQuery.data) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-lg font-bold">Select a carrier to view latency.</p>
      </div>
    );
  }

  return (
    <TableDataLatencyComponent data={latencyQuery.data} columns={columns} />
  );
}
