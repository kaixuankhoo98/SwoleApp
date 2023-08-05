namespace dotnet.DTOs.ExerciseDTO
{
    public class GetExerciseDTO
    {
        public int ExerciseId { get; set; }
        public int WorkoutId { get; set; }
        public string Name { get; set; } = "";
        public List<Set> Sets { get; set; } = new List<Set>();
        public BodyPartClass Class { get; set; } = BodyPartClass.Chest;
    }
}