namespace dotnet.Services.SetService
{
    public class SetService : ISetService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public SetService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<GetExerciseDTO>> AddSet(int exerciseId, AddSetDTO newSet)
        {
            var serviceResponse = new ServiceResponse<GetExerciseDTO>();
            
            var exercise = await _context.Exercises
                .FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);
            if (exercise == null) {
                serviceResponse.Success = false;
                serviceResponse.Message = $"No exercise with exerciseId:'{exerciseId}' exists";
            }

            var set = _mapper.Map<Set>(newSet);
            set.ExerciseId = exerciseId;
            try 
            {
                _context.Sets.Add(set);
                await _context.SaveChangesAsync();

                exercise = await _context.Exercises
                    .Include(e => e.Sets)
                    .FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);

                serviceResponse.Data = _mapper.Map<GetExerciseDTO>(exercise);
            }
            catch (Exception ex) {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetExerciseDTO>> DeleteSet(int exerciseId, int setId)
        {
            var serviceResponse = new ServiceResponse<GetExerciseDTO>();
            // TODO: Also delete associated sets
            try
            {
                // First get exercise
                var exercise = await _context.Exercises
                    .FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);
                if (exercise is null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No exersise exists with exerciseId:'{exerciseId}'";
                }

                // Then verify exerciseId matches workoutId
                var set = await _context.Sets
                    .FirstOrDefaultAsync(s => s.SetId == setId && s.ExerciseId == exerciseId);

                if (set != null)
                {
                    _context.Sets.Remove(set);
                    await _context.SaveChangesAsync();
                    exercise = await _context.Exercises
                        .Include(e => e.Sets)
                        .FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No set matching exerciseId:'{exerciseId}' and setId:'{setId}'";
                }
                
                serviceResponse.Data = _mapper.Map<GetExerciseDTO>(exercise);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetSetDTO>> GetSetById(int setId)
        {
            var serviceResponse = new ServiceResponse<GetSetDTO>();

            try 
            {
                var set = await _context.Sets
                    .FirstOrDefaultAsync(s => s.SetId == setId);

                if (set != null)
                {
                    serviceResponse.Data = _mapper.Map<GetSetDTO>(set);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No set exists with setId:'{setId}'";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetSetDTO>>> GetSetsByExerciseId(int exerciseId)
        {
            var serviceResponse = new ServiceResponse<List<GetSetDTO>>();

            try
            {
                var sets = await _context.Sets
                    .Where(s => s.ExerciseId == exerciseId)
                    .ToListAsync();

                serviceResponse.Data = sets.Select(s => _mapper.Map<GetSetDTO>(s)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetSetDTO>> UpdateSet(int exerciseId, int setId, UpdateSetDTO updatedSet)
        {
            var serviceResponse = new ServiceResponse<GetSetDTO>();
            
            var set = await _context.Sets
                .FirstOrDefaultAsync(s => s.ExerciseId == exerciseId && s.SetId == setId);
            if (set == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"No set matching exerciseId:'{exerciseId}' and setId:'{setId}'";
                return serviceResponse;
            }

            try 
            {
                set.Reps = updatedSet.Reps;
                set.Weight = updatedSet.Weight;

                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetSetDTO>(set);
            }
            catch (Exception ex) {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

    }
}