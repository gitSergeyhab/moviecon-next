"use server";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { UserService } from "@/shared/lib/db/services/userService";
import { Crypt } from "@/shared/lib/utils/crypt";
import { createSession, deleteSession } from "@/shared/lib/utils/session";
import { RegisterSchema, RegisterSchemaType } from "@/shared/schemas/register";
import { redirect } from "next/navigation";

export interface RegisterResult {
  errors?: Partial<
    Record<keyof RegisterSchemaType, string[]> & {
      message?: string[];
    }
  >;
}
export async function register(
  _state: any,
  formData: FormData
): Promise<RegisterResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;

  const userByEmail = await UserService.findByEmail(email);
  const userByName = await UserService.findByName(name);

  if (userByEmail) {
    return {
      errors: { email: ["пользователь с таким email уже существует"] },
    };
  }

  if (userByName) {
    return {
      errors: { name: ["пользователь с таким именем уже существует"] },
    };
  }
  const hashedPassword = Crypt.hash(password);
  const user = await UserService.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return { errors: { message: ["ошибка регистрации"] } };
  }

  await createSession({
    userId: user.id,
    role: user.role,
  });

  redirect(appRoutes.main);
}

export async function logout() {
  deleteSession();
  redirect(appRoutes.auth.login);
}
