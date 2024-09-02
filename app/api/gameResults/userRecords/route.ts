import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  //   const userId = req.user.id;
  const userId = params.get("userId") || "";
  console.log(userId);
  const result = await GameResultService.finsBestResultsByUserId(userId);

  return NextResponse.json(result);
}
