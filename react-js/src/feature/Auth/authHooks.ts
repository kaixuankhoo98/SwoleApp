import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "../../shared/hooks/api";

enum UserEndpoints {
  Login = "/login",
  Logout = "/logout",
  Validate = "/validate",
}
const userSchema = z.object({
  userId: z.number(),
});
export type UserSchema = z.infer<typeof userSchema>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await apiRequest<{}>(UserEndpoints.Login, {
        method: "POST",
        body: credentials,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserEndpoints.Validate] });
    }
  });
}

export const useLogout = () =>
  useMutation({
    mutationFn: () => apiRequest(UserEndpoints.Logout, { method: "POST" }),
  });

export const useUser = () =>
  useQuery({
    queryKey: [UserEndpoints.Validate],
    queryFn: async () =>
      userSchema.parse(await apiRequest<UserSchema>(UserEndpoints.Validate)),
    retry: false,
  });
