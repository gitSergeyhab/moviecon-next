import { UserInfoClient } from "@/types/user";
import { request } from "./";

const url = "/auth/";

export const requestUser$ = async (): Promise<UserInfoClient> => {
  const response = await request.get(url);
  return response;
};
