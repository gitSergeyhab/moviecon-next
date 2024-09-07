import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { GameResultService } from "@/shared/lib/db/services/gameResultService";
import { decrypt } from "@/shared/lib/utils/session";
import { SessionPayload } from "@/types/session";

export async function GET() {
  const cookie = cookies().get("session")?.value;
  const userData = (await decrypt(cookie)) as SessionPayload | undefined;
  if (!userData) {
    return redirect(appRoutes.auth.login); // TODO проверить редирект
  }
  const result = await GameResultService.finsBestResultsByUserId(
    userData?.userId
  );
  return NextResponse.json(result);
}
