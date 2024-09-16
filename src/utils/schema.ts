import { zodResolver } from "@hookform/resolvers/zod";
import { format, getYear } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { IssueValueInternal, ParamType, StatusValueInternal } from "./types/common";

// current and previous dates
const sD = new Date();
export const nD = sD.setDate(sD.getDate() - 1);
export const eD = new Date();

// auth schema

// combine signIn, signUp and forgot/reset
export const authSchema = z.object({
	username: z
		.string()
		.min(6, {
			message: "Username must be at least 6 characters.",
		})
		.max(20, {
			message: "Username must be at most 20 characters.",
		})
		.trim(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(/[a-zA-Z]/, {
			message: "Password must contain at least one letter.",
		})
		.regex(/[0-9]/, {
			message: "Password must contain at least one number.",
		})
		.regex(/[^A-Za-z0-9]/, {
			message: "Password must contain at least one special character.",
		})
		.trim(),
});

export const useAuthForm = () => {
	const form = useForm<z.infer<typeof authSchema>>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return form;
};

// issue schema

const issueFormSchema = z.object({
	env: z.string(),
	mode: z.string(),
	carrier: z.string(),
	status: z.string(),
	severity: z.string(),
	issue: z.string(),
	description: z.string(),
	polling_frequency: z
		.number()
		.min(1, { message: "Polling frequency must be at least 1" })
		.max(10, { message: "Polling frequency must be less than 10" }),
	default_emails: z.string(),
	emails: z.string(),
	additional_links: z.string(),
});

export const useIssueForm = (issue: string, issueValue: IssueValueInternal) => {
	let defaultVal = {
		env: "PROD",
		mode: "",
		carrier: "",
		status: "ACTIVE",
		severity: "",
		issue: "",
		description: "",
		polling_frequency: 1,
		default_emails: "yes",
		emails: "",
		additional_links: "",
	};

	if (issue === "EDIT") {
		defaultVal = {
			...defaultVal,
			env: "PROD",
			mode: issueValue.mode,
			carrier: issueValue.carrier,
			status: issueValue.status,
			severity: issueValue.severity,
			issue: issueValue.issue,
			description: issueValue.description,
			polling_frequency: issueValue.polling_frequency,
			default_emails: issueValue.default_emails,
			emails: issueValue.emails,
			additional_links: issueValue.additional_links,
		};
	}

	const form = useForm<z.infer<typeof issueFormSchema>>({
		resolver: zodResolver(issueFormSchema),
		defaultValues: defaultVal,
	});

	return form;
};

// issue delete notify schema

const deleteNotifyIssueFormSchema = z.object({
	issueKey: z.string(),
});

export const useDeleteNotifyIssueForm = () => {
	const form = useForm<z.infer<typeof deleteNotifyIssueFormSchema>>({
		resolver: zodResolver(deleteNotifyIssueFormSchema),
		defaultValues: {
			issueKey: "",
		},
	});

	return form;
};

// dashboards schema

// status
const statusFormSchema = z.object({
	env: z.string(),
	mode: z.string(),
	carrier: z.string(),
	status: z.string(),
	statusType: z.string(),
	issue: z.string(),
	impact: z.string(),
	jiraLink: z.string(),
	expectedResolutionDate: z.date(),
	resolution: z.string(),
});

export const useStatusForm = (state: string, params: ParamType, statusValue: StatusValueInternal) => {
	let defaultVal = {
		env: params.env.toUpperCase(),
		mode: params.mode.toUpperCase(),
		carrier: "",
		status: "ACTIVE",
		statusType: "",
		issue: "",
		impact: "",
		jiraLink: "",
		expectedResolutionDate: new Date(format(eD, "yyyy-MM-dd")),
		resolution: "IN-PROGRESS",
	};

	if (state === "EDIT") {
		defaultVal = {
			...defaultVal,
			env: params.env.toUpperCase(),
			mode: params.mode.toUpperCase(),
			carrier: statusValue.carrier,
			status: statusValue.status,
			statusType: statusValue.statusType,
			issue: statusValue.issue,
			impact: statusValue.impact,
			jiraLink: statusValue.jiraLink,
			expectedResolutionDate: new Date(statusValue.expectedResolutionDate),
			resolution: statusValue.resolution,
		};
	}

	const form = useForm<z.infer<typeof statusFormSchema>>({
		resolver: zodResolver(statusFormSchema),
		defaultValues: defaultVal,
	});

	return form;
};

// status close delete schema

const closeDeleteStatusFormSchema = z.object({
	statusKey: z.string(),
});

export const useCloseDeleteStatusForm = () => {
	const form = useForm<z.infer<typeof closeDeleteStatusFormSchema>>({
		resolver: zodResolver(closeDeleteStatusFormSchema),
		defaultValues: {
			statusKey: "",
		},
	});

	return form;
};

// summary
const summaryOptionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

const summaryFormSchema = z.object({
	carriers: z.array(summaryOptionSchema).max(5, "Please select up to 5 carriers"),
	queue: z.string(),
	range: z
		.object({
			from: z.date(),
			to: z.date(),
		})
		.optional(),
});

export const useSummaryForm = (newCarrOpt: any, searchParams: any) => {
	const form = useForm<z.infer<typeof summaryFormSchema>>({
		resolver: zodResolver(summaryFormSchema),
		defaultValues: {
			carriers: newCarrOpt,
			queue: searchParams.get("queue") || "NORMAL",
			range: {
				from: new Date(searchParams.get("from") || format(nD, "yyyy-MM-dd")),
				to: new Date(searchParams.get("to") || format(eD, "yyyy-MM-dd")),
			},
		},
	});

	return form;
};

// history schema
const historyFormSchema = z.object({
	subId: z.string(),
	historyType: z.string(),
	includeRange: z.string(),
	range: z
		.object({
			from: z.date(),
			to: z.date(),
		})
		.optional(),
});

export const useHistoryForm = (searchParams: any) => {
	const form = useForm<z.infer<typeof historyFormSchema>>({
		resolver: zodResolver(historyFormSchema),
		defaultValues: {
			subId: searchParams.get("subId") || "",
			historyType: searchParams.get("historyType") || "DIFF",
			includeRange: searchParams.get("includeRange") || "NO",
			range: {
				from: new Date(searchParams.get("from") || format(nD, "yyyy-MM-dd")),
				to: new Date(searchParams.get("to") || format(eD, "yyyy-MM-dd")),
			},
		},
	});

	return form;
};

// latency schema
const latencyOptionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

const latencyFormSchema = z.object({
	carriers: z.array(latencyOptionSchema).max(5, "Please select up to 5 carriers"),
	queue: z.string(),
	refType: z.string(),
});

export const useLatencyForm = (newCarrOpt: any, searchParams: any) => {
	const form = useForm<z.infer<typeof latencyFormSchema>>({
		resolver: zodResolver(latencyFormSchema),
		defaultValues: {
			carriers: newCarrOpt,
			queue: searchParams.get("queue") || "NORMAL",
			refType: searchParams.get("refType") || "ALL",
		},
	});

	return form;
};

// reference schema
const referenceAllFormSchema = z.object({
	carrier: z.string(),
	queue: z.string(),
	refType: z.string(),
	refStatus: z.string(),
});

export const useReferenceAllForm = (params: ParamType, searchParams: any) => {
	const form = useForm<z.infer<typeof referenceAllFormSchema>>({
		resolver: zodResolver(referenceAllFormSchema),
		defaultValues: {
			carrier: searchParams.get("carrier") || "",
			queue: searchParams.get("queue") || "NORMAL",
			refType: searchParams.get("refType")
				? searchParams.get("refType")
				: params.mode === "ocean"
					? "BOOKING"
					: params.mode === "air"
						? "AWB"
						: "CONTAINER",
			refStatus: searchParams.get("refStatus") || "ACTIVE",
		},
	});

	return form;
};

const referenceFormSchema = z.object({
	carrier: z.string(),
	reference: z.string(),
});

export const useReferenceForm = (searchParams: any) => {
	const form = useForm<z.infer<typeof referenceFormSchema>>({
		resolver: zodResolver(referenceFormSchema),
		defaultValues: {
			carrier: searchParams.get("refCarrier") || "",
			reference: searchParams.get("reference") || "",
		},
	});

	return form;
};

const referenceSubscriptionFormSchema = z.object({
	subscriptionId: z.string(),
});

export const useReferenceSubscriptionForm = (searchParams: any) => {
	const form = useForm<z.infer<typeof referenceSubscriptionFormSchema>>({
		resolver: zodResolver(referenceSubscriptionFormSchema),
		defaultValues: {
			subscriptionId: searchParams.get("subscriptionId") || "",
		},
	});

	return form;
};

// induced schema
const inducedOptionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

const inducedFormSchema = z.object({
	carriers: z.array(inducedOptionSchema).max(3, "Please select up to 3 carriers"),
	year: z.string(),
});

export const useInducedForm = (newCarrOpt: any, searchParams: any) => {
	const form = useForm<z.infer<typeof inducedFormSchema>>({
		resolver: zodResolver(inducedFormSchema),
		defaultValues: {
			carriers: newCarrOpt,
			year: searchParams.get("year") || getYear(new Date()).toString(),
		},
	});

	return form;
};
