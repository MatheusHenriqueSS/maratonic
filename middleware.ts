import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isLoginPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");
    const isProfilePage = req.nextUrl.pathname.startsWith("/profile");

    if (isProfilePage) {
      if (!isAuth) return NextResponse.redirect(new URL("/", req.url));

      return null;
    }

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    return null; // Allow access to all other pages for authenticated users
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

//default endpoint?
export const config = {
  matcher: ["/login", "/register", "/profile"],
};
