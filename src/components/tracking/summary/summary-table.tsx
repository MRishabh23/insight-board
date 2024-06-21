"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableDataStaticComponent } from "@/components/data-table-static";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableCellTooltip, TableHeadCustom } from "@/components/table/common";
import { Badge } from "@/components/ui/badge";
import { format, toDate } from "date-fns";
import { ParamType, SummaryType } from "@/utils/types/common";
import { useSummaryQuery } from "@/utils/query";
import { ArrowUpDown } from "lucide-react";

export function SummaryTable() {
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

  const columns: ColumnDef<SummaryType>[] = [
    {
      id: "carrier",
      accessorKey: "jtCarrierCode",
      header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
      cell: ({ row }) => (
        <TableCellCustom className="text-[15px] font-semibold">{row.original.jtCarrierCode}</TableCellCustom>
      ),
      meta: {
        className: "sticky left-0 bg-white",
      },
    },
    {
      id: "queue",
      accessorKey: "queueType",
      header: () => <TableHeadCustom>Queue</TableHeadCustom>,
      cell: ({ row }) => {
        const queue = row.original.queueType;
        const qType = queue.includes("NORMAL")
          ? "normal"
          : queue.includes("ADAPTIVE")
            ? "adaptive"
            : queue.includes("RNF")
              ? "rnf"
              : "";

        return (
          <TableCellCustom>
            <Badge className="bg-stone-500 capitalize">{qType}</Badge>
          </TableCellCustom>
        );
      },
    },
    {
      id: "active",
      accessorKey: "jtCrawledTotal",
      header: ({ column }) => {
        return (
          <TableHeadCustom onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Active <ArrowUpDown className="ml-2 h-4 w-4" />
          </TableHeadCustom>
        );
      },
      cell: ({ row }) => <TableCellCustom>{row.original.jtCrawledTotal}</TableCellCustom>,
    },
    {
      id: "avg-age",
      accessorKey: "AvgAge",
      header: () => <TableHeadCustom>Avg Age</TableHeadCustom>,
      cell: ({ row }) => {
        const age = row.original.AvgAge;
        return (
          <TableCellCustom
            className={`${
              (params.mode === "ocean" && age >= 90) || (params.mode === "air" && age >= 14)
                ? "text-red-500"
                : "text-inherit"
            }`}
          >
            {age} days
          </TableCellCustom>
        );
      },
    },
    {
      id: "last-run",
      accessorKey: "lastRunStartAt",
      header: () => <TableHeadCustom>Last Run</TableHeadCustom>,
      cell: ({ row }) => <TableCellCustom>{row.original.lastRunStartAt} ago</TableCellCustom>,
    },
    {
      id: "duration",
      accessorKey: "timeDiffInFk",
      header: () => <TableHeadCustom>Duration</TableHeadCustom>,
      cell: ({ row }) => {
        const durDiff = row.original.timeDiffMinutes;
        return (
          <TableCellCustom
            className={`${
              (params.mode === "ocean" && durDiff >= 90) || (params.mode === "air" && durDiff >= 60)
                ? "text-red-500"
                : "text-inherit"
            }`}
          >
            {row.original.timeDiffInFk}
          </TableCellCustom>
        );
      },
    },
    {
      id: "success",
      accessorKey: "successCount",
      header: () => <TableHeadCustom>Success</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <TableCellCustom>
            {row.original.successCount} ({row.original.successRatio}%)
          </TableCellCustom>
        );
      },
    },
    {
      id: "rnf",
      accessorKey: "getReferenceNotFound",
      header: () => <TableHeadCustom>RNF (404)</TableHeadCustom>,
      cell: ({ row }) => {
        const rnfCount = row.original.getReferenceNotFound;
        const rnfRatio = row.original.getReferenceNotFoundPercentage;
        const queue = row.original.queueType;
        return (
          <TableCellCustom
            className={`${
              ((params.mode === "ocean" && rnfRatio > 20) || (params.mode === "air" && rnfRatio > 5)) &&
              !queue.includes("RNF")
                ? "text-red-500"
                : "text-inherit"
            }`}
          >
            {rnfCount} ({rnfRatio}%)
          </TableCellCustom>
        );
      },
    },
    {
      id: "fail",
      accessorKey: "failCount",
      header: () => <TableHeadCustom>Fail</TableHeadCustom>,
      cell: ({ row }) => {
        const failRatio = row.original.failureRatio;
        return (
          <TableCellCustom>
            <TableCellTooltip
              tip={
                <div>
                  <p>Sending Failure: {row.original.toFKFailedNotSent}</p>
                  <p>API/Scraping Failure: {row.original.toFKFailedScraping}</p>
                  <p>Mapping Failure: {row.original.toFKFailedMapping}</p>
                  <p>Validation Failure: {row.original.toFKFailedValidation}</p>
                </div>
              }
            >
              <div className={`${failRatio >= 3.0 ? "text-red-500" : "text-inherit"}`}>
                {row.original.failCount} ({failRatio}%)
              </div>
            </TableCellTooltip>
          </TableCellCustom>
        );
      },
    },
    {
      id: "diff-rate",
      accessorKey: "getTotalDiffFound",
      header: () => <TableHeadCustom>DiffRate</TableHeadCustom>,
      cell: ({ row }) => {
        const diffRatio = row.original.diffRatio;
        return (
          <TableCellCustom>
            <TableCellTooltip
              tip={
                <div>
                  <p>WithIn Cron: {row.original.diffRateCountWithInCron}</p>
                  <p>Above Cron: {row.original.diffRateCountAboveCron}</p>
                </div>
              }
            >
              <div
                className={`${
                  (params.mode === "ocean" && diffRatio >= 10.0) || (params.mode === "air" && diffRatio >= 20.0)
                    ? "text-red-500"
                    : "text-inherit"
                }`}
              >
                {row.original.getTotalDiffFound} ({diffRatio}%)
              </div>
            </TableCellTooltip>
          </TableCellCustom>
        );
      },
    },
    {
      id: "crawl-frequency",
      accessorKey: "crawlFrequency",
      header: () => <TableHeadCustom>Crawl Frequency</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{row.original.crawlFrequency}</TableCellCustom>;
      },
    },
    {
      id: "duration-to-launch",
      accessorKey: "durationToLaunch",
      header: () => <TableHeadCustom>Duration To Launch</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{row.original.durationToLaunch}</TableCellCustom>;
      },
    },
    {
      id: "deliver-count",
      accessorKey: "deliverCount",
      header: () => <TableHeadCustom>Deliver Count</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{row.original.deliverCount}</TableCellCustom>;
      },
    },
    {
      id: "close-count",
      accessorKey: "closeCount",
      header: () => <TableHeadCustom>Close Count</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{row.original.closeCount}</TableCellCustom>;
      },
    },
    {
      id: "fk-timeout",
      accessorKey: "toFKFailedNotSent",
      header: () => <TableHeadCustom>FK Timeout</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{row.original.toFKFailedNotSent}</TableCellCustom>;
      },
    },
    {
      id: "hit-rate",
      accessorKey: "hitRateCount",
      header: () => <TableHeadCustom>HitRate</TableHeadCustom>,
      cell: ({ row }) => {
        const hitPer = row.original.hitRatePer;
        const queue = row.original.queueType;
        return (
          <TableCellCustom>
            <TableCellTooltip
              tip={
                <div>
                  <p>WithIn Cron: {row.original.diffHitRateCountWithInCron}</p>
                  <p>Above Cron: {row.original.diffHitRateCountAboveCron}</p>
                </div>
              }
            >
              <div className={`${hitPer >= 1.0 ? "text-red-500" : "text-inherit"}`}>
                {queue.includes("ADAPTIVE") ? `${row.original.hitRateCount} (${hitPer}%)` : "NA"}
              </div>
            </TableCellTooltip>
          </TableCellCustom>
        );
      },
    },
    {
      id: "scheduler-id",
      accessorKey: "schedulerId",
      header: () => <TableHeadCustom>Scheduler Id</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{row.original.schedulerId}</TableCellCustom>;
      },
    },
    {
      id: "start-time",
      accessorKey: "start_time",
      header: () => <TableHeadCustom>Start Time</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{format(toDate(row.original.start_time), "do MMM yyyy, HH:mm:ss")}</TableCellCustom>;
      },
    },
    {
      id: "end-time",
      accessorKey: "end_time",
      header: () => <TableHeadCustom>End Time</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>{format(toDate(row.original.end_time), "do MMM yyyy, HH:mm:ss")}</TableCellCustom>;
      },
    },
  ];

  const summaryQuery = useSummaryQuery(params, newCarrOpt, searchParams);

  if (summaryQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (summaryQuery.isError || summaryQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {summaryQuery.error?.message}</p>
      </div>
    );
  }

  if (summaryQuery.data && !summaryQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{summaryQuery.data?.data}</p>
      </div>
    );
  }

  return <TableDataStaticComponent data={summaryQuery.data} columns={columns} />;
}
