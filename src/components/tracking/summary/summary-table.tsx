"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TableDataComponent } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { CgSpinnerAlt } from "react-icons/cg";

export type SummaryType = {
  jtCarrierCode: string;
  total_shipments: number;
  jtCrawledTotal: number;
  successCount: number;
  failCount: number;
  getTotalDiffFound: number;
  getTotalNODiffFound: number;
  getSentToFK: number;
  getNotSentToFK: number;
  getReferenceNotFound: number;
  getReferenceNotFoundPercentage: number;
  skipped404: number;
  successRatio: number;
  failureRatio: number;
  diffRatio: number;
  start_time: Date;
  end_time: Date;
  durationToLaunch: number;
  schedulerId: number;
  timeDiffMinutes: number;
  timeDiffInFk: string;
  lastRunStartAt: string;
  delayTime: number;
  lastRunStartTime: Date;
  threadPoolSize: number;
  deliverCount: number;
  closeCount: number;
  queueType: string;
  hitRateCount: number;
  hitRatePer: number;
  toFKFailedScraping: number;
  toFKFailedValidation: number;
  toFKFailedNotSent: number;
  toFKFailedMapping: number;
  crawlFrequency: string;
  referenceNotFound: number;
  refPercentage: number;
  diffRateCountWithInCron: number;
  diffRateCountAboveCron: number;
  diffHitRateCountWithInCron: number;
  diffHitRateCountAboveCron: number;
  AvgAge: number;
};



export const columns: ColumnDef<SummaryType>[] = [
  {
    accessorKey: "jtCarrierCode",
    header: "Carrier",
    cell: ({ row }) => <div>{row.getValue("jtCarrierCode")}</div>,
    meta: {
      className: "sticky left-0 bg-white",
    },
  },
  {
    accessorKey: "queueType",
    header: "Queue",
    cell: ({ row }) => {
      const queue = row.getValue("queueType") as string;
      const qType = queue.includes("NORMAL") ? "normal" : queue.includes("ADAPTIVE") ? "adaptive" : queue.includes("RNF") ? "rnf" : "";

      return (
        <div className="capitalize">{qType}</div>
      )
    },
  },
  {
    accessorKey: "jtCrawledTotal",
    header: "Active",
    cell: ({ row }) => <div>{row.getValue("jtCrawledTotal")}</div>,
  },
  {
    accessorKey: "AvgAge",
    header: "Avg Age",
    cell: ({ row }) => {
      const age = row.getValue("AvgAge");
      return (
        <div className={`${age as number >= 90 ? "text-red-500" : "inherit"}`}>{age as string} days</div>
      )
    },
  },
  {
    accessorKey: "lastRunStartAt",
    header: "Last Run",
    cell: ({ row }) => <div>{row.getValue("lastRunStartAt")} ago</div>,
  },
  {
    accessorKey: "jtCrawledTotal",
    header: "Active",
    cell: ({ row }) => <div>{row.getValue("jtCrawledTotal")}</div>,
  },
  {
    accessorKey: "timeDiffInFk",
    header: "Duration",
    cell: ({ table, row }) => {
      //const durDiff = table.options.data.filter(());
      return (
        <div>{row.getValue("timeDiffInFk")}</div>
      )
    },
  }
];

export function SummaryTable({ ...props }) {
  const searchParams = useSearchParams();
  const queryCarriers = searchParams.get("carriers")?.split(",") || [];
  let newCarrOpt: any = [];

  if (queryCarriers.length > 0) {
    queryCarriers.map((carrier) => {
      if (carrier) {
        const carrObj = {
          label: carrier,
          value: carrier,
        };
        newCarrOpt.push(carrObj);
      }
    });
  }

  const summaryQuery = useQuery({
    queryKey: [
      "summary",
      `/dashboard/tracking/${props.params.mode}/${props.params.env}/summary`,
      `${searchParams.get("carriers")}-${searchParams.get(
        "queue"
      )}-${searchParams.get("from")}-${searchParams.get("to")}`,
    ],
    queryFn: async () => {
      const response =
        props.username !== "" &&
        (await axios({
          method: "post",
          url: "/api/tracking/summary",
          data: {
            type: "GET_SUMMARY",
            username: props.username,
            env: props.params.env.toUpperCase(),
            mode: props.params.mode.toUpperCase(),
            carriers: newCarrOpt,
            queue: searchParams.get("queue"),
            startTime: searchParams.get("from") || "",
            endTime: searchParams.get("to") || "",
          },
        }));
      return response;
    },
    staleTime: 1000 * 60 * 6,
    refetchInterval: 1000 * 60 * 6,
  });

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
