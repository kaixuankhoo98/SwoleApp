namespace dotnet.Services.WorkoutService
{
    public interface IWorkoutService
    {
        Task<ServiceResponse<List<GetWorkoutDTO>>> GetWorkoutsByUserId(int userId);
        Task<ServiceResponse<GetWorkoutDTO>> GetWorkoutById(int userId, int workoutId);
        Task<ServiceResponse<GetWorkoutDTO>> AddWorkout(int userId);
        Task<ServiceResponse<GetWorkoutDTO>> DeleteWorkout(int userId, int workoutId);
    }
}