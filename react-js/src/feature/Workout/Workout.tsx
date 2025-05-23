import { Stack } from "@mui/material";
import Main from "../Main/Main";
import { useWorkoutStore } from "./workoutStore";
import { WorkoutSelector } from "./WorkoutSelector";
import Button from "../../shared/components/Button";

const Workout = () => {
  const { workout, setWorkout } = useWorkoutStore();

  return (
    <Main>
      <Stack direction='column' gap='1rem' alignItems='center'>
        {!workout ? (
          <WorkoutSelector />
        ) : (
          <div>
            Active Workout: {workout.workoutId}
            <Button onClick={() => setWorkout(null)}>Exit Workout</Button>
          </div>
        )}
      </Stack>
    </Main>
  );
};

export default Workout;