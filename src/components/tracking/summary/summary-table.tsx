"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableDataComponent } from "@/components/data-table";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import {
  TableCellTooltip,
  TableHeadCustom,
} from "@/components/table-comp/table-collection";
import { Badge } from "@/components/ui/badge";
import { format, toDate } from "date-fns";
import { ParamType } from "@/utils/types/ParamType";
import { UserContext } from "@/app/dashboard/layout";
import { SummaryType } from "@/utils/types/DashboardType";
import { useSummaryQuery } from "@/utils/query";

export const columns: ColumnDef<SummaryType>[] = [
  {
    id: "carrier",
    accessorKey: "jtCarrierCode",
    header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
    cell: ({ row }) => <div>{row.original.jtCarrierCode}</div>,
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

      return <Badge className="capitalize bg-stone-500">{qType}</Badge>;
    },
  },
  {
    id: "active",
    accessorKey: "jtCrawledTotal",
    header: () => <TableHeadCustom>Active</TableHeadCustom>,
    cell: ({ row }) => <div>{row.original.jtCrawledTotal}</div>,
  },
  {
    id: "avg-age",
    accessorKey: "AvgAge",
    header: () => <TableHeadCustom>Avg Age</TableHeadCustom>,
    cell: ({ row }) => {
      const age = row.original.AvgAge;
      return (
        <div className={`${age >= 90 ? "text-red-500" : "text-inherit"}`}>
          {age} days
        </div>
      );
    },
  },
  {
    id: "last-run",
    accessorKey: "lastRunStartAt",
    header: () => <TableHeadCustom>Last Run</TableHeadCustom>,
    cell: ({ row }) => <div>{row.original.lastRunStartAt} ago</div>,
  },
  {
    id: "duration",
    accessorKey: "timeDiffInFk",
    header: () => <TableHeadCustom>Duration</TableHeadCustom>,
    cell: ({ row }) => {
      const durDiff = row.original.timeDiffMinutes;
      return (
        <div className={`${durDiff >= 90 ? "text-red-500" : "text-inherit"}`}>
          {row.original.timeDiffInFk}
        </div>
      );
    },
  },
  {
    id: "success",
    accessorKey: "successCount",
    header: () => <TableHeadCustom>Success</TableHeadCustom>,
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.successCount} ({row.original.successRatio}%)
        </div>
      );
    },
  },
  {
    id: "rnf",
    accessorKey: "getReferenceNotFound",
    header: () => <TableHeadCustom>RNF (404)</TableHeadCustom>,
    cell: ({ row }) => {
      const rnfRatio = row.original.getReferenceNotFoundPercentage;
      const queue = row.original.queueType;
      return (
        <div
          className={`${
            rnfRatio >= 20 && !queue.includes("RNF")
              ? "text-red-500"
              : "text-inherit"
          }`}
        >
          {row.original.getReferenceNotFound}
        </div>
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
          <div
            className={`${failRatio >= 3.0 ? "text-red-500" : "text-inherit"}`}
          >
            {row.original.failCount} ({failRatio}%)
          </div>
        </TableCellTooltip>
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
        <TableCellTooltip
          tip={
            <div>
              <p>WithIn Cron: {row.original.diffRateCountWithInCron}</p>
              <p>Above Cron: {row.original.diffRateCountAboveCron}</p>
            </div>
          }
        >
          <div
            className={`${diffRatio >= 10.0 ? "text-red-500" : "text-inherit"}`}
          >
            {row.original.getTotalDiffFound} ({diffRatio}%)
          </div>
        </TableCellTooltip>
      );
    },
  },
  {
    id: "crawl-frequency",
    accessorKey: "crawlFrequency",
    header: () => <TableHeadCustom>Crawl Frequency</TableHeadCustom>,
    cell: ({ row }) => {
      return <div className="">{row.original.crawlFrequency}</div>;
    },
  },
  {
    id: "duration-to-launch",
    accessorKey: "durationToLaunch",
    header: () => <TableHeadCustom>Duration To Launch</TableHeadCustom>,
    cell: ({ row }) => {
      return <div className="">{row.original.durationToLaunch}</div>;
    },
  },
  {
    id: "deliver-count",
    accessorKey: "deliverCount",
    header: () => <TableHeadCustom>Deliver Count</TableHeadCustom>,
    cell: ({ row }) => {
      return <div className="">{row.original.deliverCount}</div>;
    },
  },
  {
    id: "close-count",
    accessorKey: "closeCount",
    header: () => <TableHeadCustom>Close Count</TableHeadCustom>,
    cell: ({ row }) => {
      return <div className="">{row.original.closeCount}</div>;
    },
  },
  {
    id: "fk-timeout",
    accessorKey: "toFKFailedNotSent",
    header: () => <TableHeadCustom>FK Timeout</TableHeadCustom>,
    cell: ({ row }) => {
      return <div className="">{row.original.toFKFailedNotSent}</div>;
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
        <TableCellTooltip
          tip={
            <div>
              <p>WithIn Cron: {row.original.diffHitRateCountWithInCron}</p>
              <p>Above Cron: {row.original.diffHitRateCountAboveCron}</p>
            </div>
          }
        >
          <div className={`${hitPer >= 1.0 ? "text-red-500" : "text-inherit"}`}>
            {queue.includes("ADAPTIVE")
              ? `${row.original.hitRateCount} (${hitPer}%)`
              : "NA"}
          </div>
        </TableCellTooltip>
      );
    },
  },
  {
    id: "scheduler-id",
    accessorKey: "schedulerId",
    header: () => <TableHeadCustom>Scheduler Id</TableHeadCustom>,
    cell: ({ row }) => {
      return <div className="">{row.original.schedulerId}</div>;
    },
  },
  {
    id: "start-time",
    accessorKey: "start_time",
    header: () => <TableHeadCustom>Start Time</TableHeadCustom>,
    cell: ({ row }) => {
      return (
        <div className="">
          {format(toDate(row.original.start_time), "do MMM yyyy, HH:mm:ss")}
        </div>
      );
    },
  },
  {
    id: "end-time",
    accessorKey: "end_time",
    header: () => <TableHeadCustom>End Time</TableHeadCustom>,
    cell: ({ row }) => {
      return (
        <div className="">
          {format(toDate(row.original.end_time), "do MMM yyyy, HH:mm:ss")}
        </div>
      );
    },
  },
];

export function SummaryTable() {
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

  const summaryQuery = useSummaryQuery(
    username || "",
    params,
    newCarrOpt,
    searchParams
  );

  if (summaryQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }

  if (summaryQuery.isError || summaryQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <p className="text-red-500">Error: {summaryQuery.error?.message}</p>
      </div>
    );
  }

  return <TableDataComponent data={summaryQuery.data} columns={columns} />;
}
