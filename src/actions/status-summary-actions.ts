"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// tracking actions

// get status action
export const getStatusAction = async ({ env, mode, status }: { env: string; mode: string; status: string }) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		const reqData = {
			type: "GET_CARRIER_STATUS",
			username: data.username,
			env: env.toUpperCase(),
			mode: mode.toUpperCase(),
			status: status.toUpperCase(),
		};

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			const dataErr = res?.data;
			const errMsg = dataErr.includes("operational")
				? dataErr
				: dataErr.includes("history found")
					? dataErr
					: "Something went wrong while fetching status.";
			throw new Error(errMsg);
		}

		// if (res?.success && res?.data?.includes("data not present")) {
		//   throw new Error("Sufficient data not present.");
		// }

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

// create update status action
export const createUpdateStatusAction = async ({
	type,
	statusKey,
	env,
	mode,
	carrier,
	status,
	statusType,
	issue,
	impact,
	jiraLink,
	expectedResolutionDate,
	resolution,
}: {
	type: string;
	statusKey: string;
	env: string;
	mode: string;
	carrier: string;
	status: string;
	statusType: string;
	issue: string;
	impact: string;
	jiraLink: string;
	expectedResolutionDate: string;
	resolution: string;
}) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		let state = "CREATE_CARRIER_STATUS";
		if (type === "EDIT") {
			state = "UPDATE_CARRIER_STATUS";
		}

		let reqData = {};

		if (type === "EDIT") {
			reqData = {
				type: state,
				username: data.username,
				env: env.toUpperCase(),
				mode: mode,
				carrier: carrier,
				statusKey: statusKey,
				status: status,
				statusType: statusType,
				issue: issue,
				impact: impact,
				jiraLink: jiraLink,
				expectedResolutionDate: expectedResolutionDate,
				resolution: resolution,
			};
		} else {
			reqData = {
				type: state,
				username: data.username,
				env: env.toUpperCase(),
				mode: mode,
				carrier: carrier,
				status: status,
				statusType: statusType,
				issue: issue,
				impact: impact,
				jiraLink: jiraLink,
				expectedResolutionDate: expectedResolutionDate,
				resolution: resolution,
			};
		}

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			throw new Error(`${type === "EDIT" ? "While updating status." : "While creating status."}`);
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

// close status action
export const closeStatusAction = async ({
	env,
	mode,
	carrier,
	statusKey,
}: {
	env: string;
	mode: string;
	carrier: string;
	statusKey: string;
}) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		const reqData = {
			type: "CLOSE_CARRIER_STATUS",
			username: data.username,
			env: env.toUpperCase(),
			mode: mode.toUpperCase(),
			carrier: carrier.toUpperCase(),
			statusKey: statusKey,
		};

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			const dataErr = res?.data;
			const errMsg = dataErr.includes("status doesn't") ? dataErr : "Something went wrong while closing status.";
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

// delete status action
export const deleteStatusAction = async ({
	env,
	mode,
	carrier,
	statusKey,
}: {
	env: string;
	mode: string;
	carrier: string;
	statusKey: string;
}) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		const reqData = {
			type: "DELETE_CARRIER_STATUS",
			username: data.username,
			env: env.toUpperCase(),
			mode: mode.toUpperCase(),
			carrier: carrier.toUpperCase(),
			statusKey: statusKey,
		};

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			throw new Error("While deleting status.");
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

// get summary action
export const getSummaryAction = async ({
	env,
	mode,
	carriers,
	queue,
	startTime,
	endTime,
}: {
	env: string;
	mode: string;
	carriers: string[];
	queue: string;
	startTime: string;
	endTime: string;
}) => {
	try {
		const { data, success } = await getUserAction();

		if (!success) {
			throw new Error("User not found.");
		}

		let reqData = {};
		if (startTime !== "" && endTime !== "") {
			reqData = {
				type: "GET_SUMMARY",
				username: data.username,
				env: env.toUpperCase(),
				mode: mode.toUpperCase(),
				carriers: carriers,
				queue: queue,
				startTime: `${startTime} 00:00:00`, //startTime + " 00:00:00",
				endTime: `${endTime} 23:59:59`, //endTime + " 23:59:59"
			};
		} else {
			reqData = {
				type: "GET_SUMMARY",
				username: data.username,
				env: env.toUpperCase(),
				mode: mode.toUpperCase(),
				carriers: carriers,
				queue: queue,
				startTime: "",
				endTime: "",
			};
		}

		const res: any = await mainRequestAction(reqData);

		if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
			throw new Error(res.data);
		}

		if (!res?.success) {
			const dataErr = res?.data;
			const errMsg = dataErr.includes("searched time period")
				? dataErr
				: "Something went wrong while fetching summary.";
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
