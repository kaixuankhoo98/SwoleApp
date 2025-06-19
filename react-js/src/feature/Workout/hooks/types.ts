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
export const setResponse = z.object({
  id: z.number(),
  reps: z.number(),
  weight: z.number(),
});
export type SetResponse = z.infer<typeof setResponse>;
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