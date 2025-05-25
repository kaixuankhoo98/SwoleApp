import { FC, useState } from "react";
import { useDeleteWorkoutPermanent, useGetArchivedWorkouts, useRestoreWorkout } from "./hooks/workoutHooks";
import { Box, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { Delete, Restore } from "@mui/icons-material";
import Modal from "../../shared/components/Modal";

export const ArchivedWorkouts: FC = () => {
  const { data: archivedWorkouts } = useGetArchivedWorkouts();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { mutate: deleteWorkoutPermanent } = useDeleteWorkoutPermanent();
  const { mutate: restoreWorkout } = useRestoreWorkout();

  const handleDeleteWorkoutPermanent = (workoutId: number) => {
    deleteWorkoutPermanent(workoutId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
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
                <IconButton onClick={() => {setDeleteId(workout.id)}}>
                  <Delete />
                </IconButton>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
      {deleteId !== null && (
        <Modal title="Delete Workout" onClose={() => setDeleteId(null)} onConfirm={() => handleDeleteWorkoutPermanent(deleteId)}>
          <Typography>Are you sure you want to delete this workout?</Typography>
        </Modal>
      )}
    </Box>
  );
};

