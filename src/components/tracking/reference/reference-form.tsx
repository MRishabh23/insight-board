"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCarriersList } from "@/utils/pre-define-data/data";
import { useReferenceForm } from "@/utils/schema";
import type { ParamType, ReferenceFormType } from "@/utils/types/common";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const ReferenceForm = () => {
	const params = useParams<ParamType>();
	const carriersOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [btnLoad, setBtnLoad] = React.useState(false);

	const form = useReferenceForm(searchParams);

	const onSubmit = (data: any) => {
		//console.log("submit data", data);
		setBtnLoad(true);
		if (!data.carrier) {
			form.setError("carrier", {
				type: "custom",
				message: "Select a carrier",
			});
			setBtnLoad(false);
		}else if(!data.reference){
			form.setError("reference", {
				type: "custom",
				message: "Input a reference",
			});
			setBtnLoad(false);
		} else {
			setTimeout(() => {
				const q = createQueryString(data);
				router.push(pathname + "?" + q);
				setBtnLoad(false);
			}, 300);
		}
	};

	const createQueryString = React.useCallback(
		(data: ReferenceFormType) => {
			const refParams = new URLSearchParams(searchParams.toString());

			refParams.set("refCarrier", data.carrier);
			refParams.set("reference", data.reference);

			return refParams.toString();
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
									{params.mode === "terminal" ? "Terminal" : "Carrier"}
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
						name="reference"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel htmlFor="reference">Reference Id</FormLabel>
								<FormControl id="reference">
									<Input type="text" placeholder="Enter reference..." required {...field} />
								</FormControl>
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
