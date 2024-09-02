import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const userId = params.get("userId") || "";
  const result = await GameResultService.finsBestResultsByUserId(userId);
  return NextResponse.json(result);
}
