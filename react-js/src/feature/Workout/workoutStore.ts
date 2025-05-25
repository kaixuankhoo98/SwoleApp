import { z } from "zod";
import { create } from "zustand";

const workout = z.object({
  workoutId: z.number(),
});
type Workout = z.infer<typeof workout>;

type State = {
  workout: Workout | null;
}

type Actions = {
  setWorkout: (workout: Workout | null) => void;
}

export const useWorkoutStore = create<State & Actions>((set) => ({
  workout: null,
  setWorkout: (workout: Workout | null) => set({ workout }),
}));

