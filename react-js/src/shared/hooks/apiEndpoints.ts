export enum ApiEndpoints {
  Workouts = "/workouts",
  Workout = "/workout/:workoutId",
  OpenWorkouts = "/workouts/open",
  CreateWorkout = "/createWorkout",
  EndWorkout = "/endWorkout/:workoutId",
  ArchivedWorkouts = "/workouts/archived",
  RestoreWorkout = "/workout/:workoutId/restore",
  DeleteWorkoutPermanent = "/workout/:workoutId/permanent",

  Groups = "/groups",
  Group = "/group",
  UpdateGroup = "/group/:groupId",
  DeleteGroup = "/group/:groupId",

  ExerciseTypes = "/exerciseTypes",
  CreateExerciseType = "/exerciseType",
  ExerciseType = "/exerciseType/:exerciseTypeId",

  Exercises = "/exercises",
  CreateExercise = "/exercise",
  Exercise = "/exercise/:exerciseId",
}