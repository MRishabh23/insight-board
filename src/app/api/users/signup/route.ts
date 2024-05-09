import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import axios from "axios";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;

        // hashed password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        // find user
        const newUserObj = {
            method: "post",
            url: process.env.REST_URL!,
            timeout: 60000,
            auth: {
                username: process.env.REST_USERNAME!,
                password: process.env.REST_PASSWORD!,
            },
            data: {
                type: "SIGN_UP",
                username: username,
                password: hashedPassword,
            },
          };
      
        let signUpRes: any = await axios(newUserObj);

        if(!signUpRes?.data?.response?.success){
            return NextResponse.json({
                error: "User exists. Please sign in."
            }, {status: 400})
        }

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });


    } catch (error: any) {
        return NextResponse.json({
            error: error.message.includes("timeout") ? "Request timed out. Please try again." : error.message
        }, {status: 500});
    }
}