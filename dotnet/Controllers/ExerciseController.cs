
using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;

        }

        [HttpGet("GetExerciseById")]
        public async Task<ActionResult<ServiceResponse<GetWorkoutDTO>>> GetExercise(int workoutId, int exercideId)
        {
            var response = await _exerciseService.GetExerciseById(workoutId, exercideId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpGet("GetExercisesByWorkoutId")]
        public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> GetExercises(int workoutId)
        {
            var response = await _exerciseService.GetExercisesByWorkout(workoutId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPost("AddExercise")]
        public async Task<ActionResult<ServiceResponse<GetWorkoutDTO>>> AddExercise(int userId, int workoutId, string name, BodyPartClass bodyPartClass)
        {
            var response = await _exerciseService.AddExercise(userId, workoutId, name, bodyPartClass);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("DeleteExercise")]
        public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> DeleteExercise(int userId, int workoutId, int exercideId)
        {
            var response = await _exerciseService.DeleteExercise(userId, workoutId, exercideId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        // [HttpGet("GetAll")]
        // public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> Get()
        // {
        //     return Ok(await _workoutService.GetAllWorkouts());
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<ServiceResponse<GetWorkoutDTO>>> GetWorkout(int id)
        // {
        //     return Ok(await _workoutService.GetWorkoutById(id));
        // }

        // [HttpPost]
        // public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> AddWorkout(AddWorkoutDTO newWorkout)
        // {
        //     return Ok(await _workoutService.AddWorkout(newWorkout));
        // }

        // [HttpPut]
        // public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> UpdateWorkout(UpdateWorkoutDTO updatedWorkout)
        // {
        //     var response = await _workoutService.UpdateWorkout(updatedWorkout);

        //     if (response.Data is null) {
        //         return NotFound(response);
        //     }
        //     return Ok(response);
        // }

        // [HttpDelete]
        // public async Task<ActionResult<ServiceResponse<List<GetWorkoutDTO>>>> DeleteWorkout(int id)
        // {
        //     var response = await _workoutService.DeleteWorkout(id);
        //     if (response.Data is null) {
        //         return NotFound(response);
        //     }
        //     return Ok(response);
        // }
    }
}