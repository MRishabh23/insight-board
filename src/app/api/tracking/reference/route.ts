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
      queue,
      referenceType,
      active,
      bucket,
      page,
      subscriptionId,
      referenceId,
      category,
    } = reqBody;

    let reqData = {};
    if (category === "all") {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        carrier: carrier,
        queue: queue,
        referenceType: referenceType,
        active: active,
        bucket: bucket,
        page: +page,
        limit: 5,
      };
    } else if (category === "subscription") {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        subscriptionId: subscriptionId,
      };
    } else {
      reqData = {
        type: type,
        username: username,
        env: env,
        mode: mode,
        referenceId: referenceId,
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

    const carrierReferenceRes: any = await axios(sendObj);

    if (!carrierReferenceRes?.data?.response?.success) {
      const dataErr = carrierReferenceRes?.data?.response?.data;
      return NextResponse.json({
        message: dataErr.includes("pass one carrier")
          ? dataErr
          : dataErr.includes("created for next container journey")
          ? dataErr
          : "Something went wrong while fetching references.",
        success: false,
      });
    }

    // create next response
    if (category === "all") {
      return NextResponse.json({
        message: "Carrier references.",
        success: true,
        data: carrierReferenceRes?.data?.response?.data,
        count: carrierReferenceRes?.data?.response?.count,
      });
    }

    const response = NextResponse.json({
      message: "Carrier references.",
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
