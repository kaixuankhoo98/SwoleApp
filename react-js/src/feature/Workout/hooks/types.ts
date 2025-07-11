import { nullableDateTime } from "../../../shared/dates";
import { z } from "zod";
import { dateTime } from "../../../shared/dates";

export const workoutIdObject = z.object({
  workoutId: z.number(),
});

export const workout = z.object({
  id: z.number(),
  startTime: dateTime,
  endTime: nullableDateTime,
});
export type Workout = z.infer<typeof workout>;
export const workouts = z.array(workout);
export type Workouts = z.infer<typeof workouts>;

// Workout exercise sets
export const weightedSetResponse = z.object({
  id: z.number(),
  reps: z.number(),
  weight: z.number(),
  isCompleted: z.boolean(),
});
export type WeightedSetResponse = z.infer<typeof weightedSetResponse>;

export const durationSetResponse = z.object({
  id: z.number(),
  duration: z.number(),
  isCompleted: z.boolean(),
});
export type DurationSetResponse = z.infer<typeof durationSetResponse>;

// Union type for all set types
export const setResponse = z.union([weightedSetResponse, durationSetResponse]);
export type SetResponse = z.infer<typeof setResponse>;

// Type guards
export const isWeightedSet = (set: SetResponse): set is WeightedSetResponse => {
  return 'reps' in set && 'weight' in set;
};

export const isDurationSet = (set: SetResponse): set is DurationSetResponse => {
  return 'duration' in set;
};

export const exerciseResponse = z.object({
  id: z.number(),
  exerciseType: z.string(),
  exerciseTypeId: z.number(),
  sets: z.array(setResponse),
});
export type ExerciseResponse = z.infer<typeof exerciseResponse>;
export const getWorkout = workout.extend({
  exercises: z.array(exerciseResponse),
});
export type GetWorkout = z.infer<typeof getWorkout>;