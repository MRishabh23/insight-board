"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IssueAccordion } from "@/components/utils/accord";
import React from "react";
import { CreateEditIssueDrawer } from "./create-edit-issue-drawer";
import { IssueTable } from "./issue-table";

const Issue = () => {
	const [tabVal, setTabVal] = React.useState("active");
	return (
		<div className="w-full">
			<div className="rounded-md bg-white p-4">
				<IssueAccordion />
			</div>
			<Tabs
				value={tabVal}
				onValueChange={(value) => {
					setTabVal(value);
				}}
				className="mt-4 flex h-full flex-col"
			>
				<div className="flex items-center justify-between">
					<TabsList>
						<TabsTrigger value="active">ACTIVE</TabsTrigger>
						<TabsTrigger value="closed">CLOSED</TabsTrigger>
					</TabsList>
					<CreateEditIssueDrawer
						variant="secondary"
						buttonTitle="New Issue"
						title="Add a new issue"
						issue="CREATE"
						tableType={tabVal.toUpperCase()}
					/>
				</div>
				<TabsContent value="active" className="mt-6 mb-6 flex-1 rounded-md bg-white p-4 text-primary">
					<IssueTable type="active" />
				</TabsContent>
				<TabsContent value="closed" className="mt-6 mb-6 flex-1 rounded-md bg-white p-4 text-primary">
					<IssueTable type="closed" />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Issue;
