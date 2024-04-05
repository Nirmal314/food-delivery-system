import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  USER_REDIRECT_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
  adminRoutes,
  userRoutes,
} from "@/routes";
import { UserRole } from "@prisma/client";
import { auth } from "./auth";
import { cookies } from "next/headers";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

// @ts-ignore
export default auth(async (req) => {
  const session = await auth();

  const isLoggedIn = !!req.auth;
  const isAdmin = session?.user?.role === UserRole.ADMIN;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isUserRoute = userRoutes.includes(nextUrl.pathname);
  const isCartRoute = nextUrl.pathname === "/cart";
  const isContactRoute = nextUrl.pathname === "/login/complete-google-login";

  const adminRedirect = Response.redirect(
    new URL(ADMIN_DASHBOARD_ROUTE, nextUrl)
  );
  const userRedirect = Response.redirect(new URL(USER_REDIRECT_ROUTE, nextUrl));

  if (isApiAuthRoute) {
    return null;
  }
  if (isLoggedIn) {
    if (
      isCartRoute &&
      (!session?.user?.address || !session?.user?.contactNumber)
    ) {
      return Response.redirect(
        new URL("/login/complete-google-login", nextUrl)
      );
    }
    if (
      isContactRoute &&
      session?.user?.address &&
      session?.user?.contactNumber
    ) {
      return userRedirect;
    }
    if (isAuthRoute) {
      if (isAdmin) {
        return adminRedirect;
      } else {
        return userRedirect;
      }
    } else if (isAdminRoute) {
      if (!isAdmin) {
        return userRedirect;
      }
    } else if (isPublicRoute) {
      if (isAdmin) {
        return adminRedirect;
      }
    } else if (isUserRoute) {
      if (isAdmin) {
        return adminRedirect;
      }
    }
    return null;
  }

  if (!isLoggedIn) {
    if (isAdminRoute) {
      return userRedirect;
    }
    if (isUserRoute) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
