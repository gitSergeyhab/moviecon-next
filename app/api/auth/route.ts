import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/shared/lib/db/services/userService";
import { toUserDTO } from "@/shared/lib/utils/adapters/user";
import { cookies } from "next/headers";
import { decrypt } from "@/shared/lib/utils/session";
import { SessionPayload } from "@/types/session";

export async function GET(req: NextRequest) {
  const cookie = cookies().get("session")?.value;
  const userData = (await decrypt(cookie)) as SessionPayload | undefined;

  if (!userData) {
    return NextResponse.json(null);
  }

  const user = await UserService.findById(userData.userId);

  if (!user) {
    return NextResponse.json(null);
  }

  return NextResponse.json(toUserDTO(user));
}
