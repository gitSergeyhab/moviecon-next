import appRoutes from "@/shared/lib/configs/routes/routes";
import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { decrypt } from "@/shared/lib/utils/session";
import { GameCategory, GameDuration, GameType } from "@/types/game";
import { Sort } from "@/types/gameResult";
import { SessionPayload } from "@/types/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const cookie = cookies().get("session")?.value;
  const userData = (await decrypt(cookie)) as SessionPayload | undefined;
  if (!userData) {
    return redirect(appRoutes.auth.login); // TODO проверить редирект
  }
  const limit = parseInt(params.get("limit") as string) || 10;
  const offset = parseInt(params.get("offset") as string) || 0;
  const sort = (parseInt(params.get("sort") as string) as Sort) || -1;
  const category = params.get("category") as GameCategory;
  const type = params.get("type") as GameType;
  const duration = params.get("duration") as GameDuration;

  const result = await GameResultService.findUserResults({
    category,
    duration,
    type,
    userId: userData?.userId,
    limit,
    offset,
    sort,
  });
  return NextResponse.json(result);
}
