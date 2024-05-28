"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableDataStaticComponent } from "@/components/data-table-static";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { format, toDate } from "date-fns";
import { IssueColumnType } from "@/utils/types/common";
import { useIssueQuery } from "@/utils/query";
import { Button } from "@/components/ui/button";
import { IssueDetailDrawer } from "./issue-detail-drawer";
import { CreateEditIssueDrawer } from "./create-edit-issue-drawer";

export function IssueTable({ ...props }) {
  const columns: ColumnDef<IssueColumnType>[] = [
    {
      id: "issue",
      accessorKey: "issue",
      header: () => <TableHeadCustom className="w-32">Issue</TableHeadCustom>,
      cell: ({ row }) => (
        <TableCellCustom>{row.original.value.issue}</TableCellCustom>
      ),
      meta: {
        className: "sticky left-0 bg-white",
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => <TableHeadCustom>Status</TableHeadCustom>,
      cell: ({ row }) => {
        const status = row.original.value.status;
        const commonClass = "border p-[5px] rounded-sm";
        let statusColor =
          commonClass + " bg-green-50 border-green-500 text-green-500";
        if (status === "CLOSED")
          statusColor = commonClass + " bg-red-50 border-red-500 text-red-500";
        return (
          <TableCellCustom className={statusColor}>{status}</TableCellCustom>
        );
      },
    },
    {
      id: "mode",
      accessorKey: "mode",
      header: () => <TableHeadCustom>Mode</TableHeadCustom>,
      cell: ({ row }) => (
        <TableCellCustom>
          {row.original.value.mode.toUpperCase()}
        </TableCellCustom>
      ),
    },
    {
      id: "severity",
      accessorKey: "severity",
      header: () => <TableHeadCustom>Severity</TableHeadCustom>,
      cell: ({ row }) => {
        const severity = row.original.value.severity;
        const commonClass = "border p-[5px] rounded-sm";
        let severityColor =
          commonClass + " bg-red-50 border-red-500 text-red-500";
        if (severity === "LOW")
          severityColor =
            commonClass + " bg-blue-50 border-blue-500 text-blue-500";
        if (severity === "MEDIUM")
          severityColor =
            commonClass + " bg-yellow-50 border-yellow-500 text-yellow-500";
        if (severity === "HIGH")
          severityColor =
            commonClass + " bg-orange-50 border-orange-500 text-orange-500";
        return (
          <TableCellCustom className={severityColor}>
            {severity}
          </TableCellCustom>
        );
      },
    },
    {
      id: "carrier",
      accessorKey: "carrier",
      header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
      cell: ({ row }) => (
        <TableCellCustom>{row.original.value.carrier}</TableCellCustom>
      ),
    },
    {
      id: "created-at",
      accessorKey: "createdAt",
      header: () => <TableHeadCustom>Created At</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <TableCellCustom>
            {format(toDate(row.original.created_at), "do MMM yyyy, HH:mm:ss")}
          </TableCellCustom>
        );
      },
    },
    {
      id: "modified-at",
      accessorKey: "modifiedAt",
      header: () => <TableHeadCustom>Modified At</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <TableCellCustom>
            {format(toDate(row.original.modified_at), "do MMM yyyy, HH:mm:ss")}
          </TableCellCustom>
        );
      },
    },
    {
      id: "more-detail",
      accessorKey: "moreDetail",
      header: () => <TableHeadCustom>More Detail</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <IssueDetailDrawer
            variant="outline"
            title="Issue Details"
            buttonTitle="More Detail"
            data={row.original.value}
          />
        );
      },
    },
    {
      id: "edit",
      accessorKey: "edit",
      header: () => <TableHeadCustom>Edit</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <CreateEditIssueDrawer
            variant="outline"
            buttonTitle="Edit"
            title="Edit a issue"
            issue="EDIT"
            issueValue={row.original.value}
          />
        );
      },
    },
    {
      id: "send-notification",
      accessorKey: "sendNotification",
      header: () => <TableHeadCustom>Send Notification</TableHeadCustom>,
      cell: ({ row }) => {
        return <TableCellCustom>Send Notification</TableCellCustom>;
      },
    },
  ];

  if (props.type === "closed") {
    columns.splice(9, 1);
  }

  const issueQuery = useIssueQuery(props.type.toUpperCase());

  if (issueQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (issueQuery.isError || issueQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <p className="text-red-500">Error: {issueQuery.error?.message}</p>
      </div>
    );
  }

  if (issueQuery.data && !issueQuery.data?.success) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-red-500">{issueQuery.data?.data}</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full mt-5 p-4 bg-white text-primary rounded-md">
      <div className="flex justify-end p-5">
        <Button
          onMouseDown={() => issueQuery.refetch()}
          disabled={issueQuery.isFetching}
        >
          {issueQuery.isFetching ? "Fetching..." : "Refresh"}
        </Button>
      </div>
      {issueQuery.isFetching ? (
        <div className="h-full flex flex-col justify-center items-center">
          <CgSpinnerAlt className="animate-spin text-lg" />
        </div>
      ) : (
        <TableDataStaticComponent data={issueQuery.data} columns={columns} />
      )}
    </div>
  );
}
