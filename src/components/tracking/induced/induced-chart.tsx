"use client";

import ChartComponent from "@/components/data-chart";
import { useInducedQuery } from "@/utils/query";
import type { ParamType } from "@/utils/types/common";
import { useParams, useSearchParams } from "next/navigation";
import * as React from "react";
import { CgSpinnerAlt } from "react-icons/cg";

export function InducedChart() {
	const params = useParams<ParamType>();
	const searchParams = useSearchParams();

	const queryCarriers = React.useMemo(
		() => (searchParams.get("carriers") ? searchParams.get("carriers")?.split(",") : []),
		[searchParams],
	);

	const newCarrOpt: string[] = [];

	if (queryCarriers !== undefined && queryCarriers.length > 0) {
		queryCarriers.map((carrier) => {
			if (carrier) {
				newCarrOpt.push(carrier);
			}
		});
	}

	if (!searchParams.get("carriers")) {
		return (
			<div className="mt-10 flex items-center justify-center font-bold text-xl">
				Select a carrier to view chart.
			</div>
		);
	}

	return <InducedData params={params} carriers={newCarrOpt} year={searchParams.get("year")} />;
}

const InducedData = ({ ...props }) => {
	const inducedQuery = useInducedQuery(props.params, props.carriers, props.year);

	if (inducedQuery.isPending) {
		return (
			<div className="mt-6 flex h-full flex-col items-center justify-center">
				<CgSpinnerAlt className="animate-spin text-lg" />
			</div>
		);
	}

	if (inducedQuery.isError || inducedQuery.error) {
		return (
			<div className="mt-6 flex h-full flex-col items-center justify-center">
				<p className="text-red-500">Error: {inducedQuery.error?.message}</p>
			</div>
		);
	}

	if (inducedQuery.data && !inducedQuery.data?.success) {
		return (
			<div className="mt-10 flex h-full flex-col items-center justify-center">
				<p className="text-red-500">{inducedQuery.data?.data}</p>
			</div>
		);
	}

	return <ChartDataTwo data={inducedQuery.data} carriers={props.carriers} />;
};

const ChartDataTwo = ({ ...props }) => {
	return <ChartComponent chartData={props.data?.data} carriers={props.carriers} />;
};
