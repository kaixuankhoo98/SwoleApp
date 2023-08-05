namespace dotnet.DTOs.WorkoutDTO
{
    public class GetWorkoutDTO
    {
        public int UserId { get; set; }
        public DateTime DateTime { get; set; }
        public int WorkoutId { get; set; }
        public List<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}