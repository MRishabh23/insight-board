"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// get issue action
export const getIssueAction = async ({ status }: { status: string }) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		const reqData = {
			type: "GET_ISSUE",
			username: data.username,
			env: "PROD",
			status: status.toUpperCase(),
		};

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			const dataErr = res?.data;
			const errMsg = dataErr.includes("No issues found")
				? dataErr
				: "Something went wrong while fetching issues.";
			throw new Error(errMsg);
		}

		return {
			data: res?.data,
			success: true,
		};
	} catch (error: any) {
		return {
			data: error.message,
			success: false,
		};
	}
};

// create update issue action
export const createUpdateIssueAction = async ({
	type,
	issueKey,
	env,
	mode,
	carrier,
	status,
	severity,
	issue,
	description,
	polling_frequency,
	default_emails,
	emails,
	additional_links,
}: {
	type: string;
	issueKey: string;
	env: string;
	mode: string;
	carrier: string;
	status: string;
	severity: string;
	issue: string;
	description: string;
	polling_frequency: number;
	default_emails: string;
	emails: string;
	additional_links: string;
}) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		let issueType = "CREATE_ISSUE";
		if (type === "EDIT") {
			issueType = "UPDATE_ISSUE";
		}

		let reqData = {};

		if (type === "EDIT") {
			reqData = {
				type: issueType,
				username: data.username,
				issue_key: issueKey,
				env: env.toUpperCase(),
				mode: mode,
				carrier: carrier,
				status: status,
				severity: severity,
				issue: issue,
				description: description,
				polling_frequency: polling_frequency,
				default_emails: default_emails,
				emails: emails,
				additional_links: additional_links,
			};
		} else {
			reqData = {
				type: issueType,
				username: data.username,
				env: env.toUpperCase(),
				mode: mode,
				carrier: carrier,
				status: status,
				severity: severity,
				issue: issue,
				description: description,
				polling_frequency: polling_frequency,
				default_emails: default_emails,
				emails: emails,
				additional_links: additional_links,
			};
		}

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			if (type === "EDIT") {
				throw new Error("While updating issue.");
			} else {
				throw new Error("While creating issue.");
			}
		}

		return {
			data: res?.data,
			success: true,
		};
	} catch (error: any) {
		return {
			data: error.message,
			success: false,
		};
	}
};

// close issue action
export const closeIssueAction = async ({ issueKey }: { issueKey: string }) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		const reqData = {
			type: "CLOSE_ISSUE",
			env: "PROD",
			username: data.username,
			issueKey: issueKey,
		};

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			throw new Error("While closing issue.");
		}

		return {
			data: res?.data,
			success: true,
		};
	} catch (error: any) {
		return {
			data: error.message,
			success: false,
		};
	}
};

// delete notify issue action
export const deleteNotifyIssueAction = async ({ type, issueKey }: { type: string; issueKey: string }) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		let reqType = "SEND_ISSUE_NOTIFICATION";

		if (type === "DELETE") {
			reqType = "DELETE_ISSUE";
		}

		const reqData = {
			type: reqType,
			env: "PROD",
			username: data.username,
			issueKey: issueKey,
		};

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			const dataErr = res?.data;
			if (type === "DELETE") {
				throw new Error("While deleting issue.");
			} else {
				const errMsg = dataErr.includes("no emails are found") ? dataErr : "While sending notification.";
				throw new Error(errMsg);
			}
		}

		return {
			data: res?.data,
			success: true,
		};
	} catch (error: any) {
		return {
			data: error.message,
			success: false,
		};
	}
};
