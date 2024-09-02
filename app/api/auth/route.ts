import appRoutes from "@/shared/lib/configs/routes/routes";
import { UserService } from "@/shared/lib/db/services/userService";
import { toUserDTO } from "@/shared/lib/utils/adapters/user";
import { getNewTokens, getUserDataByToken } from "@/shared/lib/utils/tokens";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authorizationHeader = headers().get("Authorization") || "";

  const token = authorizationHeader.split(" ")[1];
  const userData = getUserDataByToken(token);
  if (!userData) {
    return NextResponse.redirect(appRoutes.auth.login);
  }
  const user = await UserService.findById(userData?.id);
  if (!user) {
    return NextResponse.redirect(appRoutes.auth.login);
  }
  const newTokens = getNewTokens(userData.id, userData.role);
  return NextResponse.json({ ...toUserDTO(user), tokens: newTokens });
}
