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
      carrier,
      referenceType,
      refStatus,
      reference,
    } = reqBody;

    let reqData = {
      type: type,
      username: username,
      env: env,
      mode: mode,
      carrier: carrier,
      referenceType: referenceType,
      status: refStatus,
      reference: reference,
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

    //console.log("sendObj", sendObj);

    const carrierReferenceRes: any = await axios(sendObj);

    if (!carrierReferenceRes?.data?.response?.success) {
      const dataErr = carrierReferenceRes?.data?.response?.data;
      return NextResponse.json({
        message: dataErr.includes("Wrong reference")
          ? dataErr
          : "Something went wrong while fetching reference data.",
        success: false,
      });
    }

    // create next response
    const response = NextResponse.json({
      message: "Carrier reference data.",
      success: true,
      data: carrierReferenceRes?.data?.response?.data,
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
