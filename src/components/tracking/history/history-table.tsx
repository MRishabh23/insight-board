"use client";

import * as React from "react";
import { ColumnDef, SortingFn } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableCellTooltip, TableCellTooltipScroll, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { format, getTime, toDate } from "date-fns";
import { ParamType, HistoryType } from "@/utils/types/common";
import { useHistoryQuery } from "@/utils/query";
import { cn } from "@/lib/utils";
import { HistoryDrawer } from "@/components/tracking/history/history-drawer-component";
import { TableDataStaticStateComponent } from "@/components/data-table-static";

export function HistoryTable() {
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  if (!searchParams.get("subId")) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl font-bold">
        Enter the Subscription Id to see history!
      </div>
    );
  }

  return <HistoryData params={params} searchParams={searchParams} />;
}

const HistoryData = ({ ...props }) => {
  const historyQuery = useHistoryQuery(props.params, props.searchParams);

  const sortSchedulerFn: SortingFn<HistoryType> = (rowA, rowB, _columnId) => {
    const statusA = +rowA.original.k;
    const statusB = +rowB.original.k;
    return statusA - statusB;
  };

  const sortStatusFn: SortingFn<HistoryType> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.v.crawl_status;
    const statusB = rowB.original.v.crawl_status;
    const statusOrder = ["SUCCESS", "FAILED"];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  };

  const columns: ColumnDef<HistoryType>[] = [
    {
      id: "subscription-id",
      accessorKey: "subId",
      header: () => <TableHeadCustom>Subscription Id</TableHeadCustom>,
      cell: () => <TableCellCustom className="font-semibold">{props.searchParams.get("subId")}</TableCellCustom>,
      meta: {
        className: "sticky left-0 bg-white",
      },
      enableSorting: false,
    },
    {
      id: "transaction-id",
      accessorKey: "transactionId",
      header: () => <TableHeadCustom>Transaction Id</TableHeadCustom>,
      cell: ({ row }) => {
        const tnId = row.original.v.transactionId ? row.original.v.transactionId : "N/A";
        return <TableCellCustom>{tnId}</TableCellCustom>;
      },
      enableSorting: false,
    },
    {
      id: "queue-name",
      accessorKey: "QueueName",
      header: () => <TableHeadCustom>Queue</TableHeadCustom>,
      cell: ({ row }) => {
        const q = row.original.v.QueueName ? row.original.v.QueueName : "N/A";
        return <TableCellCustom>{q}</TableCellCustom>;
      },
      enableSorting: false,
    },
    {
      id: "created-at",
      accessorKey: "insertion_time",
      header: () => <TableHeadCustom>Created At</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <TableCellCustom>{format(toDate(row.original.v.insertion_time), "do MMM yyyy, HH:mm:ss")}</TableCellCustom>
        );
      },
      enableSorting: false,
    },
    {
      id: "crawl-status",
      accessorKey: "crawl_status",
      header: () => <TableHeadCustom>Crawl Status</TableHeadCustom>,
      cell: ({ row }) => {
        const status = row.original.v.crawl_status === undefined ? "No Data" : row.original.v.crawl_status;
        const tip = row.original.v.error === "" ? "No error" : row.original.v.error;
        return (
          <TableCellCustom>
            <TableCellTooltip tip={tip}>
              <Badge className={cn(status === "SUCCESS" ? "bg-green-400" : "bg-red-500")}>{status}</Badge>
            </TableCellTooltip>
          </TableCellCustom>
        );
      },
      sortingFn: sortStatusFn,
    },
    {
      id: "scheduler-id",
      accessorKey: "schedulerId",
      header: () => <TableHeadCustom>Scheduler Id</TableHeadCustom>,
      cell: ({ row }) => <TableCellCustom>{row.original.k}</TableCellCustom>,
      sortingFn: sortSchedulerFn,
    },
    {
      id: "response-sent",
      accessorKey: "responseSent",
      header: () => <TableHeadCustom>Response Sent</TableHeadCustom>,
      cell: ({ row }) => {
        const response = row.original.v.fkMappedJsonResourceId ? row.original.v.fkMappedJsonResourceId : "No data";
        const latestRes = row.original.v.latestFKMappedJsonResourceId
          ? row.original.v.latestFKMappedJsonResourceId
          : "No data";
        const error = row.original.v.error;
        if (error) {
          return (
            <TableCellCustom>
              <TableCellTooltipScroll
                tip={row.original.v.errorMsg.error ? row.original.v.errorMsg.error : row.original.v.errorMsg}
              >
                {error}
              </TableCellTooltipScroll>
            </TableCellCustom>
          );
        }
        if (
          response !== "No data" &&
          response !== "null" &&
          response === "SAME_PAYLOAD" &&
          latestRes !== "null" &&
          latestRes !== "No data"
        ) {
          return (
            <HistoryDrawer
              variant="warning"
              buttonTitle="Same"
              title="Response Sent"
              params={props.params}
              schedulerId={row.original.k}
              resourceId={latestRes}
            />
          );
        }
        if (response !== "No data" && response !== "null" && response !== "SAME_PAYLOAD") {
          return (
            <HistoryDrawer
              variant="success"
              buttonTitle="New events"
              title="Response Sent"
              params={props.params}
              schedulerId={row.original.k}
              resourceId={response}
            />
          );
        }
        if (response !== "No data" && response !== "null" && response === "SAME_PAYLOAD" && latestRes === "") {
          return <TableCellCustom>SAME PAYLOAD</TableCellCustom>;
        }
        if (response === "No data" || response === "null") {
          return <TableCellCustom>PAYLOAD</TableCellCustom>;
        }
        return <TableCellCustom>Unhandled</TableCellCustom>;
      },
      enableSorting: false,
    },
    {
      id: "crawled-output",
      accessorKey: "crawledOutput",
      header: () => <TableHeadCustom>Crawled Output</TableHeadCustom>,
      cell: ({ row }) => {
        const response = row.original.v.fkMappedJsonResourceId ? row.original.v.fkMappedJsonResourceId : "No data";
        const crawledRes = row.original.v.crawledJsonResourceId ? row.original.v.crawledJsonResourceId : "No data";
        const error = row.original.v.error;
        if (error) {
          return (
            <TableCellCustom>
              <TableCellTooltipScroll
                tip={row.original.v.errorMsg.error ? row.original.v.errorMsg.error : row.original.v.errorMsg}
              >
                {error}
              </TableCellTooltipScroll>
            </TableCellCustom>
          );
        }
        if (crawledRes !== "No data" && crawledRes !== "null" && response === "SAME_PAYLOAD") {
          return (
            <HistoryDrawer
              variant="warning"
              buttonTitle="Same"
              title="Crawled Output"
              params={props.params}
              schedulerId={row.original.k}
              resourceId={crawledRes}
            />
          );
        }
        if (crawledRes !== "No data" && crawledRes !== "null" && response === "No data") {
          return (
            <HistoryDrawer
              variant="normal"
              buttonTitle="Crawled JSON"
              title="Crawled Output"
              params={props.params}
              schedulerId={row.original.k}
              resourceId={crawledRes}
            />
          );
        }
        if (
          crawledRes !== "No data" &&
          crawledRes !== "null" &&
          response !== "No data" &&
          response !== "null" &&
          response !== "SAME_PAYLOAD"
        ) {
          return (
            <HistoryDrawer
              variant="success"
              buttonTitle="New events"
              title="Crawled Output"
              params={props.params}
              schedulerId={row.original.k}
              resourceId={crawledRes}
            />
          );
        }
        if (crawledRes !== "No data" && crawledRes !== "null" && (response === "No data" || response === "null")) {
          return (
            <HistoryDrawer
              variant="normal"
              buttonTitle="Crawled JSON"
              title="Crawled Output"
              params={props.params}
              schedulerId={row.original.k}
              resourceId={crawledRes}
            />
          );
        }
        return <TableCellCustom>Unhandled</TableCellCustom>;
      },
      enableSorting: false,
    },
  ];

  if (historyQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (historyQuery.isError || historyQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {historyQuery.error?.message}</p>
      </div>
    );
  }

  if (historyQuery.data && !historyQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{historyQuery.data?.data}</p>
      </div>
    );
  }

  return <TableDataStaticStateComponent tableType="history" data={historyQuery.data} columns={columns} />;
};
