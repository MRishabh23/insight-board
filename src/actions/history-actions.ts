"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// tracking actions

// get history action
export const getHistoryAction = async ({
  env,
  mode,
  subscriptionId,
  historyType,
  startTime,
  endTime,
}: {
  env: string;
  mode: string;
  subscriptionId: string;
  historyType: string;
  startTime: string;
  endTime: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    let reqData = {};
    if (historyType === "DIFF") {
      reqData = {
        type: "GET_REFERENCE_HISTORY",
        username: data.username,
        env: env.toUpperCase(),
        mode: mode.toUpperCase(),
        subscriptionId: subscriptionId,
        historyType: historyType,
        startTime: "",
        endTime: "",
      };
    } else if (historyType === "ALL") {
      if (startTime !== "" && endTime !== "") {
        reqData = {
          type: "GET_REFERENCE_HISTORY",
          username: data.username,
          env: env.toUpperCase(),
          mode: mode.toUpperCase(),
          subscriptionId: subscriptionId,
          historyType: historyType,
          startTime: `${startTime} 00:00:00`, //startTime + " 00:00:00",
          endTime: `${endTime} 23:59:59`, //endTime + " 23:59:59"
        };
      } else {
        reqData = {
          type: "GET_REFERENCE_HISTORY",
          username: data.username,
          env: env.toUpperCase(),
          mode: mode.toUpperCase(),
          subscriptionId: subscriptionId,
          historyType: historyType,
          startTime: "",
          endTime: "",
        };
      }
    }

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("Incorrect SubscriptionId")
        ? dataErr
        : dataErr.includes("Not Found")
          ? dataErr
          : dataErr.includes("No data available")
            ? dataErr
            : dataErr.includes("for this query")
              ? dataErr
              : dataErr.includes("created for next container journey")
                ? dataErr
                : dataErr.includes("Shipment is yet to be crawled")
                  ? dataErr
                  : "Something went wrong while fetching history.";
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

// get fetch history action
export const getFetchHistoryAction = async ({
  env,
  mode,
  resourceId,
}: {
  env: string;
  mode: string;
  resourceId: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    let reqData = {};
    if (resourceId != "") {
      reqData = {
        type: "FETCH_REFERENCE_HISTORY",
        username: data.username,
        env: env.toUpperCase(),
        mode: mode.toUpperCase(),
        resourceId: resourceId,
      };
    }

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("Data doesn't exists.")
        ? dataErr
        : "Something went wrong while fetching resource history.";
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
