"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useStatusCUMutation } from "@/utils/mutation";
import { getCarriersList } from "@/utils/pre-define-data/data";
import { useStatusForm } from "@/utils/schema";
import type { ParamType } from "@/utils/types/common";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export function CreateEditStatusDrawer({ ...props }) {
	const [open, setOpen] = React.useState(false);
	const handleSheetOpen = () => {
		setOpen(!open);
	};
	return (
		<div className="flex items-center justify-center">
			<Sheet open={open} onOpenChange={handleSheetOpen}>
				<SheetTrigger asChild>
					<Button variant={props.variant}>{props.buttonTitle}</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>{props.title}</SheetTitle>
					</SheetHeader>
					<ScrollArea className="my-scroll mt-5 w-full">
						<AddStatusForm
							state={props.state}
							tableType={props.tableType}
							statusKey={props.statusKey}
							statusValue={props.statusValue}
							setOpen={setOpen}
						/>
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</div>
	);
}

const AddStatusForm = ({ ...props }) => {
	const params = useParams<ParamType>();
	const form = useStatusForm(props.state, params, props.statusValue);

	const carrierOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);

	const { mutate: server_CUStatus, isPending: isPending_CUStatus } = useStatusCUMutation(
		params,
		form,
		props.state,
		props.statusKey,
		props.tableType,
		props.setOpen,
	);

	const onSubmit = (data: any) => {
		if (!data.carrier) {
			form.setError("carrier", {
				type: "custom",
				message: "Please select a carrier.",
			});
		}
		if (!data.status) {
			form.setError("status", {
				type: "custom",
				message: "Please select a status.",
			});
		}
		if (!data.statusType) {
			form.setError("statusType", {
				type: "custom",
				message: "Please select a status type.",
			});
		}
		if (
			data.carrier &&
			data.status &&
			data.statusType &&
			data.issue &&
			data.impact &&
			data.resolution &&
			data.expectedResolutionDate
		) {
			data.expectedResolutionDate = format(data.expectedResolutionDate, "yyyy-MM-dd");
			//console.log("submit data", data);
			server_CUStatus(data);
		}
	};

	const handleReset = () => {
		form.reset({
			env: params.env.toUpperCase(),
			mode: params.mode.toUpperCase(),
			carrier: "",
			status: "ACTIVE",
			statusType: "",
			issue: "",
			impact: "",
			jiraLink: "",
			expectedResolutionDate: new Date(),
			resolution: "IN-PROGRESS",
		});
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 rounded-md border border-gray-200 p-3">
					<FormField
						control={form.control}
						name="env"
						render={() => (
							<FormItem>
								<FormLabel className="text-base" htmlFor="env">
									Environment
								</FormLabel>
								<FormControl id="env">
									<Input type="text" value={params.env.toUpperCase()} disabled />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="mode"
						render={() => (
							<FormItem>
								<FormLabel className="text-base" htmlFor="mode">
									Mode
								</FormLabel>
								<FormControl id="mode">
									<Input type="text" value={params.mode.toUpperCase()} disabled />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="carrier"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="carrier">
									Carrier
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									disabled={props.state === "EDIT"}
								>
									<FormControl id="carrier">
										<SelectTrigger>
											<SelectValue placeholder="Select a carrier..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ALL">ALL</SelectItem>
										{carrierOptions.map((option) => (
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
						name="status"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="status">
									Status
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl id="status">
										<SelectTrigger>
											<SelectValue placeholder="Select status..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ACTIVE">ACTIVE</SelectItem>
										<SelectItem value="CLOSED">CLOSED</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="statusType"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="statusType">
									Status Type
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl id="statusType">
										<SelectTrigger>
											<SelectValue placeholder="Select status type..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="DEGRADATION">DEGRADATION</SelectItem>
										<SelectItem value="INFORMATION">INFORMATION</SelectItem>
										<SelectItem value="WEBSITE MAINTENANCE">WEBSITE MAINTENANCE</SelectItem>
										<SelectItem value="SYSTEM MAINTENANCE">SYSTEM MAINTENANCE</SelectItem>
										<SelectItem value="OUTAGE">OUTAGE</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="issue"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="issue">
									Issue
								</FormLabel>
								<FormControl id="issue">
									<Textarea className="h-24" placeholder="issue..." required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="impact"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="impact">
									Impact
								</FormLabel>
								<FormControl id="impact">
									<Textarea className="h-24" placeholder="impact..." required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="jiraLink"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="jiraLink">
									Jira Link
								</FormLabel>
								<FormControl id="jiraLink">
									<Input type="text" placeholder="Enter jira link..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="expectedResolutionDate"
						render={({ field }) => (
							<FormItem className="mt-4 flex flex-col">
								<FormLabel className="text-base" htmlFor="expectedResolutionDate">
									Expected Resolution Date
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl id="expectedResolutionDate">
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											initialFocus
											mode="single"
											defaultMonth={field.value}
											fromDate={new Date()}
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
					<FormField
						control={form.control}
						name="resolution"
						render={({ field }) => (
							<FormItem className="mt-4">
								<FormLabel className="text-base" htmlFor="resolution">
									Resolution
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl id="resolution">
										<SelectTrigger>
											<SelectValue placeholder="Select resolution..." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="IN-PROGRESS">IN-PROGRESS</SelectItem>
										<SelectItem value="RESOLVED">RESOLVED</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{props.state === "CREATE" && (
						<>
							<Button type="submit" className="mt-4 w-full" disabled={isPending_CUStatus}>
								{isPending_CUStatus ? "Creating..." : "Create"}
							</Button>
							<Button type="button" onMouseDown={handleReset} className="mt-4 w-full">
								Reset
							</Button>
						</>
					)}
					{props.state === "EDIT" && (
						<Button type="submit" className="mt-4 w-full" disabled={isPending_CUStatus}>
							{isPending_CUStatus ? "Updating..." : "Update"}
						</Button>
					)}
				</form>
			</Form>
		</>
	);
};
