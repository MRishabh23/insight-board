"use client";

import * as React from "react";
import { ColumnDef, SortingFn } from "@tanstack/react-table";
import { TableDataStaticComponent } from "@/components/data-table-static";
import { CgSpinnerAlt } from "react-icons/cg";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { format, toDate } from "date-fns";
import { IssueColumnType } from "@/utils/types/common";
import { useIssueQuery } from "@/utils/query";
import { IssueDetailDrawer } from "./issue-detail-drawer";
import { CreateEditIssueDrawer } from "./create-edit-issue-drawer";
import { DeleteIssueForm } from "./delete-issue-dialog";
import { NotificationIssueForm } from "./notification-issue-dialog";
import { CloseIssueForm } from "./close-issue-dialog";
import { Button } from "@/components/ui/button";

export function IssueTable({ ...props }) {
  const sortModeFn: SortingFn<IssueColumnType> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.value.mode;
    const statusB = rowB.original.value.mode;
    const statusOrder = ["air", "ocean", "terminal"];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  };

  const sortSeverityFn: SortingFn<IssueColumnType> = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.value.severity;
    const statusB = rowB.original.value.severity;
    const statusOrder = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  };

  const sortCreatedFn: SortingFn<IssueColumnType> = (rowA, rowB, _columnId) => {
    const statusA = +rowA.original.created_at - 19800000;
    const statusB = +rowB.original.created_at - 19800000;
    return statusA - statusB;
  };

  const sortModifiedFn: SortingFn<IssueColumnType> = (rowA, rowB, _columnId) => {
    const statusA = +rowA.original.modified_at - 19800000;
    const statusB = +rowB.original.modified_at - 19800000;
    return statusA - statusB;
  };

  const columns: ColumnDef<IssueColumnType>[] = [
    {
      id: "issue-key",
      accessorKey: "issueKey",
      header: () => <TableHeadCustom>Issue Id</TableHeadCustom>,
      cell: ({ row }) => <TableCellCustom className="font-semibold">{row.original.value.issueKey}</TableCellCustom>,
      meta: {
        className: "sticky left-0 bg-white",
      },
      enableSorting: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => <TableHeadCustom>Status</TableHeadCustom>,
      cell: ({ row }) => {
        const status = row.original.value.status;
        const commonClass = "border p-[5px] rounded-sm";
        let statusColor = commonClass + " bg-green-50 border-green-500 text-green-500";
        if (status === "CLOSED") statusColor = commonClass + " bg-red-50 border-red-500 text-red-500";
        return <TableCellCustom className={statusColor}>{status}</TableCellCustom>;
      },
      enableSorting: false,
    },
    {
      id: "mode",
      accessorKey: "mode",
      header: () => <TableHeadCustom>Mode</TableHeadCustom>,
      cell: ({ row }) => <TableCellCustom>{row.original.value.mode.toUpperCase()}</TableCellCustom>,
      sortingFn: sortModeFn,
    },
    {
      id: "severity",
      accessorKey: "severity",
      header: () => <TableHeadCustom>Severity</TableHeadCustom>,
      cell: ({ row }) => {
        const severity = row.original.value.severity;
        const commonClass = "border p-[5px] rounded-sm";
        let severityColor = commonClass + " bg-red-50 border-red-500 text-red-500";
        if (severity === "LOW") severityColor = commonClass + " bg-blue-50 border-blue-500 text-blue-500";
        if (severity === "MEDIUM") severityColor = commonClass + " bg-yellow-50 border-yellow-500 text-yellow-500";
        if (severity === "HIGH") severityColor = commonClass + " bg-orange-50 border-orange-500 text-orange-500";
        return <TableCellCustom className={severityColor}>{severity}</TableCellCustom>;
      },
      sortingFn: sortSeverityFn,
    },
    {
      id: "carrier",
      accessorKey: "carrier",
      header: () => <TableHeadCustom>Carrier</TableHeadCustom>,
      cell: ({ row }) => {
        const carrier = row.original.value.carrier;
        return <TableCellCustom>{carrier ? carrier : "-"}</TableCellCustom>;
      },
      enableSorting: false,
    },
    {
      id: "created-at",
      accessorKey: "createdAt",
      header: () => <TableHeadCustom>Created At</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <TableCellCustom>
            {format(toDate(+row.original.created_at - 19800000), "do MMM yyyy, HH:mm:ss")}
          </TableCellCustom>
        );
      },
      sortingFn: sortCreatedFn,
    },
    {
      id: "modified-at",
      accessorKey: "modifiedAt",
      header: () => <TableHeadCustom>Modified At</TableHeadCustom>,
      cell: ({ row }) => {
        return (
          <TableCellCustom>
            {format(toDate(+row.original.modified_at - 19800000), "do MMM yyyy, HH:mm:ss")}
          </TableCellCustom>
        );
      },
      sortingFn: sortModifiedFn,
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
      enableSorting: false,
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
            tableType={props.type.toUpperCase()}
            issueKey={row.original.issue_key}
            issueValue={row.original.value}
          />
        );
      },
      enableSorting: false,
    },
    {
      id: "send-notification",
      accessorKey: "sendNotification",
      header: () => <TableHeadCustom>Send Notification</TableHeadCustom>,
      cell: ({ row }) => {
        return <NotificationIssueForm issueKey={row.original.issue_key} tableType={props.type.toUpperCase()} />;
      },
      enableSorting: false,
    },
    {
      id: "close-issue",
      accessorKey: "closeIssue",
      header: () => <TableHeadCustom>Close</TableHeadCustom>,
      cell: ({ row }) => {
        return <CloseIssueForm issueKey={row.original.issue_key} />;
      },
      enableSorting: false,
    },
    {
      id: "delete",
      accessorKey: "delete",
      header: () => <TableHeadCustom>Delete</TableHeadCustom>,
      cell: ({ row }) => {
        return <DeleteIssueForm issueKey={row.original.issue_key} tableType={props.type.toUpperCase()} />;
      },
      enableSorting: false,
    },
  ];

  if (props.type === "closed") {
    columns.splice(10, 2);
  }

  const issueQuery = useIssueQuery(props.type.toUpperCase());

  if (issueQuery.isPending) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (issueQuery.isError || issueQuery.error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {issueQuery.error?.message}</p>
      </div>
    );
  }

  if (issueQuery.data && !issueQuery.data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-xl font-bold">{issueQuery.data?.data}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-end p-5">
          <Button onMouseDown={() => issueQuery.refetch()} disabled={issueQuery.isFetching}>
            {issueQuery.isFetching ? "Fetching..." : "Refresh"}
          </Button>
        </div>
        {issueQuery.isFetching ? (
          <div className="flex h-full flex-col items-center justify-center">
            <CgSpinnerAlt className="animate-spin text-lg" />
          </div>
        ) : (
          <TableDataStaticComponent data={issueQuery.data} columns={columns} />
        )}
      </div>
    </>
  );
}
