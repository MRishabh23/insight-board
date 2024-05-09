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
import { HistoryType } from "@/utils/types/DashboardType";
import { useHistoryQuery } from "@/utils/query";
import { cn } from "@/lib/utils";
import { CustomDrawer } from "@/components/drawer-cust";

export function HistoryTable() {
  const username = React.useContext(UserContext);
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  if (!searchParams.get("subId")) {
    return (
      <div className="flex justify-center items-center mt-10 text-xl font-bold">
        Enter the Subscription Id to see history!
      </div>
    );
  }

  return (
    <HistoryData
      username={username || ""}
      params={params}
      searchParams={searchParams}
    />
  );
}

const HistoryData = ({ ...props }) => {
  const summaryQuery = useHistoryQuery(
    props.username || "",
    props.params,
    props.searchParams
  );

  const columns: ColumnDef<HistoryType>[] = [
    {
      id: "subscription-id",
      accessorKey: "subId",
      header: () => <TableHeadCustom>Subscription Id</TableHeadCustom>,
      cell: () => <div>{props.searchParams.get("subId")}</div>,
      meta: {
        className: "sticky left-0 bg-white",
      },
    },
    {
      id: "created-at",
      accessorKey: "insertion_time",
      header: () => <TableHeadCustom>Created At</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <div>
            {format(
              toDate(row.original.v.insertion_time),
              "do MMM yyyy, HH:mm:ss"
            )}
          </div>
        );
      },
    },
    {
      id: "crawl-status",
      accessorKey: "crawl_status",
      header: () => <TableHeadCustom>Crawl Status</TableHeadCustom>,
      cell: ({ row }) => {
        const status =
          row.original.v.crawl_status === undefined
            ? "No Data"
            : row.original.v.crawl_status;
        const tip =
          row.original.v.error === "" ? "No error" : row.original.v.error;
        return (
          <TableCellTooltip tip={tip}>
            <Badge
              className={cn(
                status === "SUCCESS" ? "bg-green-400" : "bg-red-500"
              )}
            >
              {status}
            </Badge>
          </TableCellTooltip>
        );
      },
    },
    {
      id: "scheduler-id",
      accessorKey: "schedulerId",
      header: () => <TableHeadCustom>Scheduler Id</TableHeadCustom>,
      cell: ({ row }) => <div>{row.original.k}</div>,
    },
    {
      id: "response-sent",
      accessorKey: "responseSent",
      header: () => <TableHeadCustom>Response Sent</TableHeadCustom>,
      cell: ({ row }) => {
        const response = row.original.v.fkMappedJsonResourceId
          ? row.original.v.fkMappedJsonResourceId
          : "No data";
        const latestRes = row.original.v.latestFKMappedJsonResourceId
          ? row.original.v.latestFKMappedJsonResourceId
          : "No data";
        const error = row.original.v.error;
        if (error) {
          return <div>{error}</div>;
        }
        if (
          response !== "No data" &&
          response !== "null" &&
          response === "SAME_PAYLOAD" &&
          latestRes !== "null" &&
          latestRes !== "No data"
        ) {
          return (
            <CustomDrawer
              variant="warning"
              buttonTitle="Same as before"
              title="Response Sent"
              username={props.username || ""}
              params={props.params}
              schedulerId={row.original.k}
              resourceId={latestRes}
            />
          );
        }
        if (
          response !== "No data" &&
          response !== "null" &&
          response !== "SAME_PAYLOAD"
        ) {
          return (
            <CustomDrawer
            variant="success"
              buttonTitle="New events found"
              title="Response Sent"
              username={props.username || ""}
              params={props.params}
              schedulerId={row.original.k}
              resourceId={response}
            />
          );
        }
        if (
          response !== "No data" &&
          response !== "null" &&
          response === "SAME_PAYLOAD" &&
          latestRes === ""
        ) {
          return <div>SAME PAYLOAD</div>;
        }
        return <div>Unhandled</div>;
      },
    },
    {
      id: "crawled-output",
      accessorKey: "crawledOutput",
      header: () => <TableHeadCustom>Crawled Output</TableHeadCustom>,
      cell: ({ row }) => {
        const response = row.original.v.fkMappedJsonResourceId
          ? row.original.v.fkMappedJsonResourceId
          : "No data";
        const crawledRes = row.original.v.crawledJsonResourceId
          ? row.original.v.crawledJsonResourceId
          : "No data";
        const error = row.original.v.error;
        if (error) {
          return <div>{error}</div>;
        }
        if (
          crawledRes !== "No data" &&
          crawledRes !== "null" &&
          response === "SAME_PAYLOAD"
        ) {
          return (
            <CustomDrawer
            variant="warning"
              buttonTitle="Same as before"
              title="Crawled Output"
              username={props.username || ""}
              params={props.params}
              schedulerId={row.original.k}
              resourceId={crawledRes}
            />
          );
        }
        if (
          crawledRes !== "No data" &&
          crawledRes !== "null" &&
          response === "No data"
        ) {
          return (
            <CustomDrawer
            variant="normal"
              buttonTitle="Crawled JSON"
              title="Crawled Output"
              username={props.username || ""}
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
            <CustomDrawer
            variant="success"
              buttonTitle="New events found"
              title="Crawled Output"
              username={props.username || ""}
              params={props.params}
              schedulerId={row.original.k}
              resourceId={crawledRes}
            />
          );
        }
        return <div>Unhandled</div>;
      },
    },
  ];

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
};
