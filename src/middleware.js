import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set({
              name,
              value,
              ...options,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            });
          });
        },
      },
    },
  );

  // Refresh session if expired - this is critical!
  await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Allow access to login page
  if (pathname === "/admin/login") {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url),
      );
    }
    return response;
  }

  // Protect all admin routes
  if (pathname.startsWith("/admin/")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirected_from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
