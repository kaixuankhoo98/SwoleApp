import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiEndpoints } from "../../../shared/hooks/apiEndpoints";
import { HttpMethod } from "../../../shared/hooks/http";
import { apiCall } from "../../../shared/hooks/api";
import { z } from "zod";
import { useWorkoutStore } from "../workoutStore";
import { GetWorkout } from "./types";

export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseTypeId }: { exerciseTypeId: number }) => await apiCall({
      route: ApiEndpoints.CreateExercise,
      method: HttpMethod.Post,
      body: { workoutId, exerciseTypeId },
    }, z.object({
      exerciseId: z.number(),
      exerciseType: z.string(),
    })),
    onSuccess: (exercise) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: [...existingWorkout.exercises, {
              id: exercise.exerciseId,
              exerciseType: exercise.exerciseType,
              sets: [],
            }],
          };
        });
      }
    }
  });
}

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseId, exerciseTypeId }: { exerciseId: number, exerciseTypeId: number }) => {
      const result = await apiCall({
        route: ApiEndpoints.Exercise.replace(":exerciseId", exerciseId.toString()),
        method: HttpMethod.Put,
        body: { exerciseTypeId },
      }, z.object({
        exerciseId: z.number(),
        exerciseType: z.string(),
      }));
      
      return { ...result, exerciseTypeId };
    },
    onSuccess: (data) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((e) => 
              e.id === data.exerciseId 
                ? { ...e, exerciseType: data.exerciseType, exerciseTypeId: data.exerciseTypeId } 
                : e
            ),
          };
        });
      }
    }
  });
}

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async (exerciseId: number) => await apiCall({
      route: ApiEndpoints.Exercise.replace(":exerciseId", exerciseId.toString()),
      method: HttpMethod.Delete,
    }, z.object({
      exerciseId: z.number(),
    })),
    onSuccess: (data) => {
      if (data) {
        const currentWorkout = queryClient.getQueryData(workoutKey);
        if (currentWorkout) {
          queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
            return {
              ...existingWorkout,
              exercises: existingWorkout.exercises.filter((e) => e.id !== data.exerciseId),
            };
          });
        }
      }
    }
  });
}