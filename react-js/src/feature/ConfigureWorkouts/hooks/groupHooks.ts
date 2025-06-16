import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiEndpoints } from "../../../shared/hooks/apiEndpoints";
import { apiCall } from "../../../shared/hooks/api";
import { HttpMethod } from "../../../shared/hooks/http";
import { groups } from "./types";
import { z } from "zod";

export const useGetGroups = () => {
  return useQuery({
    queryKey: [ApiEndpoints.Groups],
    queryFn: async () => await apiCall({
      route: ApiEndpoints.Groups,
      method: HttpMethod.Get,
    }, groups),
  });
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => await apiCall({
      route: ApiEndpoints.Group,
      method: HttpMethod.Post,
      body: {name},
    }, z.any()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.Groups] });
    },
  });
}

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, name }: { groupId: number, name: string }) => await apiCall({
      route: ApiEndpoints.UpdateGroup.replace(':groupId', groupId.toString()),
      method: HttpMethod.Put,
      body: { name },
    }, z.any()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.Groups] });
    },
  });
}
export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupId: number) => await apiCall({
      route: ApiEndpoints.DeleteGroup.replace(':groupId', groupId.toString()),
      method: HttpMethod.Delete,
    }, z.any()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.Groups] });
    },
  });
}