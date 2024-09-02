import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { GameDuration, GameType } from "@/types/game";
import { Sort } from "@/types/gameResult";
import { Category } from "@/types/test";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  //   const userId = req.user.id;
  const userId = params.get("userId") || "";
  const limit = parseInt(params.get("limit") as string) || 10;
  const offset = parseInt(params.get("offset") as string) || 0;
  const sort = (parseInt(params.get("sort") as string) as Sort) || -1;
  const category = params.get("category") as Category;
  const type = params.get("type") as GameType;
  const duration = params.get("duration") as GameDuration;

  const result = await GameResultService.findUserResults({
    category,
    duration,
    type,
    userId,
    limit,
    offset,
    sort,
  });
  return NextResponse.json(result);
}
