using System.ComponentModel.DataAnnotations;

namespace dotnet.Models
{
    public class Set
    {
        public int SetId { get; set; }
        public int ExerciseId { get; set; }
        public int Reps { get; set; }
        public float Weight { get; set; }
    }
}