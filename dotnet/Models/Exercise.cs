using System.ComponentModel.DataAnnotations;

namespace dotnet.Models
{
    public class Exercise
    {
        public int ExerciseId { get; set; }
        public int WorkoutId { get; set; }
        public string Name { get; set; } = "";
        public List<Set> Sets { get; set; } = new List<Set>();
        public BodyPartClass Class { get; set; } = BodyPartClass.Chest;
    }
}