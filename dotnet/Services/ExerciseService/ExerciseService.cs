namespace dotnet.Services.ExerciseService
{
    public class ExerciseService : IExerciseService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public ExerciseService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<GetWorkoutDTO>> AddExercise(int userId, int workoutId, string name, BodyPartClass bodyPartClass)
        {
            var serviceResponse = new ServiceResponse<GetWorkoutDTO>();
            
            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.UserId == userId && w.WorkoutId == workoutId);

            if (workout == null) {
                serviceResponse.Success = false;
                serviceResponse.Message = $"No workout matching userId:'{userId}' and workoutId:'{workoutId}'";
            }

            var exercise = new Exercise() {WorkoutId = workoutId, Name = name, Class = bodyPartClass};

            try 
            {
                _context.Exercises.Add(exercise);
                await _context.SaveChangesAsync();
                serviceResponse.Data = _mapper.Map<GetWorkoutDTO>(workout);
            }
            catch (Exception ex) {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }


        public async Task<ServiceResponse<GetWorkoutDTO>> DeleteExercise(int userId, int workoutId, int exerciseId)
        {
            var serviceResponse = new ServiceResponse<GetWorkoutDTO>();
            // TODO: Also delete associated sets
            try
            {
                // First verify matching userId and workoutId
                var workout = await _context.Workouts
                    .FirstOrDefaultAsync(w => w.UserId == userId && w.WorkoutId == workoutId);
                if (workout is null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No workout matching userId:'{userId}' and workoutId:'{workoutId}'";
                }

                // Then verify exerciseId matches workoutId
                var exercise = await _context.Exercises
                    .FirstOrDefaultAsync(e => e.WorkoutId == workoutId && e.ExerciseId == exerciseId);

                if (exercise != null)
                {
                    _context.Exercises.Remove(exercise);
                    await _context.SaveChangesAsync();
                    workout = await _context.Workouts
                        .FirstOrDefaultAsync(w => w.UserId == userId && w.WorkoutId == workoutId);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No workout matching workoutId:'{workoutId}' and exerciseId:'{exerciseId}'";
                }
                
                serviceResponse.Data = _mapper.Map<GetWorkoutDTO>(workout);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetExerciseDTO>> GetExerciseById(int workoutId, int exerciseId)
        {
            var serviceResponse = new ServiceResponse<GetExerciseDTO>();

            try 
            {
                var exercise = await _context.Exercises
                    .Include(e => e.Sets)
                    .FirstOrDefaultAsync(e => e.WorkoutId == workoutId && e.ExerciseId == exerciseId);

                if (exercise != null)
                {
                    serviceResponse.Data = _mapper.Map<GetExerciseDTO>(exercise);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No workout matching workoutId:'{workoutId}' and exercideId:'{exerciseId}'";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetExerciseDTO>>> GetExercisesByWorkout(int workoutId)
        {
            var serviceResponse = new ServiceResponse<List<GetExerciseDTO>>();

            try
            {
                var exercises = await _context.Exercises
                    .Where(e => e.WorkoutId == workoutId)
                    .Include(e => e.Sets)
                    .ToListAsync();

                serviceResponse.Data = exercises.Select(e => _mapper.Map<GetExerciseDTO>(e)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

    }
}