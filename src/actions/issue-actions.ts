"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// get status action
export const getIssueAction = async ({
  status,
}: {
  status: string;
}) => {
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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

// update status action
export const createIssueAction = async ({
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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
