import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiError, ApiResponse, AppApi } from "@/types/api";
import { getErrorMessage } from "../lib/utils/errors";
import appRoutes from "../lib/configs/routes/routes";

interface ErrorConfig extends InternalAxiosRequestConfig {
  is401: boolean;
}
const defaultHeaders = {
  "Content-type": "application/json",
};

const createRequestInstance = (addAuthHeader: boolean): AppApi => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: defaultHeaders,
  });

  instance.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
      const { response, config } = error as {
        response: ApiResponse;
        config: InternalAxiosRequestConfig;
      };
      const { data, status } = response;
      const errors = data?.errors || [];
      console.log({ error });

      const errorMessage = getErrorMessage(response);

      if (status === 401) {
        window.location.pathname = appRoutes.auth.login;
        return;
      }

      const apiError: ApiError = {
        message: errorMessage || "",
        status,
        errors,
      };
      throw apiError;
    }
  );
  return instance as AppApi;
};

export const request = createRequestInstance(true);
export const noAuthRequest = createRequestInstance(false);
