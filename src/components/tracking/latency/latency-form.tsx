"use client";

import MultipleSelector from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCarriersList, getQueueList, getRefList } from "@/utils/pre-define-data/data";
import { useLatencyForm } from "@/utils/schema";
import type { LatencyFormType, ParamType } from "@/utils/types/common";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const LatencyForm = () => {
	const params = useParams<ParamType>();
	const carriersOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);
	const queueOptions = React.useMemo(() => getQueueList(params.mode), [params.mode]);
	const refOptions = React.useMemo(() => getRefList(params.mode), [params.mode]);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [btnLoad, setBtnLoad] = React.useState(false);
	const queryCarriers = React.useMemo(
		() => (searchParams.get("carriers") ? searchParams.get("carriers")?.split(",") : []),
		[searchParams],
	);
	const newCarrOpt: any = [];

	if (queryCarriers !== undefined && queryCarriers.length > 0) {
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

	const form = useLatencyForm(newCarrOpt, searchParams);

	const onSubmit = (data: any) => {
		//console.log("submit data", data);
		setBtnLoad(true);
		setTimeout(() => {
			const q = createQueryString(data);
			router.push(pathname + "?" + q);
			setBtnLoad(false);
		}, 400);
	};

	const createQueryString = React.useCallback(
		(data: LatencyFormType) => {
			let str = "";
			if (data.carriers.length > 0) {
				data.carriers.map((carrier: any, index: number) => {
					if (index === data.carriers.length - 1) {
						str += carrier.value;
					} else {
						str += carrier.value + ",";
					}
				});
			}
			const latencyParams = new URLSearchParams(searchParams.toString());
			if (str !== "") {
				latencyParams.set("carriers", str);
			} else {
				latencyParams.set("carriers", "");
			}
			latencyParams.set("queue", data.queue);
			latencyParams.set("refType", data.refType);

			return latencyParams.toString();
		},
		[searchParams],
	);

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 rounded-md border border-gray-200 p-3">
					<FormField
						control={form.control}
						name="carriers"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="carriers">
									{params.mode === "terminal" ? "Terminals" : "Carriers"}
								</FormLabel>
								<FormControl id="carriers">
									<MultipleSelector
										value={field.value}
										onChange={field.onChange}
										defaultOptions={carriersOptions}
										placeholder={
											params.mode === "terminal"
												? "Select Terminals you like..."
												: "Select Carriers you like..."
										}
										hidePlaceholderWhenSelected
										maxSelected={5}
										emptyIndicator={
											<p className="text-center text-gray-600 text-lg leading-10 dark:text-gray-400">
												no results found.
											</p>
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="queue"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel htmlFor="queue">Queue</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl id="queue">
										<SelectTrigger>
											<SelectValue placeholder="Select a queue..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{queueOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="refType"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel htmlFor="refType">Reference Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl id="refType">
										<SelectTrigger>
											<SelectValue placeholder="Select a reference type..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ALL">All</SelectItem>
										{refOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="mt-4 w-[120px] capitalize" disabled={btnLoad}>
						{btnLoad ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
};
