import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";

export function IssueDetailDrawer({ ...props }) {
	return (
		<div className="flex items-center justify-center">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant={props.variant}>{props.buttonTitle}</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>{props.title}</SheetTitle>
					</SheetHeader>
					<SheetCustomContent data={props.data} />
				</SheetContent>
			</Sheet>
		</div>
	);
}

function SheetCustomContent({ ...props }) {
	const defaultEmails = "rmailk@justransform.com";
	const additionalLinks = React.useMemo(
		() => (props.data.additional_links ? props.data.additional_links : []),
		[props.data.additional_links],
	);
	return (
		<ScrollArea className="my-scroll mt-5 w-full">
			<div className="p-1">
				{props.data.closed_at && <IssueInput label="Closed At" value={props.data.closed_at} />}
				<IssueInput label="Created By" value={props.data.created_by} />
				{props.data.updated_by && <IssueInput label="Updated By" value={props.data.updated_by} />}
				<IssueTextArea label="Issue" value={props.data.issue} />
				<IssueTextArea label="Description" value={props.data.description} />
				{props.data.carrier && <IssueInput label="Carrier" value={props.data.carrier} />}
				<IssueInput label="Environment" value={props.data.env} />
				<IssueInput label="Mode" value={props.data.mode.toUpperCase()} />
				<IssueInput label="Status" value={props.data.status} />
				<IssueInput label="Severity" value={props.data.severity} />
				{props.data.default_emails === "yes" && <IssueInput label="Default Emails" value={defaultEmails} />}
				{props.data.emails && <IssueInput label="Emails" value={props.data.emails} />}
				{props.data.last_ui_notification_sent_at && (
					<IssueInput label="Last Notification Sent" value={props.data.last_ui_notification_sent_at} />
				)}
				{additionalLinks.length > 0 && (
					<div className="mt-3">
						<Label className="text-base">Additional Links</Label>
						<CustomLinkInput value={additionalLinks} />
					</div>
				)}
			</div>
		</ScrollArea>
	);
}

const IssueInput = ({ label, value }: { label: string; value: string | number }) => {
	return (
		<div className="mt-3">
			<Label className="text-base">{label}</Label>
			<Input className="mt-2" value={value} readOnly />
		</div>
	);
};

const IssueTextArea = ({ label, value }: { label: string; value: string | number }) => {
	return (
		<div className="mt-3">
			<Label className="text-base">{label}</Label>
			<Textarea className="mt-2 h-40" value={value} readOnly />
		</div>
	);
};

const CustomLinkInput = ({ value }: { value: any }) => {
	return (
		<ul className="mt-2">
			{value.includes(",") ? (
				value.split(",").map((link: string, index: number) => (
					<Link key={link} href={link} target="_blank">
						<li className="p-2">
							{index + 1}. <span className="underline hover:text-indigo-500">{link}</span>
						</li>
					</Link>
				))
			) : (
				<Link href={value} target="_blank">
					<li className="p-2">
						1. <span className="underline hover:text-indigo-500">{value}</span>
					</li>
				</Link>
			)}
		</ul>
	);
};
