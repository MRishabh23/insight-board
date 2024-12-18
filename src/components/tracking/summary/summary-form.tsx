"use client";

import MultipleSelector from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getCarriersList, getQueueList } from "@/utils/pre-define-data/data";
import { useSummaryForm } from "@/utils/schema";
import type { ParamType, SummaryFormType } from "@/utils/types/common";
import { format, startOfDay, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SummaryForm = () => {
	const params = useParams<ParamType>();
	const carriersOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);
	const queueOptions = React.useMemo(() => getQueueList(params.mode), [params.mode]);
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

	const form = useSummaryForm(newCarrOpt, searchParams);

	const onSubmit = (data: any) => {
		//console.log("submit data", data);
		setBtnLoad(true);
		if (!data.range || !data.range.from || !data.range.to) {
			form.setError("range", {
				type: "custom",
				message: "Start date and End date are required.",
			});
			setBtnLoad(false);
		} else {
			setTimeout(() => {
				const q = createQueryString(data);
				router.push(pathname + "?" + q);
				setBtnLoad(false);
			}, 400);
		}
	};

	const createQueryString = React.useCallback(
		(data: SummaryFormType) => {
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
			const summaryParams = new URLSearchParams(searchParams.toString());
			if (str !== "") {
				summaryParams.set("carriers", str);
			} else {
				summaryParams.set("carriers", "");
			}
			summaryParams.set("queue", data.queue);
			if (data.carriers.length === 1) {
				summaryParams.set("from", format(data.range.from, "yyyy-MM-dd"));
				summaryParams.set("to", format(data.range.to, "yyyy-MM-dd"));
			} else {
				summaryParams.set("from", "");
				summaryParams.set("to", "");
			}

			return summaryParams.toString();
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
								<FormLabel htmlFor="carriers">{params.mode === "terminal" ? "Terminals" : "Carriers"}</FormLabel>
								<FormControl id="carriers">
									<MultipleSelector
										value={field.value}
										onChange={field.onChange}
										defaultOptions={carriersOptions}
										placeholder={params.mode === "terminal" ? "Select Terminals you like..." : "Select Carriers you like..."}
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
						name="range"
						render={({ field }) => (
							<FormItem className="mt-6 flex flex-col">
								<FormLabel htmlFor="dateRange">Date Range</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl id="dateRange">
											<Button
												id="date"
												variant={"outline"}
												className={cn(
													"w-full justify-start text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
												disabled={form.watch("carriers").length === 1 ? false : true}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{field.value?.from ? (
													field.value?.to ? (
														<>
															{format(field.value.from, "LLL dd, y")} -{" "}
															{format(field.value.to, "LLL dd, y")}
														</>
													) : (
														format(field.value.from, "LLL dd, y")
													)
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											initialFocus
											mode="range"
											max={45}
											defaultMonth={field.value?.from}
											fromDate={startOfDay(subDays(new Date(), 44))}
											toDate={new Date()}
											selected={field.value}
											onSelect={field.onChange}
											numberOfMonths={1}
										/>
									</PopoverContent>
								</Popover>
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
