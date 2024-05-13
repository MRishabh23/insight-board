import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      type,
      username,
      env,
      mode,
      subscriptionId,
      historyType,
      startTime,
      endTime,
    } = reqBody;

    let reqData = {};
    if (startTime != "" && endTime != "") {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        subscriptionId: subscriptionId,
        historyType: historyType,
        startTime: `${startTime} 00:00:00`, //startTime + " 00:00:00",
        endTime: `${endTime} 23:59:59`, //endTime + " 23:59:59"
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

    const carrierHistoryRes: any = await axios(sendObj);

    if (!carrierHistoryRes?.data?.response?.success) {
      const dataErr = carrierHistoryRes?.data?.response?.data;
      return NextResponse.json({
        message: dataErr.includes("Incorrect SubscriptionId")
          ? dataErr
          : dataErr.includes("Not Found")
          ? dataErr
          : dataErr.includes("No data available")
          ? dataErr
          : dataErr.includes("for this query")
          ? dataErr
          : dataErr.includes("created for next container journey")
          ? dataErr
          : "Something went wrong while fetching history.",
        success: false,
      });
    }

    // create next response
    const response = NextResponse.json({
      message: "Carrier History.",
      success: true,
      data: carrierHistoryRes?.data?.response?.data,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message.includes("timeout")
          ? "Request timed out. Please try again."
          : error.message,
      },
      { status: 500 }
    );
  }
}
