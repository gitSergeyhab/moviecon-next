import { UserService } from "@/shared/lib/db/services/userService";
import { Crypt } from "@/shared/lib/utils/crypt";
import { getUserWithTokens } from "@/shared/lib/utils/user";
import { getBodyValidErrors } from "@/shared/lib/utils/validation";
import { RegisterSchema } from "@/shared/schemas/register";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const errors = getBodyValidErrors(body, RegisterSchema);

  if (errors) {
    return NextResponse.json({ errors }, { status: 400 });
  }
  const userByEmail = await UserService.findByEmail(`${body.email}`);
  const userByName = await UserService.findByName(`${body.name}`);

  if (userByEmail) {
    return NextResponse.json(
      {
        errors: [
          {
            name: "email",
            message: "пользователя с таким email уже существует",
          },
        ],
      },
      { status: 400 }
    );
  }

  if (userByName) {
    return NextResponse.json(
      {
        errors: [
          {
            name: "email",
            message: "пользователя с таким именем уже существует",
          },
        ],
      },
      { status: 400 }
    );
  }

  const user = await UserService.create({
    name: body.name,
    email: body.email,
    password: Crypt.hash(body.password),
  });

  const userWithTokens = getUserWithTokens(user);
  console.log({ userWithTokens });
  return NextResponse.json(userWithTokens);
}
