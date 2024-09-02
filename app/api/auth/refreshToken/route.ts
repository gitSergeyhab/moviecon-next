import { getNewTokens, getUserDataByToken } from "@/shared/lib/utils/tokens";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { refresh } = await request.json();
  const decoded = getUserDataByToken(refresh);
  if (!decoded) {
    return NextResponse.json(
      {
        message: "refresh Токен не действителен",
      },
      { status: 401 }
    );
  }
  const newTokens = getNewTokens(decoded.id, decoded.role);
  return NextResponse.json(newTokens);
}
