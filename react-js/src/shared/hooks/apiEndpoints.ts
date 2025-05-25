export enum ApiEndpoints {
  Workouts = "/workouts",
  Workout = "/workout/:workoutId",
  OpenWorkouts = "/workouts/open",
  CreateWorkout = "/createWorkout",
  EndWorkout = "/endWorkout/:workoutId",
  ArchivedWorkouts = "/workouts/archived",
  RestoreWorkout = "/workout/:workoutId/restore",
  DeleteWorkoutPermanent = "/workout/:workoutId/permanent",
}