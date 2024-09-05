import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UserService } from "@/shared/lib/db/services/userService";
import { toUserDTO } from "@/shared/lib/utils/adapters/user";
import { getNewTokens, getUserDataByToken } from "@/shared/lib/utils/tokens";

export async function GET() {
  const authorizationHeader = headers().get("Authorization") || "";
  console.log({
    authorizationHeader,
  });
  const token = authorizationHeader.split(" ")[1];
  const userData = getUserDataByToken(token);

  if (!userData) {
    return null;
  }
  const user = await UserService.findById(userData?.id);
  if (!user) {
    return null;
  }
  const newTokens = getNewTokens(userData.id, userData.role);
  return NextResponse.json({ ...toUserDTO(user), tokens: newTokens });
}
