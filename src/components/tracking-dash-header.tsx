"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getYear } from "date-fns";
import Link from "next/link";
import React from "react";

const TrackingDashHeader = ({ params }: { params: { mode: string; env: string; dash: string } }) => {
	const tabsRow1 = [
		{
			name: "Status",
			path: `/dashboard/tracking/${params.mode}/${params.env}/status`,
			query: {},
		},
		{
			name: "Summary",
			path: `/dashboard/tracking/${params.mode}/${params.env}/summary`,
			query: {
				carriers: "",
				queue: "NORMAL",
				from: "",
				to: "",
			},
		},
		{
			name: "History",
			path: `/dashboard/tracking/${params.mode}/${params.env}/history`,
			query: {
				subId: "",
				historyType: "DIFF",
				includeRange: "NO",
				from: "",
				to: "",
			},
		},
	];

	const tabsRow2 = [
		{
			name: "References",
			path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
			query: {
				category: "all",
				carrier: "",
				queue: "NORMAL",
				refType:
					params.mode === "ocean"
						? "BOOKING"
						: params.mode === "air"
							? "AWB"
							: params.mode === "road"
								? "LTL"
								: "IMPORT",
				refStatus: "ACTIVE",
				bucket: "",
			},
		},
		{
			name: "Latency",
			path: `/dashboard/tracking/${params.mode}/${params.env}/latency`,
			query: {
				carriers: "",
				queue: "NORMAL",
				refType: "ALL",
			},
		},
		{
			name: "Induced",
			path: `/dashboard/tracking/${params.mode}/${params.env}/induced`,
			query: {
				carriers: "",
				year: getYear(new Date()).toString(),
			},
		},
	];
	const [tabVal, setTabVal] = React.useState(params.dash);

	return (
		<>
			<Tabs
				value={tabVal}
				onValueChange={(value: any) => {
					setTabVal(value);
				}}
			>
				<div className="mt-6 w-full space-y-4">
					<TabsList className="grid grid-cols-3">
						{tabsRow1.map((tab) => (
							<Link key={tab.name} href={{ pathname: tab.path, query: tab.query }}>
								<TabsTrigger value={tab.name.toLowerCase()} className="w-full">
									{tab.name}
								</TabsTrigger>
							</Link>
						))}
					</TabsList>
					<TabsList className="grid grid-cols-3">
						{tabsRow2.map((tab) => (
							<Link key={tab.name} href={{ pathname: tab.path, query: tab.query }}>
								<TabsTrigger value={tab.name.toLowerCase()} className="w-full">
									{tab.name}
								</TabsTrigger>
							</Link>
						))}
					</TabsList>
				</div>
			</Tabs>
		</>
	);
};

export default TrackingDashHeader;
