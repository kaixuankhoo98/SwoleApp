import { FC } from "react";
import { useDeleteWorkoutPermanent, useGetArchivedWorkouts, useRestoreWorkout } from "./workoutHooks";
import { Box, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { Delete, Restore } from "@mui/icons-material";

export const ArchivedWorkouts: FC = () => {
  const { data: archivedWorkouts } = useGetArchivedWorkouts();

  const { mutate: deleteWorkoutPermanent } = useDeleteWorkoutPermanent();
  const { mutate: restoreWorkout } = useRestoreWorkout();

  const handleDeleteWorkoutPermanent = (workoutId: number) => {
    deleteWorkoutPermanent(workoutId);
  };

  const handleRestoreWorkout = (workoutId: number) => {
    restoreWorkout(workoutId);
  };

  return (
    <Box>
      <Typography>Archived Workouts</Typography>
      {archivedWorkouts && (
        <List>
          {archivedWorkouts.map((workout) => (
            <ListItem key={workout.id}>
              <Stack direction="row" gap="1rem">
                {format(workout.startTime, "MM/dd/yyyy")}
                <IconButton onClick={() => handleRestoreWorkout(workout.id)}>
                  <Restore />
                </IconButton>
                <IconButton onClick={() => {}}>
                  <Delete />
                </IconButton>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

