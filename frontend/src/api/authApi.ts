import { z } from "zod";
import client, { ApiRespnose } from "./client";

export default class AuthApi {
  static async login(body: LoginBody) {
    const { data } = await client.post<ApiRespnose>("/auth/login", body);
    return LoginResponseSchema.parse(data);
  }

  static async register(body: RegisterBody) {
    const { data } = await client.post<ApiRespnose>("/auth/register", body);
    return RegisterResponseSchema.parse(data);
  }

  static async logout() {
    const { data } = await client.post<ApiRespnose>("/auth/logout");
    return {
      isSuccess: data.isSuccess,
    };
  }

  static async getUser() {
    const { data } = await client.get<ApiRespnose>("/auth/info");
    return RegisterResponseSchema.parse(data);
  }
}

export const LoginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Email is invalid"),
  password: z.string().trim().min(1, "Password is required"),
});

const RegisterSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required"),
  lastName: z.string().trim().optional(),
  email: z.string().trim().min(1, "Email is required").email("Email is invalid"),
  password: z.string().trim().min(1, "Password is required"),
  confirmPassword: z.string().trim().min(1, "Confirm Password is required"),
});

export const RegisterFormSchema = RegisterSchema.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

const RegisterBodySchema = RegisterSchema.omit({ confirmPassword: true });

const LoginResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
});

const UserSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
});

const RegisterResponseSchema = z.object({
  isSuccess: z.boolean(),
  data: UserSchema,
});

export type IUser = z.infer<typeof UserSchema>;
export type LoginBody = z.infer<typeof LoginFormSchema>;
export type RegisterBody = z.infer<typeof RegisterBodySchema>;
