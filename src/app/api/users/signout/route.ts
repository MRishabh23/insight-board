import { NextResponse } from "next/server";

export async function GET(){
    try {
        // create next response
        const response = NextResponse.json({
            message: "Sign out Successful.",
            success: true
        });

        // generate cookies
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500});
    }
}