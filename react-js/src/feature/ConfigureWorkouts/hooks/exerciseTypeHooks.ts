import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiEndpoints } from "../../../shared/hooks/apiEndpoints";
import { apiCall } from "../../../shared/hooks/api";
import { HttpMethod } from "../../../shared/hooks/http";
import { ExerciseTypeEnum, exerciseTypes } from "./types";
import { z } from "zod";

export const useGetExerciseTypes = () => {
  return useQuery({
    queryKey: [ApiEndpoints.ExerciseTypes],
    queryFn: async () => await apiCall({
      route: ApiEndpoints.ExerciseTypes,
      method: HttpMethod.Get,
    }, exerciseTypes),
  });
}

export const useAddExerciseType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      name, 
      groupId, 
      type 
    }: { name: string, groupId: number, type: ExerciseTypeEnum }) => await apiCall({
      route: ApiEndpoints.CreateExerciseType,
      method: HttpMethod.Post,
      body: { name, groupId, type },
    }, z.any()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.ExerciseTypes] });
    },
  });
}

export const useUpdateExerciseType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      exerciseTypeId, 
      name, 
      groupId, 
      type 
    }: { exerciseTypeId: number, name: string, groupId: number, type: ExerciseTypeEnum }) => await apiCall({
      route: ApiEndpoints.ExerciseType.replace(':exerciseTypeId', exerciseTypeId.toString()),
      method: HttpMethod.Put,
      body: { name, groupId, type },
    }, z.any()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.ExerciseTypes] });
    },
  });
}

export const useDeleteExerciseType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (exerciseTypeId: number) => await apiCall({
      route: ApiEndpoints.ExerciseType.replace(':exerciseTypeId', exerciseTypeId.toString()),
      method: HttpMethod.Delete,
    }, z.any()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.ExerciseTypes] });
    },
  });
}