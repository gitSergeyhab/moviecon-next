import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { getUserDataByToken } from "@/shared/lib/utils/tokens";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { headers } from "next/headers";

export async function GET() {
  const authorizationHeader = headers().get("Authorization") || "";
  const token = authorizationHeader.split(" ")[1];
  const userData = getUserDataByToken(token);
  if (!userData) {
    return redirect(appRoutes.auth.login);
  }
  const result = await GameResultService.finsBestResultsByUserId(userData?.id);
  return NextResponse.json(result);
}
