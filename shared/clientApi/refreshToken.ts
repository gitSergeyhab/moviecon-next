import { UserTokens } from "@/types/user";
import axios from "axios";
import { handledRequest } from "../lib/utils/errors";
import TokenService from "../lib/utils/storageServices/tokenService";

const requestTokens$ = (refresh: string): Promise<{ data: UserTokens }> =>
  axios.post(`${process.env.apiBaseUrl}/auth/refresh-tokens/`, { refresh });

const requestTokens = handledRequest(
  requestTokens$,
  "не возможно обновить токены, попробуйте войти через логин",
  null
);

export const refreshToken = async (): Promise<UserTokens | null> => {
  const refresh = TokenService.refreshToken;
  if (!refresh) {
    console.error("refresh token не найден");
    return null;
  }
  const response = await requestTokens(refresh);
  if (!response) return null;
  return response.data;
};
