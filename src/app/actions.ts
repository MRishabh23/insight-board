"use server";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcryptjs from "bcryptjs";
import { AuthType } from "@/utils/types/common";

// call the main request action
const mainRequestAction = async (reqBody: any) => {
  try {
    const headersList = headers();
    const authenticate = headersList.get("Postman-Token");

    if (authenticate) {
      throw new Error("Request is not from trusted source.");
    }

    const mainObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 120000,
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: reqBody,
    };
    let mainRes: any = await axios(mainObj);

    if (!mainRes?.data?.response?.success) {
      throw new Error(mainRes.data?.response?.data);
    }

    return {
      data: mainRes?.data?.response?.data,
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message.includes("trusted")
        ? "Request is not from trusted source."
        : error.message,
      success: false,
    };
  }
};

// auth actions

// sign up action
export const signUpAction = async ({ username, password }: AuthType) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // find user
    const reqData = {
      type: "SIGN_UP",
      username: username,
      password: hashedPassword,
    };

    let res: any = await mainRequestAction(reqData);

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      throw new Error("User exists. Please sign in.");
    }

    return {
      data: "User created successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message,
      success: false,
    };
  }
};

// sign in action
export const signInAction = async ({ username, password }: AuthType) => {
  try {
    const cookieStore = cookies();
    const reqData = {
      type: "SIGN_IN",
      username: username,
    };

    const res: any = await mainRequestAction(reqData);

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      throw new Error("User does not exist. Please sign up.");
    }

    // check if password matches
    const validPassword = await bcryptjs.compare(password, res?.data?.password);
    if (!validPassword) {
      throw new Error("Incorrect password. Please try again.");
    }

    // create token data
    const tokenData = {
      username: res?.data?.username,
      createdAt: res?.data?.createdAt,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // generate cookies
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return {
      data: "Sign in Successful.",
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message,
      success: false,
    };
  }
};

// reset action
export const resetAction = async ({ username, password }: AuthType) => {
  try {
    // hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // find user
    const reqData = {
      type: "RESET_PASSWORD",
      username: username,
      newPassword: hashedPassword,
    };

    let res: any = await mainRequestAction(reqData);

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      throw new Error("User doesn't exists. Please sign up.");
    }

    return {
      data: "Password updated successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message,
      success: false,
    };
  }
};

// get user action
export const getUserAction = async () => {
  try {
    const cookieStore = cookies();
    if (!cookieStore.has("token")) {
      throw new Error("User not found.");
    }
    const data = cookieStore.get("token");
    const user = jwt.decode(`${data?.value}`);
    return { data: user, success: true };
  } catch (error: any) {
    return {
      data: error.message,
      success: false,
    };
  }
};

// sign out action
export const signOutAction = async () => {
  try {
    const cookieStore = cookies();
    // delete cookie
    cookieStore.set("token", "", { httpOnly: true, expires: new Date(0) });
    return {
      data: "Sign out Successful.",
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message,
      success: false,
    };
  }
};

// tracking actions

// get status action
export const getStatusAction = async ({
  env,
  mode,
}: {
  env: string;
  mode: string;
}) => {
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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
    if (startTime != "" && endTime != "") {
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
    }

    const res: any = await mainRequestAction(reqData);

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("pass one carrier")
        ? dataErr
        : "Something went wrong while fetching latency.";
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
      throw new Error(res.data);
    }

    if (!res?.success) {
      const dataErr = res?.data;
      const errMsg = dataErr.includes("pass one carrier")
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

    if (
      !res?.success &&
      (res?.data.includes("timed") || res?.data.includes("trusted"))
    ) {
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
