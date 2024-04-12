import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, env, mode} = reqBody;

        // find user
        const sendObj = {
            method: "post",
            url: process.env.URL!,
            auth: {
                username: process.env.USERNAME!,
                password: process.env.PASSWORD!,
            },
            data: {
                type: "GET_CARRIER_STATUS",
                username: username,
                env: env,
                mode: mode
            },
          };
      
        const carrierStatusRes: any = await axios(sendObj);

        if(!carrierStatusRes?.data?.response?.success){
            return NextResponse.json({
                error: "Something went wrong while fetching carrier status."
            }, {status: 400})
        }

        // create next response
        const response = NextResponse.json({
            message: "Carrier Status.",
            success: true,
            data: carrierStatusRes?.data?.response?.data
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500});
    }
}