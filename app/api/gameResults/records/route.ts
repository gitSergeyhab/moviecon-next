import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { toGameResultDTO } from "@/shared/lib/utils/adapters/gameResult";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get("limit") as string) || 10;
  const records = await GameResultService.findRecords(limit);

  return NextResponse.json(
    records.map(({ _id, bestResult }) => ({
      params: _id,
      bestResult: bestResult.map(toGameResultDTO),
    }))
  );
}
