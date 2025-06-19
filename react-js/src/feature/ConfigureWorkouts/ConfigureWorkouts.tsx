import { FC } from "react";
import Main from "../Main/Main";
import { Groups } from "./Groups";
import { Stack, Typography } from "@mui/material";
import { ExerciseTypes } from "./ExerciseTypes";

const ConfigureWorkouts: FC = () => {
  return (
    <Main>
      <Stack gap={2}>
        <Typography variant="h6" sx={{ mb: '1rem' }}>Configure Workouts</Typography>
        <Groups />
        <ExerciseTypes />
      </Stack>
    </Main>
  );
};

export default ConfigureWorkouts;
