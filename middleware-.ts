import { NextRequest, NextResponse } from "next/server";
import { getUserDataByToken } from "./shared/lib/utils/tokens";
import { adminRoutes, publicRoutes } from "./shared/lib/configs/routes/routes";
const roles = ["USER", "ADMIN"];
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const authorization = req.headers.get("authorization") || "";

  const token = authorization.split(" ")[1];
  const userData = getUserDataByToken(token);
  const path = req.nextUrl.pathname;

  if (!userData && !(publicRoutes as string[]).includes(path)) {
    console.error("ошибка токена", { userData });
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (userData?.role !== "ADMIN" && (adminRoutes as string[]).includes(path)) {
    console.error("нехватает прав", { userData, path });
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
}
