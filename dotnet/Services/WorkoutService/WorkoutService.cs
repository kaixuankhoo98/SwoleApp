
using dotnet.Models;

namespace dotnet.Services.WorkoutService
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;


        public WorkoutService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<GetWorkoutDTO>> AddWorkout(int userId)
        {
            var serviceResponse = new ServiceResponse<GetWorkoutDTO>();

            var newWorkout = new Workout() {UserId = userId, DateTime = DateTime.Now};

            try 
            {
                _context.Workouts.Add(newWorkout);
                await _context.SaveChangesAsync();
                serviceResponse.Data = _mapper.Map<GetWorkoutDTO>(newWorkout);
            }
            catch (Exception ex) {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetWorkoutDTO>> DeleteWorkout(int userId, int workoutId)
        {
            var serviceResponse = new ServiceResponse<GetWorkoutDTO>();
            // TODO: Also delete associated exercises and sets
            try
            {
                var workout = await _context.Workouts
                    .Include(w => w.Exercises) // Include related exercises
                    .FirstOrDefaultAsync(w => w.UserId == userId && w.WorkoutId == workoutId);

                if (workout != null)
                {
                    _context.Workouts.Remove(workout);
                    await _context.SaveChangesAsync();

                    serviceResponse.Data = _mapper.Map<GetWorkoutDTO>(workout);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No workout matching userId:'{userId}' and workoutId:'{workoutId}'";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetWorkoutDTO>> GetWorkoutById(int userId, int workoutId)
        {
            var serviceResponse = new ServiceResponse<GetWorkoutDTO>();

            try 
            {
                var workout = await _context.Workouts
                    .Include(w => w.Exercises)
                    .FirstOrDefaultAsync(w => w.UserId == userId && w.WorkoutId == workoutId);
                
                if (workout != null)
                {
                    serviceResponse.Data = _mapper.Map<GetWorkoutDTO>(workout);
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = $"No workout matching userId:'{userId}' and workoutId:'{workoutId}'";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetWorkoutDTO>>> GetWorkoutsByUserId(int userId)
        {
            var serviceResponse = new ServiceResponse<List<GetWorkoutDTO>>();

            try
            {
                var workouts = await _context.Workouts
                    .Where(w => w.UserId == userId)
                    .ToListAsync();

                serviceResponse.Data = workouts.Select(w => _mapper.Map<GetWorkoutDTO>(w)).ToList();
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