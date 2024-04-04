import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import axios from "axios";
import { randomUUID } from "crypto";


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
            url: process.env.URL!,
            auth: {
                username: process.env.USERNAME!,
                password: process.env.PASSWORD!,
            },
            data: {
                type: "SIGN_UP",
                userId: randomUUID(),
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
            error: error.message
        }, {status: 500});
    }
}