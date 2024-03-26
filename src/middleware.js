import Cookies from "js-cookie";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { useAuthContext } from "./app/context/authContext";

const authRoutes = ["/cart", "/success", "/cancel"];

const unAuthRoutes = ["/login", "/signup"];

export function middleware(req) {
  // const { token } = useAuthContext();
  // console.log("🚀 ~ middleware ~ token:", req);
  const reqToken = req?.cookies?.get("token");
  // console.log(
  //   "🚀 ~ middleware ~ token object as key and value pair:",
  //   reqToken
  // );

  const token = reqToken?.value;

  // console.log("🚀 ~ middleware ~ value:", token);
  // const token = Cookies.get("token");
  // console.log("🚀 ~ middleware ~ token:", token);
  console.log("🚀 ~ Middleware ~ running");

  if (!token && authRoutes.includes(req.nextUrl.pathname)) {
    const abs_url = new URL("/login", req.nextUrl.origin);
    // const abs_url = new URL("/login", req.url); // redirect home page code step by step
    console.log("🚀 ~ Middleware ~ abs_url:", abs_url);
    return NextResponse.redirect(abs_url.toString());
  }

  if (token && unAuthRoutes.includes(req.nextUrl.pathname)) {
    const abs_url = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(abs_url.toString());
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ["/cart", "/success", "/cancel"],
};

// matcher: ["/product","/product/:path*","/cart", "/success", "/cancel"],
