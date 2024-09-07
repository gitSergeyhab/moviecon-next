// import { NextRequest, NextResponse } from "next/server";
// import { getUserDataByToken } from "./shared/lib/utils/tokens";
// import appRoutes, {
//   adminRoutes,
//   publicRoutes,
// } from "./shared/lib/configs/routes/routes";

// export function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const authorization = req.headers.get("Authorization") || "";

//   const token = authorization.split(" ")[1];
//   const userData = getUserDataByToken(token);
//   const path = req.nextUrl.pathname;

//   if (!userData && !(publicRoutes as string[]).includes(path)) {
//     console.error("ошибка токена", { userData });
//     return NextResponse.redirect(new URL(appRoutes.auth.login, req.url));
//   }

//   if (userData?.role !== "ADMIN" && (adminRoutes as string[]).includes(path)) {
//     console.error("нехватает прав", { userData, path });
//     return NextResponse.redirect(new URL(appRoutes.auth.login, req.url));
//   }
//   return res;
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|img).*)",
//   ],
// };
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./shared/lib/utils/session";
import {
  adminRoutes,
  protectedRoutes,
  publicRoutes,
} from "./shared/lib/configs/routes/routes";

// 1. Specify protected and public routes
// const protectedRoutes: string[]  = [appRoutes.admin]
// const publicRoutes: string[] = [appRoutes.auth.login, appRoutes.auth.register, appRoutes.main, appRoutes.about]

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = (
    [...adminRoutes, ...protectedRoutes] as string[]
  ).includes(path);
  // const isPublicRoute = (publicRoutes as string[]).includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // console.log({ path, isProtectedRoute, cookie, session });
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith("/dashboard")
  // ) {
  // return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
