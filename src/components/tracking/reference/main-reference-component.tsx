"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllReferenceAccordion, ReferenceAccordion, SubscriptionAccordion } from "@/components/utils/accord";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { ReferenceAllForm } from "./reference-all-form";
import { ReferenceAllTable } from "./reference-all-table";
import { ReferenceForm } from "./reference-form";
import { ReferenceSubscriptionForm } from "./reference-subscription-form";
import { ReferenceSubscriptionTable } from "./reference-subscription-table";
import { ReferenceTable } from "./reference-table";

export default function MainReferenceComponent() {
	const params = useParams();
	const searchParams = useSearchParams();
	const [tabVal, setTabVal] = React.useState(searchParams.get("category") || "all");

	const row1 = [
		{
			value: "all",
			name: "All",
			path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
			query: {
				category: "all",
				carrier: "",
				queue: "NORMAL",
				refType: params.mode === "ocean" ? "BOOKING" : params.mode === "air" ? "AWB" : params.mode === "road" ? "LTL" : "IMPORT",
				refStatus: "ACTIVE",
				bucket: "",
			},
		},
		{
			value: "subscription",
			name: "Subscription",
			path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
			query: {
				category: "subscription",
				subscriptionId: "",
			},
		},
		{
			value: "reference",
			name: "Reference",
			path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
			query: {
				category: "reference",
				refCarrier: "",
				reference: "",
			},
		},
	];

	return (
		<Tabs
			className="w-full"
			value={tabVal}
			onValueChange={(value) => {
				setTabVal(value);
			}}
		>
			<TabsList className="grid w-full grid-cols-3">
				{row1.map((tab) => (
					<Link key={tab.value} href={{ pathname: tab.path, query: tab.query }}>
						<TabsTrigger value={tab.value} className="w-full">
							{tab.name}
						</TabsTrigger>
					</Link>
				))}
			</TabsList>
			<TabsContent value="all">
				<div className="flex flex-col">
					<AllReferenceAccordion />
					<ReferenceAllForm />
					<ReferenceAllTable />
				</div>
			</TabsContent>
			<TabsContent value="subscription">
				<div className="flex flex-col">
					<SubscriptionAccordion />
					<ReferenceSubscriptionForm />
					<ReferenceSubscriptionTable />
				</div>
			</TabsContent>
			<TabsContent value="reference">
				<div className="flex flex-col">
					<ReferenceAccordion />
					<ReferenceForm />
					<ReferenceTable />
				</div>
			</TabsContent>
		</Tabs>
	);
}
