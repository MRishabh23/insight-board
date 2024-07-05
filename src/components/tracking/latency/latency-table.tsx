"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { LatencyTableType, ParamType } from "@/utils/types/common";
import { useLatencyQuery } from "@/utils/query";
import { TableDataDefaultComponent } from "@/components/data-table-default";

export const columns: ColumnDef<LatencyTableType>[] = [
  {
    id: "carrier",
    accessorKey: "carrier",
    header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
    cell: ({ row }) => <TableCellCustom className="text-[15px] font-semibold">{row.original.carrier}</TableCellCustom>,
    meta: {
      className: "sticky left-0 bg-white",
    },
    enableSorting: false,
  },
  {
    id: "ref-type",
    accessorKey: "refType",
    header: () => <TableHeadCustom>Reference Type</TableHeadCustom>,
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
    enableSorting: false,
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
    enableSorting: false,
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
        (row.original.ninth || 0) +
        (row.original.tenth || 0);
      return <TableCellCustom>{totalC}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "first",
    accessorKey: "first",
    header: () => <TableHeadCustom>0_1</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.first || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "second",
    accessorKey: "second",
    header: () => <TableHeadCustom>1_2</TableHeadCustom>,
    cell: ({ row }) => <TableCellCustom>{row.original.second || 0}</TableCellCustom>,
    enableSorting: false,
  },
  {
    id: "third",
    accessorKey: "third",
    header: () => <TableHeadCustom>2_4</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.third || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "fourth",
    accessorKey: "fourth",
    header: () => <TableHeadCustom>4_8</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.fourth || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "fifth",
    accessorKey: "fifth",
    header: () => <TableHeadCustom>8_12</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.fifth || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "sixth",
    accessorKey: "sixth",
    header: () => <TableHeadCustom>12_16</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.sixth || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "seventh",
    accessorKey: "seventh",
    header: () => <TableHeadCustom>16_24</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.seventh || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "eight",
    accessorKey: "eight",
    header: () => <TableHeadCustom>24_48</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.eight || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "ninth",
    accessorKey: "ninth",
    header: () => <TableHeadCustom>{"48_120"}</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom>{row.original.ninth || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
  {
    id: "tenth",
    accessorKey: "tenth",
    header: () => <TableHeadCustom>{">5days"}</TableHeadCustom>,
    cell: ({ row }) => {
      return <TableCellCustom className="text-red-500">{row.original.tenth || 0}</TableCellCustom>;
    },
    enableSorting: false,
  },
];

export function LatencyTable() {
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  const queryCarriers = React.useMemo(
    () => (searchParams.get("carriers") ? searchParams.get("carriers")?.split(",") : []),
    [searchParams],
  );
  let newCarrOpt: string[] = [];

  if (queryCarriers !== undefined && queryCarriers.length > 0) {
    queryCarriers.map((carrier) => {
      if (carrier) {
        newCarrOpt.push(carrier);
      }
    });
  }

  if (!searchParams.get("carriers")) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl font-bold">Select a carrier to view latency.</div>
    );
  }

  return <LatencyData params={params} carriers={newCarrOpt} searchParams={searchParams} />;
}

const LatencyData = ({ ...props }) => {
  const latencyQuery = useLatencyQuery(props.params, props.carriers, props.searchParams);

  if (latencyQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (latencyQuery.isError || latencyQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {latencyQuery.error?.message}</p>
      </div>
    );
  }

  if (latencyQuery.data && !latencyQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{latencyQuery.data?.data}</p>
      </div>
    );
  }

  return <TableDataDefaultComponent data={latencyQuery.data} columns={columns} />;
};
