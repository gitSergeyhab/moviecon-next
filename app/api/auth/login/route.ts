import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/shared/lib/db/services/userService";
import { Crypt } from "@/shared/lib/utils/crypt";
import { getUserWithTokens } from "@/shared/lib/utils/user";
import { getBodyValidErrors } from "@/shared/lib/utils/validation";
import { LoginSchema } from "@/shared/schemas/login";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const errors = getBodyValidErrors(body, LoginSchema);

  if (errors) {
    return NextResponse.json({ errors }, { status: 400 });
  }
  const user = await UserService.findByEmail(`${body.email}`);

  if (!user) {
    return NextResponse.json(
      {
        errors: [
          {
            name: "email",
            message: "пользователя с таким email нет",
          },
        ],
      },
      { status: 400 }
    );
  }
  console.log({ user });

  const isPasswordValid = Crypt.compare(body.password, user.password);
  console.log({ isPasswordValid });

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ name: "password", message: "неверный пароль" }] },
      { status: 400 }
    );
  }
  const userWithTokens = getUserWithTokens(user);
  console.log({ userWithTokens });
  return NextResponse.json(userWithTokens);
}
