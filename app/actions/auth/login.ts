"use server";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { UserService } from "@/shared/lib/db/services/userService";
import { Crypt } from "@/shared/lib/utils/crypt";
import { createSession, deleteSession } from "@/shared/lib/utils/session";
import { LoginSchema, LoginSchemaType } from "@/shared/schemas/login";
import { redirect } from "next/navigation";

export interface LoginResult {
  errors?: Partial<
    Record<keyof LoginSchemaType, string[]> & {
      message?: string[];
    }
  >;
}
export async function login(
  _state: any,
  formData: FormData
): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const user = await UserService.findByEmail(email);

  if (!user) {
    return {
      errors: { email: ["пользователя с таким email не существует"] },
    };
  }

  const isPasswordValid = Crypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      errors: { password: ["пароль неверен"] },
    };
  }

  await createSession({
    userId: user.id,
    role: user.role,
  });

  redirect(appRoutes.main);
}
