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
      resourceId,
    } = reqBody;

    let reqData = {};
    if (resourceId != "") {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        resourceId: resourceId,
      };
    }

    const sendObj = {
      method: "post",
      url: process.env.URL!,
      timeout: 120000,
      auth: {
        username: process.env.USERNAME!,
        password: process.env.PASSWORD!,
      },
      data: reqData,
    };

    //console.log("sendObj", sendObj);

    const carrierHistoryFetchRes: any = await axios(sendObj);

    if (!carrierHistoryFetchRes?.data?.response?.success) {
      return NextResponse.json(
        {
          error: "Something went wrong while fetching resource history.",
        },
        { status: 400 }
      );
    }

    // create next response
    const response = NextResponse.json({
      message: "Carrier History Fetch.",
      success: true,
      data: carrierHistoryFetchRes?.data?.response?.data,
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
