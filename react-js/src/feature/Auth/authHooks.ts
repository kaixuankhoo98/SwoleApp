import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiCall } from "../../shared/hooks/api";
import { HttpMethod } from "../../shared/hooks/http";

enum UserEndpoints {
  Login = "/login",
  SignUp = "/signup",
  Logout = "/logout",
  Validate = "/validate",
}

// Login
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginSchema = z.infer<typeof loginSchema>;
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: LoginSchema) => {
      await apiCall({
        route: UserEndpoints.Login,
        method: HttpMethod.Post,
        body: request,
      }, z.object({}));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserEndpoints.Validate] });
    }
  });
}

// Sign Up
export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });
export type SignupSchema = z.infer<typeof signupSchema>;
export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: SignupSchema) => {
      await apiCall({
        route: UserEndpoints.SignUp,
        method: HttpMethod.Post,
        body: request,
      }, z.object({}));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserEndpoints.Validate] });
    }
  });
}

// Logout
export const useLogout = () =>
  useMutation({
    mutationFn: () => apiCall({
      route: UserEndpoints.Logout,
      method: HttpMethod.Post,
    }, z.object({
      message: z.string(),
    })),
  });

// Validate
const userSchema = z.object({
  userId: z.number(),
  email: z.string(),
});
export type UserSchema = z.infer<typeof userSchema>;
export const useUser = () =>
  useQuery({
    queryKey: [UserEndpoints.Validate],
    queryFn: async () =>
      userSchema.parse(await apiCall({
        route: UserEndpoints.Validate,
        method: HttpMethod.Get,
      }, userSchema)),  
    retry: false,
  });
