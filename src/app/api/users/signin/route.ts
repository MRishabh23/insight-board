import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;

        // find user
        const checkUserObj = {
            method: "post",
            url: process.env.URL!,
            auth: {
                username: process.env.USERNAME!,
                password: process.env.PASSWORD!,
            },
            data: {
                type: "CHECK_USER",
                username: username
            },
          };
      
        let checkUserRes: any = await axios(checkUserObj);

        if(!checkUserRes?.data?.response?.success){
            return NextResponse.json({
                error: "User didn't exists."
            }, {status: 400})
        }
        
        // make api call to get user details
        const sendObj = {
            method: "post",
            url: process.env.URL!,
            auth: {
                username: process.env.USERNAME!,
                password: process.env.PASSWORD!,
            },
            data: {
                type: "SIGN_IN",
                username: username
            },
          };
      
        const signInRes: any = await axios(sendObj);
        console.log("sign in response", signInRes?.data?.response?.data);

        // check if password matches
        const validPassword = await bcryptjs.compare(password, signInRes?.data?.response?.data?.password);
        if(!validPassword){
            return NextResponse.json({
                error: "Incorrect password."
            }, {status: 400});
        }

        // create token data
        const tokenData = {
            id: signInRes?.data?.userId,
            username: signInRes?.data?.username,
        };

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1m"});

        // create next response
        const response = NextResponse.json({
            message: "Sign in Successful.",
            success: true
        });

        // generate cookies
        response.cookies.set("token", token, {httpOnly: true});
        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500});
    }
}