import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    if(!cookieStore.has("token")){
      return NextResponse.json({ message: "User not found.", success: false });
    }
    const data = cookieStore.get("token");
    const user = jwt.decode(`${data?.value}`);
    return NextResponse.json({ message: "Got user.", success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
