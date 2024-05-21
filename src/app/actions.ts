"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcryptjs from "bcryptjs";
import { AuthType } from "@/utils/types/common";
import { NextRequest } from "next/server";

// auth actions

// sign up action
export const signUpAction = async ({ username, password }: AuthType) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // find user
    const newUserObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 60000,
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: {
        type: "SIGN_UP",
        username: username,
        password: hashedPassword,
      },
    };

    let signUpRes: any = await axios(newUserObj);

    if (!signUpRes?.data?.response?.success) {
      throw new Error("User exists. Please sign in.");
    }

    return {
      data: "User created successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message,
      success: false,
    };
  }
};

// sign in action
export const signInAction = async ({ username, password }: AuthType) => {
  try {
    const cookieStore = cookies();
    const sendObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 60000, // 60000 (1 minute)
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: {
        type: "SIGN_IN",
        username: username,
      },
    };

    const signInRes: any = await axios(sendObj);

    if (!signInRes?.data?.response?.success) {
      throw new Error("User doesn't exists. Please sign up.");
    }

    // check if password matches
    const validPassword = await bcryptjs.compare(
      password,
      signInRes?.data?.response?.data?.password
    );
    if (!validPassword) {
      throw new Error("Incorrect password. Please try again.");
    }

    // create token data
    const tokenData = {
      userId: signInRes?.data?.response?.data?.userId,
      username: signInRes?.data?.response?.data?.username,
      createdAt: signInRes?.data?.response?.data?.createdAt,
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
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message,
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
    const newUserObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 60000,
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: {
        type: "RESET_PASSWORD",
        username: username,
        newPassword: hashedPassword,
      },
    };

    let resetRes: any = await axios(newUserObj);

    if (!resetRes?.data?.response?.success) {
      throw new Error("User doesn't exists. Please sign up.");
    }

    return {
      data: "Password updated successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message,
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
    //throw new Error("Test error status");

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

    const sendObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 120000,
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: reqData,
    };

    const statusRes: any = await axios(sendObj);

    if (!statusRes?.data?.response?.success) {
      throw new Error("Something went wrong while fetching carrier status.");
    }

    if (
      statusRes?.data?.response?.success &&
      statusRes?.data?.response?.data?.includes("data not present")
    ) {
      throw new Error("Sufficient data not present.");
    }

    return {
      data: statusRes?.data?.response?.data,
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message,
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

    const sendObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 120000,
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: reqData,
    };

    const statusUpdateRes: any = await axios(sendObj);

    if (!statusUpdateRes?.data?.response?.success) {
      throw new Error("Something went wrong while updating carrier status.");
    }

    return {
      data: statusUpdateRes?.data?.response?.data,
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message,
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

    const sendObj = {
      method: "post",
      url: process.env.REST_URL!,
      timeout: 120000,
      auth: {
        username: process.env.REST_USERNAME!,
        password: process.env.REST_PASSWORD!,
      },
      data: reqData,
    };

    //console.log("sendObj", sendObj);

    const summaryRes: any = await axios(sendObj);

    if (!summaryRes?.data?.response?.success) {
      const dataErr = summaryRes?.data?.response?.data;
      const errMsg = dataErr.includes("searched time period")
        ? dataErr
        : "Something went wrong while fetching summary.";
      throw new Error(errMsg);
    }

    return {
      data: summaryRes?.data?.response?.data,
      success: true,
    };
  } catch (error: any) {
    return {
      data: error.message.includes("timeout")
        ? "Request timed out. Please try again."
        : error.message,
      success: false,
    };
  }
};
