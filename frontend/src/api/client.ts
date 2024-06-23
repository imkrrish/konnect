import axios from "axios";
import { commonErrorAuthInterceptor, commonResponseInterceptor } from "./interceptors";

const client = axios.create({
  baseURL: "/api/v1",
});

client.interceptors.response.use(commonResponseInterceptor, commonErrorAuthInterceptor);

export default client;

export type ApiRespnose = {
  isSuccess: boolean;
  error?: string;
  message?: string;
};
