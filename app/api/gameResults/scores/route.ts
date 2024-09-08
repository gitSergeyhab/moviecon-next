import { NextResponse } from "next/server";

import { GameResultService } from "@/shared/lib/db/services/gameResultService";

export async function GET() {
  const scores = await GameResultService.getScoreList();
  return NextResponse.json(
    scores.map(({ _id, scores }) => ({ scores, params: _id }))
  );
}
