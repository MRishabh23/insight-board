"use server";

import { getUserAction } from "./auth-actions";
import { mainRequestAction } from "./main-actions";

// tracking actions

// get reference all action
export const getReferenceAllAction = async ({
  env,
  mode,
  carrier,
  queue,
  referenceType,
  refStatus,
  bucket,
}: {
  env: string;
  mode: string;
  carrier: string;
  queue: string;
  referenceType: string;
  refStatus: string;
  bucket: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    const reqData = {
      type: "GET_REFERENCE_LIST",
      username: data.username,
      env: env.toUpperCase(),
      mode: mode.toUpperCase(),
      carrier: carrier,
      queue: queue,
      referenceType: referenceType,
      status: refStatus,
      bucket: bucket,
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("pass one carrier") ? dataErr : "Something went wrong while fetching references.";
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

// get reference info action
export const getReferenceInfoAction = async ({
  env,
  mode,
  carrier,
  referenceType,
  refStatus,
  reference,
}: {
  env: string;
  mode: string;
  carrier: string;
  referenceType: string;
  refStatus: string;
  reference: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    const reqData = {
      type: "GET_REFERENCE_INFO",
      username: data.username,
      env: env.toUpperCase(),
      mode: mode.toUpperCase(),
      carrier: carrier,
      referenceType: referenceType,
      status: refStatus,
      reference: reference,
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("Wrong reference")
        ? dataErr
        : "Something went wrong while fetching reference data.";
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

// get reference action
export const getReferenceAction = async ({
  env,
  mode,
  referenceId,
}: {
  env: string;
  mode: string;
  referenceId: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    const reqData = {
      type: "GET_REFERENCE_LIST",
      username: data.username,
      env: env.toUpperCase(),
      mode: mode.toUpperCase(),
      referenceId: referenceId,
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("pass one carrier") ? dataErr : "Something went wrong while fetching references.";
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

// get reference subscription action
export const getReferenceSubscriptionAction = async ({
  env,
  mode,
  subscriptionId,
}: {
  env: string;
  mode: string;
  subscriptionId: string;
}) => {
  try {
    const { data, success } = await getUserAction();

    if (!success) {
      throw new Error("User not found.");
    }

    const reqData = {
      type: "GET_REFERENCE_LIST",
      username: data.username,
      env: env.toUpperCase(),
      mode: mode.toUpperCase(),
      subscriptionId: subscriptionId,
    };

    const res: any = await mainRequestAction(reqData);

    if (!res?.success && (res?.data.includes("timed") || res?.data.includes("trusted"))) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("created for next container journey")
        ? dataErr
        : "Something went wrong while fetching references.";
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
