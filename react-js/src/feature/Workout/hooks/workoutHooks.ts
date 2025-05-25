import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiCall } from "../../../shared/hooks/api";
import { ApiEndpoints } from "../../../shared/hooks/apiEndpoints";
import { HttpMethod } from "../../../shared/hooks/http";
import { useInvalidateQueries } from "../../../shared/hooks/useInvalidateQueries";
import { getWorkout, workouts, workoutIdObject } from "./types";

export const useGetWorkout = (workoutId: number | null) => {
  return useQuery({
    queryKey: [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')],
    queryFn: async () => await apiCall({
      route: ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? ''),
      method: HttpMethod.Get,
    }, getWorkout),
    enabled: workoutId !== null,
  });
}

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => await apiCall({
      route: ApiEndpoints.CreateWorkout,
      method: HttpMethod.Post,
    }, workoutIdObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.OpenWorkouts] });
    }
  });
}

export const useEndWorkout = (endDateTime?: Date) => {
  return useMutation({
    mutationFn: async (workoutId: number) => await apiCall({
      route: ApiEndpoints.EndWorkout.replace(":workoutId", workoutId.toString()),
      method: HttpMethod.Post,
      body: {
        endDateTime: endDateTime ? endDateTime.toISOString() : undefined,
      }
    }, z.any()),
    ...useInvalidateQueries([
      [ApiEndpoints.OpenWorkouts],
      [ApiEndpoints.Workouts],
    ]),
  });
}

export const useDeleteWorkout = () => {
  return useMutation({
    mutationFn: async (workoutId: number) => await apiCall({
      route: ApiEndpoints.Workout.replace(":workoutId", workoutId.toString()),
      method: HttpMethod.Delete,
    }, z.any()),
    ...useInvalidateQueries([
      [ApiEndpoints.OpenWorkouts],
      [ApiEndpoints.ArchivedWorkouts],
    ]),
  });
}

export const useGetArchivedWorkouts = () => {
  return useQuery({
    queryKey: [ApiEndpoints.ArchivedWorkouts],
    queryFn: async () => await apiCall({
      route: ApiEndpoints.ArchivedWorkouts,
      method: HttpMethod.Get,
    }, workouts),
  });
}

export const useRestoreWorkout = () => {
  return useMutation({
    mutationFn: async (workoutId: number) => await apiCall({
      route: ApiEndpoints.RestoreWorkout.replace(":workoutId", workoutId.toString()),
      method: HttpMethod.Post,
    }, z.any()),
    ...useInvalidateQueries([
      [ApiEndpoints.OpenWorkouts],
      [ApiEndpoints.ArchivedWorkouts],
    ]),
  });
}

export const useDeleteWorkoutPermanent = () => {
  return useMutation({
    mutationFn: async (workoutId: number) => await apiCall({
      route: ApiEndpoints.DeleteWorkoutPermanent.replace(":workoutId", workoutId.toString()),
      method: HttpMethod.Delete,
    }, z.any()),
    ...useInvalidateQueries([
      [ApiEndpoints.ArchivedWorkouts],
    ]),
  });
}

