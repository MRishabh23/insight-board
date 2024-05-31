"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// tracking actions

// get latency action
export const getLatencyAction = async ({
  env,
  mode,
  carriers,
  queue,
  referenceType,
}: {
  env: string;
  mode: string;
  carriers: string[];
  queue: string;
  referenceType: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    let reqData = {};
    if (referenceType === "ALL") {
      reqData = {
        type: "GET_LATENCY",
        username: data.username,
        env: env.toUpperCase(),
        mode: mode.toUpperCase(),
        carriers: carriers,
        queue: queue,
        referenceType: "",
      };
    } else {
      reqData = {
        type: "GET_LATENCY",
        username: data.username,
        env: env.toUpperCase(),
        mode: mode.toUpperCase(),
        carriers: carriers,
        queue: queue,
        referenceType: referenceType,
      };
    }

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("pass one carrier") ? dataErr : "Something went wrong while fetching latency.";
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

// get induced action
export const getInducedAction = async ({
  env,
  mode,
  carriers,
  year,
  months,
}: {
  env: string;
  mode: string;
  carriers: string[];
  year: string;
  months: string[];
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    let reqData = {
      type: "GET_INDUCED_LATENCY",
      username: data.username,
      env: env.toUpperCase(),
      mode: mode.toUpperCase(),
      carriers: carriers,
      year: year,
      months: months,
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("least one carrier")
        ? dataErr
        : dataErr.includes("least one month")
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
