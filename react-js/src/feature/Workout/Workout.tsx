import { Stack } from "@mui/material";
import Main from "../Main/Main";
import { useWorkoutStore } from "./workoutStore";
import { WorkoutSelector } from "./WorkoutSelector";
import { WorkoutEditor } from "./WorkoutEditor/WorkoutEditor";

const Workout = () => {
  const { workout } = useWorkoutStore();

  return (
    <Main>
      <Stack
        direction='column' 
        gap='1rem' 
        alignItems='center' 
      >
        {!workout ? (
          <WorkoutSelector />
        ) : (
          <WorkoutEditor />
        )}
      </Stack>
    </Main>
  );
};

export default Workout;