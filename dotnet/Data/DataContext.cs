
namespace dotnet.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the Exercise entity
        modelBuilder.Entity<Exercise>()
            .HasKey(e => e.ExerciseId); // Assuming you have an Id property

        // Configure the Workout entity
        modelBuilder.Entity<Workout>()
            .HasKey(w => w.WorkoutId); // Assuming you have an Id property

        modelBuilder.Entity<Set>()
        .HasKey(s => s.SetId); // Assuming you have an Id property for Set

        // Configure the relationship between Workout and Exercise
        modelBuilder.Entity<Workout>()
            .HasMany(w => w.Exercises)
            .WithOne()
            .HasForeignKey(e => e.WorkoutId);   
        
        modelBuilder.Entity<Set>()
            .HasOne<Exercise>()
            .WithMany(e => e.Sets) // Specify the navigation property for Sets
            .HasForeignKey(s => s.ExerciseId);
    }
        public DbSet<Workout> Workouts => Set<Workout>();
        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<Set> Sets => Set<Set>();
    }
}