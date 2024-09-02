import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { NextResponse } from "next/server";

export async function GET() {
  const scores = await GameResultService.getScoreList();
  return NextResponse.json(scores);
}
