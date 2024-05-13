import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { type, username, env, mode, carriers, queue, referenceType } =
      reqBody;

    let reqData = {};
    if (referenceType === "ALL") {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        carriers: carriers,
        queue: queue,
        referenceType: ""
      };
    } else {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        carriers: carriers,
        queue: queue,
        referenceType: referenceType
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

    const carrierLatencyRes: any = await axios(sendObj);

    if (!carrierLatencyRes?.data?.response?.success) {
      const dataErr = carrierLatencyRes?.data?.response?.data;
      return NextResponse.json(
        {
          message: dataErr.includes("pass one carrier") ? dataErr : "Something went wrong while fetching latency.",
          success: false,
        }
      );
    }

    // create next response
    const response = NextResponse.json({
      message: "Carrier Latency.",
      success: true,
      data: carrierLatencyRes?.data?.response?.data,
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
