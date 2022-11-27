import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // fetching the user from /api/auth/user
    const response = await fetch(`${request.nextUrl.origin}/api/auth/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: `${request.headers.get("Cookie")}`,
      },
    });

    // check if the response is not ok
    if (!response.ok) throw new Error("Not authenticated");

    // parsing the response
    const user = await response.json();
    if (!user) {
      return NextResponse.rewrite(new URL("/signIn", request.url));
    }
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
  runtime: "experimental-edge",
};
