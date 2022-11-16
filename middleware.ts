import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./pages/api/auth/[...thirdweb]";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await getUser(request);
  const cloneUrl = request.nextUrl.clone();
  if (!user) {
    cloneUrl.pathname = "/signIn";
    return NextResponse.rewrite(cloneUrl.toString());
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
