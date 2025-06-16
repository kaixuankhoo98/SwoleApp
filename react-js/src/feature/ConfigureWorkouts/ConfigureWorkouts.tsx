import { FC } from "react";
import Main from "../Main/Main";
import { Groups } from "./Groups";
import { Stack, Typography } from "@mui/material";
import { ExerciseTypes } from "./ExerciseTypes";
import { useGetGroups } from "./hooks/groupHooks";

const ConfigureWorkouts: FC = () => {
  const getGroups = useGetGroups();

  return (
    <Main>
      <Stack gap={2}>
        <Typography variant="h6" sx={{ mb: '1rem' }}>Configure Workouts</Typography>
        <Groups getGroups={getGroups} />
        <ExerciseTypes getGroups={getGroups} />
      </Stack>
    </Main>
  );
};

export default ConfigureWorkouts;
