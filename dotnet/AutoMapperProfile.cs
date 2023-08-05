
namespace dotnet
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Workout, GetWorkoutDTO>();
            CreateMap<AddWorkoutDTO, Workout>();
            CreateMap<Exercise, GetExerciseDTO>();
            CreateMap<AddExerciseDTO, Exercise>();
            CreateMap<Set, GetSetDTO>();
            CreateMap<AddSetDTO, Set>();
            CreateMap<UpdateSetDTO, Set>();
        }
    }
}