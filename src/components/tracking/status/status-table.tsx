"use client";
import { TableDataStaticComponent } from "@/components/data-table-static";
import { TableCellCustom, TableHeadCustom } from "@/components/table/common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStatusQuery } from "@/utils/query";
import type { ParamType, StatusColumnType } from "@/utils/types/common";
import type { ColumnDef, SortingFn } from "@tanstack/react-table";
import { format, toDate } from "date-fns";
import { useParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { CloseStatusForm } from "./close-status-dialog";
import { CreateEditStatusDrawer } from "./create-edit-status-drawer";
import { DeleteStatusForm } from "./delete-status-dialog";
import { StatusDetailDrawer } from "./status-detail-drawer";

export function StatusTable({ ...props }) {
	const params = useParams<ParamType>();

	const sortCreatedFn: SortingFn<StatusColumnType> = (rowA, rowB, _columnId) => {
		const statusA = +rowA.original.created_at - 19800000;
		const statusB = +rowB.original.created_at - 19800000;
		return statusA - statusB;
	};

	const columns: ColumnDef<StatusColumnType>[] = [
		{
			id: params.mode === "terminal" ? "terminal" : "carrier",
			accessorKey: "carrier",
			header: () => <TableHeadCustom>{params.mode === "terminal" ? "Terminal" : "Carrier"}</TableHeadCustom>,
			cell: ({ row }) => {
				const carrier = row.original.value.carrier;
				return <TableCellCustom>{carrier ? carrier : "-"}</TableCellCustom>;
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
			id: "issue",
			accessorKey: "issue",
			header: () => <TableHeadCustom>Issue</TableHeadCustom>,
			cell: ({ row }) => (
				<TableCellCustom className="font-semibold">
					<p className="w-32 truncate capitalize">{row.original.value.issue}</p>
				</TableCellCustom>
			),
			meta: {
				className: "sticky left-0 bg-white",
			},
			enableSorting: false,
		},
		{
			id: "impact",
			accessorKey: "impact",
			header: () => <TableHeadCustom>Impact</TableHeadCustom>,
			cell: ({ row }) => (
				<TableCellCustom className="font-semibold">
					<p className="w-46 truncate capitalize">{row.original.value.impact}</p>
				</TableCellCustom>
			),
			meta: {
				className: "sticky left-0 bg-white",
			},
			enableSorting: false,
		},
		{
			id: "status-type",
			accessorKey: "statusType",
			header: () => <TableHeadCustom>Type</TableHeadCustom>,
			cell: ({ row }) => {
				const type = row.original.value.statusType;
				const commonClass = "border p-[5px] rounded-sm";
				let typeColor = commonClass + " bg-red-50 border-red-500 text-red-500";
				if (type === "INFORMATION") typeColor = commonClass + " bg-blue-50 border-blue-500 text-blue-500";
				if (type === "WEBSITE MAINTENANCE")
					typeColor = commonClass + " bg-teal-50 border-teal-500 text-teal-500";
				if (type === "SYSTEM MAINTENANCE")
					typeColor = commonClass + " bg-yellow-50 border-yellow-500 text-yellow-500";
				if (type === "DEGRADATION") typeColor = commonClass + " bg-orange-50 border-orange-500 text-orange-500";
				return <TableCellCustom className={typeColor}>{type}</TableCellCustom>;
			},
			enableSorting: false,
		},
		{
			id: "eta",
			accessorKey: "eta",
			header: () => <TableHeadCustom>Expected Resolution Date</TableHeadCustom>,
			cell: ({ row }) => {
				return (
					<TableCellCustom>
						{format(row.original.value.expectedResolutionDate, "do MMM, yyyy")}
					</TableCellCustom>
				);
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
			id: "more-detail",
			accessorKey: "moreDetail",
			header: () => <TableHeadCustom>More Detail</TableHeadCustom>,
			cell: ({ row }) => {
				return (
					<StatusDetailDrawer
						variant="outline"
						title="Status Details"
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
					<CreateEditStatusDrawer
						variant="outline"
						buttonTitle="Edit"
						title="Edit a status"
						state="EDIT"
						tableType={props.type.toUpperCase()}
						statusKey={row.original.statusKey}
						statusValue={row.original.value}
					/>
				);
			},
			enableSorting: false,
		},
		{
			id: "close",
			accessorKey: "close",
			header: () => <TableHeadCustom>Close</TableHeadCustom>,
			cell: ({ row }) => {
				return <CloseStatusForm statusKey={row.original.statusKey} carrier={row.original.value.carrier} />;
			},
			enableSorting: false,
		},
		{
			id: "delete",
			accessorKey: "delete",
			header: () => <TableHeadCustom>Delete</TableHeadCustom>,
			cell: ({ row }) => {
				return (
					<DeleteStatusForm
						statusKey={row.original.statusKey}
						carrier={row.original.value.carrier}
						tableType={props.type.toUpperCase()}
					/>
				);
			},
			enableSorting: false,
		},
	];

	if (props.type === "closed") {
		columns.splice(9, 1);
	}

	const statusQuery = useStatusQuery(props.type.toUpperCase(), params);

	if (statusQuery.isPending) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<CgSpinnerAlt className="animate-spin text-lg" />
			</div>
		);
	}

	if (statusQuery.isError || statusQuery.error) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<p className="text-red-500">Error: {statusQuery.error?.message}</p>
			</div>
		);
	}

	if (statusQuery.data && !statusQuery.data?.success) {
		return (
			<div>
				<div className="flex justify-center p-5">
					<Button onMouseDown={() => statusQuery.refetch()} disabled={statusQuery.isFetching}>
						{statusQuery.isFetching ? "Fetching..." : "Refresh"}
					</Button>
				</div>
				{statusQuery.isFetching ? (
					<div className="flex h-full flex-col items-center justify-center">
						<CgSpinnerAlt className="animate-spin text-lg" />
					</div>
				) : (
					<div className="flex h-full flex-col items-center justify-center">
						<p
							className={cn(
								"font-bold text-2xl capitalize",
								statusQuery.data?.data.includes("carriers are operational") ? "text-green-400" : "",
							)}
						>
							{statusQuery.data?.data}
						</p>
					</div>
				)}
			</div>
		);
	}

	return (
		<>
			<div>
				<div className="flex justify-end p-5">
					<Button onMouseDown={() => statusQuery.refetch()} disabled={statusQuery.isFetching}>
						{statusQuery.isFetching ? "Fetching..." : "Refresh"}
					</Button>
				</div>
				{statusQuery.isFetching ? (
					<div className="flex h-full flex-col items-center justify-center">
						<CgSpinnerAlt className="animate-spin text-lg" />
					</div>
				) : (
					<TableDataStaticComponent data={statusQuery.data} columns={columns} />
				)}
			</div>
		</>
	);
}
