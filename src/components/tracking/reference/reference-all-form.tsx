"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCarriersList, getQueueList, getRefList } from "@/utils/pre-define-data/data";
import { useReferenceAllForm } from "@/utils/schema";
import type { ParamType, ReferenceAllFormType } from "@/utils/types/common";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const ReferenceAllForm = () => {
	const params = useParams<ParamType>();
	const carriersOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);
	const queueOptions = React.useMemo(() => getQueueList(params.mode), [params.mode]);
	const refOptions = React.useMemo(() => getRefList(params.mode), [params.mode]);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [btnLoad, setBtnLoad] = React.useState(false);

	const form = useReferenceAllForm(params, searchParams);

	const onSubmit = (data: any) => {
		//console.log("submit data", data);
		setBtnLoad(true);
		if (data.carrier.length === 0) {
			form.setError("carrier", {
				type: "custom",
				message: "At least one carrier should be selected.",
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
		(data: ReferenceAllFormType) => {
			const referenceAllParams = new URLSearchParams(searchParams.toString());
			referenceAllParams.set("carrier", data.carrier);
			if (data.refStatus === "ACTIVE") {
				referenceAllParams.set("queue", data.queue);
				referenceAllParams.set("refType", data.refType);
			} else {
				referenceAllParams.set("queue", "");
				referenceAllParams.set("refType", "");
			}
			referenceAllParams.set("refStatus", data.refStatus);
			referenceAllParams.set("bucket", "");

			return referenceAllParams.toString();
		},
		[searchParams],
	);

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 rounded-md border border-gray-200 p-3">
					<FormField
						control={form.control}
						name="carrier"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="carrier">
									{params.mode === "terminal" ? "Terminals" : "Carriers"}
								</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} required>
									<FormControl id="carrier">
										<SelectTrigger>
											<SelectValue
												placeholder={
													params.mode === "terminal"
														? "Select a terminal..."
														: "Select a carrier..."
												}
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{carriersOptions.map((option) => (
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
						name="refStatus"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel htmlFor="refStatus">Status</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} required>
									<FormControl id="active">
										<SelectTrigger>
											<SelectValue placeholder="Select a status..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ACTIVE">Active</SelectItem>
										<SelectItem value="CLOSED">Closed</SelectItem>
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
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									required
									disabled={form.watch("refStatus") === "CLOSED" ? true : false}
								>
									<FormControl id="refType">
										<SelectTrigger>
											<SelectValue placeholder="Select a reference type..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
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
					<FormField
						control={form.control}
						name="queue"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel htmlFor="queue">Queue</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={form.watch("refStatus") === "CLOSED" ? true : false}
								>
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
					<Button type="submit" className="mt-4 w-[120px] capitalize" disabled={btnLoad}>
						{btnLoad ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
};
