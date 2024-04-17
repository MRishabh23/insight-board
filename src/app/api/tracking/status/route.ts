import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { type, username, env, mode, carrier, status } = reqBody;

    // find user
    let reqData = {};
    let errorStr = "";
    if (type === "GET_CARRIER_STATUS") {
      reqData = {
        type: "GET_CARRIER_STATUS",
        username: username,
        env: env,
        mode: mode,
      };
      errorStr = "Something went wrong while fetching carrier status.";
    } else {
      reqData = {
        type: "UPDATE_CARRIER_STATUS",
        username: username,
        env: env,
        mode: mode,
        carrier: carrier,
        status: status,
      };
      errorStr = "Something went wrong while updating carrier status.";
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

    const carrierStatusRes: any = await axios(sendObj);

    if (!carrierStatusRes?.data?.response?.success) {
      return NextResponse.json(
        {
          error: errorStr,
        },
        { status: 400 }
      );
    }

    // create next response
    const response = NextResponse.json({
      message: "Carrier Status.",
      success: true,
      data: carrierStatusRes?.data?.response?.data,
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
