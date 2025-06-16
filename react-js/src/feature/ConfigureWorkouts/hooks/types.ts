import { z } from "zod";

export const group = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
});
export type Group = z.infer<typeof group>;

export const groups = z.array(group);

export const exerciseType = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
  groupId: z.number(),
});
export type ExerciseType = z.infer<typeof exerciseType>;

export const exerciseTypes = z.array(exerciseType);
export type ExerciseTypes = z.infer<typeof exerciseTypes>;