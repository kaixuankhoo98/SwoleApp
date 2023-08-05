namespace dotnet.Services.ExerciseService
{
    public interface IExerciseService
    {
        Task<ServiceResponse<List<GetExerciseDTO>>> GetExercisesByWorkout(int workoutId);
        Task<ServiceResponse<GetExerciseDTO>> GetExerciseById(int workoutId, int exerciseId);
        Task<ServiceResponse<GetWorkoutDTO>> AddExercise(int userId, int workoutId, string name, BodyPartClass bodyPartClass);
        Task<ServiceResponse<GetWorkoutDTO>> DeleteExercise(int userId, int workoutId, int exerciseId);
    }
}