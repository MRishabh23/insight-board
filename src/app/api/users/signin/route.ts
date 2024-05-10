import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;

        // find user
        const sendObj = {
            method: "post",
            url: process.env.REST_URL!,
            timeout: 60000, // 60000 (1 minute)
            auth: {
                username: process.env.REST_USERNAME!,
                password: process.env.REST_PASSWORD!,
            },
            data: {
                type: "SIGN_IN",
                username: username
            },
          };
      
        const signInRes: any = await axios(sendObj);

        if(!signInRes?.data?.response?.success){
            return NextResponse.json({
                error: "User doesn't exists. Please sign up."
            }, {status: 400})
        }

        // check if password matches
        const validPassword = await bcryptjs.compare(password, signInRes?.data?.response?.data?.password);
        if(!validPassword){
            return NextResponse.json({
                error: "Incorrect password."
            }, {status: 400});
        }

        // create token data
        const tokenData = {
            userId: signInRes?.data?.response?.data?.userId,
            username: signInRes?.data?.response?.data?.username,
            createdAt: signInRes?.data?.response?.data?.createdAt
        };

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        // create next response
        const response = NextResponse.json({
            message: "Sign in Successful.",
            success: true
        });

        // generate cookies
        response.cookies.set("token", token, {httpOnly: true, maxAge: 60*60*24});
        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message.includes("timeout") ? "Request timed out. Please try again." : error.message
        }, {status: 500});
    }
}