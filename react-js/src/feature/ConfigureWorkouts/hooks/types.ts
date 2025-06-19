import { z } from "zod";

export const group = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
});
export type Group = z.infer<typeof group>;

export const groups = z.array(group);

export enum ExerciseTypeEnum {
  weight = 'weight',
  time = 'time',
  distance = 'distance',
}

export const exerciseType = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
  groupId: z.number(),
  type: z.nativeEnum(ExerciseTypeEnum),
});
export type ExerciseType = z.infer<typeof exerciseType>;

export const exerciseTypes = z.array(exerciseType);
export type ExerciseTypes = z.infer<typeof exerciseTypes>;