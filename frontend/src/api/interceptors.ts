import { AxiosError, AxiosResponse } from "axios";
import { ApiRespnose } from "./client";

export const commonResponseInterceptor = (response: AxiosResponse) => {
  const data = response.data as ApiRespnose;
  if (!data.error) return response;
  let message = "Something went wrong";
  message = data.error || message;
  throw new Error(message);
};

export const commonErrorAuthInterceptor = (error: AxiosError<ApiRespnose>) => {
  const status = error.response?.status;
  const path = window.location.pathname;
  if (status === 401 && !(path === "/login" || path === "/register" || path === "/")) {
    window.location.href = "/login";
  }
  const message = error.response?.data?.message || error.response?.data.error || error.message;
  throw new Error(message);
};
