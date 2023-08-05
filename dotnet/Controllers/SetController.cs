
using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SetController : ControllerBase
    {
        private readonly ISetService _setService;

        public SetController(ISetService setService)
        {
            _setService = setService;
        }

        [HttpGet("GetSetById")]
        public async Task<ActionResult<ServiceResponse<GetSetDTO>>> GetSet(int setId)
        {
            var response = await _setService.GetSetById(setId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpGet("GetSetByExercise")]
        public async Task<ActionResult<ServiceResponse<List<GetSetDTO>>>> GetSetsByExercise(int exerciseId)
        {
            var response = await _setService.GetSetsByExerciseId(exerciseId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPost("AddSet")]
        public async Task<ActionResult<ServiceResponse<GetExerciseDTO>>> AddSet(int exercideId, AddSetDTO newSet)
        {
            var response = await _setService.AddSet(exercideId, newSet);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("DeleteSet")]
        public async Task<ActionResult<ServiceResponse<List<GetExerciseDTO>>>> DeleteSet(int exerciseId, int setId)
        {
            var response = await _setService.DeleteSet(exerciseId, setId);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPut("UpdateSet")]
        public async Task<ActionResult<ServiceResponse<GetExerciseDTO>>> UpdateSet(int exercideId, int setId, UpdateSetDTO updatedSet)
        {
            var response = await _setService.UpdateSet(exercideId, setId, updatedSet);
            if (response.Data is null) {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}