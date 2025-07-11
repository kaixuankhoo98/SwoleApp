import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../../../shared/hooks/api";
import { HttpMethod } from "../../../shared/hooks/http";
import { ApiEndpoints } from "../../../shared/hooks/apiEndpoints";
import { z } from "zod";
import { useWorkoutStore } from "../workoutStore";
import { DurationSetResponse, GetWorkout, WeightedSetResponse, SetResponse, isWeightedSet, isDurationSet } from "./types";

export const useCreateWeightedSet = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseId, set, isCompleted }: { exerciseId: number, set: WeightedSetResponse, isCompleted: boolean, setIndex?: number }) => await apiCall({
      route: ApiEndpoints.CreateWeightedSet,
      method: HttpMethod.Post,
      body: { 
        exerciseId,
        weight: set.weight,
        reps: set.reps,
        isCompleted,
      },
    }, z.object({
      setId: z.number(),
    })),
    onSuccess: (data, variables) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((exercise) => 
              exercise.id === variables.exerciseId 
                ? { 
                    ...exercise, 
                    sets: exercise.sets.map((existingSet, index) => 
                      existingSet.id === undefined && 
                      (variables.setIndex === undefined || index === variables.setIndex)
                        ? {
                            id: data.setId,
                            reps: variables.set.reps,
                            weight: variables.set.weight,
                            isCompleted: variables.isCompleted,
                          }
                        : existingSet
                    )
                  } 
                : exercise
            ),
          };
        });
      }
    }
  });
}

export const useCreateDurationSet = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseId, set, isCompleted }: { exerciseId: number, set: DurationSetResponse, isCompleted: boolean, setIndex?: number }) => await apiCall({
      route: ApiEndpoints.CreateDurationSet,
      method: HttpMethod.Post,
      body: {
        exerciseId,
        duration: set.duration,
        isCompleted,
      },
    }, z.object({
      setId: z.number(),
    })),
    onSuccess: (data, variables) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((exercise) => 
              exercise.id === variables.exerciseId 
                ? { 
                    ...exercise, 
                    sets: exercise.sets.map((existingSet, index) => 
                      existingSet.id === undefined && 
                      (variables.setIndex === undefined || index === variables.setIndex)
                        ? {
                            id: data.setId,
                            duration: variables.set.duration,
                            isCompleted: variables.isCompleted,
                          }
                        : existingSet
                    )
                  } 
                : exercise
            ),
          };
        });
      }
    }
  });
}

export const useUpdateSet = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseId, set, isCompleted }: { exerciseId: number, set: SetResponse, isCompleted: boolean }) => {
      if (isWeightedSet(set)) {
        return await apiCall({
          route: ApiEndpoints.Set.replace(":setId", set.id?.toString() ?? ''),
          method: HttpMethod.Put,
          body: {
            exerciseId,
            weight: set.weight,
            reps: set.reps,
            isCompleted,
          },
        }, z.object({
          setId: z.number(),
        }));
      } else if (isDurationSet(set)) {
        return await apiCall({
          route: ApiEndpoints.Set.replace(":setId", set.id?.toString() ?? ''),
          method: HttpMethod.Put,
          body: {
            exerciseId,
            duration: set.duration,
            isCompleted,
          },
        }, z.object({
          setId: z.number(),
        }));
      } else {
        throw new Error('Invalid set type');
      }
    },
    onSuccess: (_, variables) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((exercise) => 
              exercise.id === variables.exerciseId 
                ? { 
                    ...exercise, 
                    sets: exercise.sets.map((existingSet) => 
                      existingSet.id === variables.set.id 
                        ? {
                            ...existingSet,
                            ...(isWeightedSet(variables.set) ? {
                              reps: variables.set.reps,
                              weight: variables.set.weight,
                            } : {
                              duration: variables.set.duration,
                            }),
                            isCompleted: variables.isCompleted,
                          }
                        : existingSet
                    )
                  } 
                : exercise
            ),
          };
        });
      }
    }
  });
}

export const useDeleteSet = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ setId }: { setId: number }) => await apiCall({
      route: ApiEndpoints.Set.replace(":setId", setId.toString()),
      method: HttpMethod.Delete,
    }, z.any()),
    onSuccess: (_, variables) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((exercise) => 
              exercise.sets.some((set) => set.id === variables.setId)
                ? { 
                    ...exercise, 
                    sets: exercise.sets.filter((set) => set.id !== variables.setId),
                  } 
                : exercise
            ),
          };
        });
      }
    }
  });
}

export const useAddEmptySet = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseId, setType }: { exerciseId: number, setType: 'weighted' | 'duration' }) => {
      // This is just for optimistic updates - no actual API call needed
      return { exerciseId, setType };
    },
    onSuccess: (_, variables) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((exercise) => 
              exercise.id === variables.exerciseId 
                ? { 
                    ...exercise, 
                    sets: [...exercise.sets, 
                      variables.setType === 'weighted' 
                        ? {
                            id: undefined,
                            reps: 0,
                            weight: 0,
                            isCompleted: false,
                          }
                        : {
                            id: undefined,
                            duration: 0,
                            isCompleted: false,
                          }
                    ]
                  } 
                : exercise
            ),
          };
        });
      }
    }
  });
}

export const useRemoveEmptySet = () => {
  const queryClient = useQueryClient();

  const workoutId = useWorkoutStore((state) => state.workout?.workoutId);
  const workoutKey = [ApiEndpoints.Workout.replace(":workoutId", workoutId?.toString() ?? '')];

  return useMutation({
    mutationFn: async ({ exerciseId, index }: { exerciseId: number, index: number }) => {
      // This is just for optimistic updates - no actual API call needed
      return { exerciseId, index };
    },
    onSuccess: (_, variables) => {
      const currentWorkout = queryClient.getQueryData(workoutKey);
      if (currentWorkout) {
        queryClient.setQueryData(workoutKey, (existingWorkout: GetWorkout) => {
          return {
            ...existingWorkout,
            exercises: existingWorkout.exercises.map((exercise) => 
              exercise.id === variables.exerciseId 
                ? { 
                    ...exercise, 
                    sets: exercise.sets.filter((_, i) => i !== variables.index)
                  } 
                : exercise
            ),
          };
        });
      }
    }
  });
}