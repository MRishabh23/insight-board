import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { type, username, env, mode, carriers, queue, startTime, endTime } =
      reqBody;

    let reqData = {};
    if (startTime != "" && endTime != "") {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        carriers: carriers,
        queue: queue,
        startTime: `${startTime} 00:00:00`, //startTime + " 00:00:00",
        endTime: `${endTime} 23:59:59`, //endTime + " 23:59:59"
      };
    } else {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        carriers: carriers,
        queue: queue,
        startTime: "",
        endTime: ""
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

    const carrierSummaryRes: any = await axios(sendObj);

    if (!carrierSummaryRes?.data?.response?.success) {
      return NextResponse.json(
        {
          error: "Something went wrong while fetching summary.",
        },
        { status: 400 }
      );
    }

    // create next response
    const response = NextResponse.json({
      message: "Carrier Summary.",
      success: true,
      data: carrierSummaryRes?.data?.response?.data,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message.includes("timeout") ? "Request timed out. Please try again." : error.message,
      },
      { status: 500 }
    );
  }
}
