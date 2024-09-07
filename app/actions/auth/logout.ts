"use server";
import { redirect } from "next/navigation";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { deleteSession } from "@/shared/lib/utils/session";

export async function logout() {
  deleteSession();
  redirect(appRoutes.auth.login);
}
