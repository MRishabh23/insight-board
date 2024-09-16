"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useReferenceSubscriptionForm } from "@/utils/schema";
import type { ReferenceSubscriptionFormType } from "@/utils/types/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const ReferenceSubscriptionForm = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [btnLoad, setBtnLoad] = React.useState(false);

	const form = useReferenceSubscriptionForm(searchParams);

	const onSubmit = (data: any) => {
		//console.log("submit data", data);
		setBtnLoad(true);
		setTimeout(() => {
			const q = createQueryString(data);
			router.push(pathname + "?" + q);
			setBtnLoad(false);
		}, 700);
	};

	const createQueryString = React.useCallback(
		(data: ReferenceSubscriptionFormType) => {
			const refParams = new URLSearchParams(searchParams.toString());

			refParams.set("subscriptionId", data.subscriptionId);

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
						name="subscriptionId"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="subscriptionId">Subscription Id</FormLabel>
								<FormControl id="subscriptionId">
									<Input type="text" placeholder="Enter subscriptionId..." required {...field} />
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
