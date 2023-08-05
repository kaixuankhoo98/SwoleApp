
namespace dotnet.Models
{
    public class Workout
    {
        public int WorkoutId { get; set; }
        public int UserId { get; set; }
        public DateTime DateTime { get; set; }
        public List<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}