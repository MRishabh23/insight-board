"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// tracking actions

// get status action
export const getStatusAction = async ({ env, mode }: { env: string; mode: string }) => {
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
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      throw new Error("Something went wrong while fetching carrier status.");
    }

    if (res?.success && res?.data?.includes("data not present")) {
      throw new Error("Sufficient data not present.");
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

// update status action
export const updateStatusAction = async ({
  env,
  mode,
  carrier,
  status,
}: {
  env: string;
  mode: string;
  carrier: string;
  status: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    const reqData = {
      type: "UPDATE_CARRIER_STATUS",
      username: data.username,
      env: env.toUpperCase(),
      mode: mode.toUpperCase(),
      carrier: carrier,
      status: status,
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      throw new Error("Something went wrong while updating carrier status.");
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
    if (startTime != "" && endTime != "") {
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
