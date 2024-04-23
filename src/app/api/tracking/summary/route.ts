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
        startTime: startTime + " 00:00:00",
        endTime: endTime + " 23:59:59"
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
      url: process.env.URL!,
      auth: {
        username: process.env.USERNAME!,
        password: process.env.PASSWORD!,
      },
      data: reqData,
    };

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
        error: error.message,
      },
      { status: 500 }
    );
  }
}
