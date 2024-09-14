import { Dayjs } from "dayjs"

enum WorkoutType {
  Push = 'push',
  Pull = 'pull',
  Legs = 'legs',
  Cardio = 'cardio',
  Abs = 'abs'
}

type Set = {
  reps: number,
  weight?: number,
}

type Exercise = {
  name: string,
  sets: Set[]
}

export type Workout = {
  date: Dayjs,
  types: WorkoutType[],
  exercises: Exercise[],
}
