"use server";

import axios from "axios";
import { headers } from "next/headers";

// call the main request action
export const mainRequestAction = async (reqBody: any) => {
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
