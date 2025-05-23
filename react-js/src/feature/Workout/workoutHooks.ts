import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "../../shared/hooks/api";
import { ApiEndpoints } from "../../shared/hooks/apiEndpoints";

const workout = z.object({
  workoutId: z.number(),
});
type Workout = z.infer<typeof workout>;
const workoutResponse = z.object({
  id: z.number(),
  startTime: z.date(),
  endTime: z.date(),
})
const workoutsResponse = z.array(workoutResponse);
type WorkoutsResponse = z.infer<typeof workoutsResponse>;

export const useCreateWorkout = () => {
  return useMutation({
    mutationFn: async () => await apiRequest<Workout>(ApiEndpoints.CreateWorkout, {
        method: "POST",
      }),
  });
}

export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (workoutId: number) => await apiRequest<Workout>(ApiEndpoints.Workout.replace(":workoutId", workoutId.toString()), {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.OpenWorkouts, ApiEndpoints.ArchivedWorkouts] });
    },
  });
}

export const useGetArchivedWorkouts = () => {
  return useQuery({
    queryKey: [ApiEndpoints.ArchivedWorkouts],
    queryFn: async () => await apiRequest<WorkoutsResponse>(ApiEndpoints.ArchivedWorkouts, {
      method: "GET",
    }),
  });
}

export const useRestoreWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workoutId: number) => await apiRequest<Workout>(ApiEndpoints.RestoreWorkout.replace(":workoutId", workoutId.toString()), {
      method: "POST",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.OpenWorkouts, ApiEndpoints.ArchivedWorkouts] });
    },
  });
}

export const useDeleteWorkoutPermanent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (workoutId: number) => await apiRequest<Workout>(ApiEndpoints.DeleteWorkoutPermanent.replace(":workoutId", workoutId.toString()), {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiEndpoints.OpenWorkouts, ApiEndpoints.ArchivedWorkouts] });
    },
  });
}

