
using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;

        }

        [HttpGet("GetWorkoutById")]
        public async Task<ActionResult<ServiceResponse<GetWorkoutDTO>>> GetWorkout(int userId, int workoutId)
        {
            var response = await _workoutService.GetWorkoutById(userId, workoutId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpGet("GetWorkoutsByUserId")]
        public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> GetWorkouts(int userId)
        {
            var response = await _workoutService.GetWorkoutsByUserId(userId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<ServiceResponse<GetWorkoutDTO>>> GetWorkout(int id)
        // {
        //     return Ok(await _workoutService.GetWorkoutById(id));
        // }

        [HttpPost("AddWorkout")]
        public async Task<ActionResult<ServiceResponse<GetWorkoutDTO>>> AddWorkout(int userId)
        {
            var response = await _workoutService.AddWorkout(userId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        // [HttpPut]
        // public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> UpdateWorkout(UpdateWorkoutDTO updatedWorkout)
        // {
        //     var response = await _workoutService.UpdateWorkout(updatedWorkout);

        //     if (response.Data is null) {
        //         return NotFound(response);
        //     }
        //     return Ok(response);
        // }

        [HttpDelete("DeleteWorkout")]
        public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> DeleteWorkout(int userId, int workoutId)
        {
            var response = await _workoutService.DeleteWorkout(userId, workoutId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}