namespace dotnet.DTOs.ExerciseDTO
{
    public class AddExerciseDTO
    {
        public int ExerciseId { get; set; }
        public int WorkoutId { get; set; }
        public string Name { get; set; } = "";
        public BodyPartClass Class { get; set; } = BodyPartClass.Chest;
    }
}