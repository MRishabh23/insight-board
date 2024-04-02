import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
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

        if(checkUserRes?.data?.response?.success){
            return NextResponse.json({
                error: "User already exists."
            }, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // new user
        const newUserObj = {
            method: "post",
            url: process.env.URL!,
            auth: {
                username: process.env.USERNAME!,
                password: process.env.PASSWORD!,
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
                error: signUpRes?.data?.response?.data
            }, {status: 400})
        }

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });


    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500});
    }
}