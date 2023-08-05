namespace dotnet.Services.SetService
{
    public interface ISetService
    {
        Task<ServiceResponse<List<GetSetDTO>>> GetSetsByExerciseId(int exerciseId);
        Task<ServiceResponse<GetSetDTO>> GetSetById(int setId);
        Task<ServiceResponse<GetExerciseDTO>> AddSet(int exerciseId, AddSetDTO newSet);
        Task<ServiceResponse<GetExerciseDTO>> DeleteSet(int exerciseId, int setId);
        Task<ServiceResponse<GetSetDTO>> UpdateSet(int exerciseId, int setId, UpdateSetDTO updatedSet);
    }
}