import { FC, useState } from "react";
import { useCreateWorkout, useDeleteWorkout } from "./hooks/workoutHooks";
import { useWorkoutStore } from "./workoutStore";
import Button from "../../shared/components/Button";
import { useOpenWorkouts } from "../PreviousWorkouts/previousWorkoutHooks";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, Typography } from "@mui/material";
import { format } from "date-fns";
import { Delete } from "@mui/icons-material";
import { ArchivedWorkouts } from "./ArchivedWorkouts";

export const WorkoutSelector: FC = () => {
  const { setWorkout } = useWorkoutStore();
  const { mutate: createWorkout } = useCreateWorkout();
  const { mutate: deleteWorkout } = useDeleteWorkout();

  const handleCreateWorkout = () => {
    createWorkout(undefined, {
      onSuccess: (data) => {
        setWorkout(data);
      },
    });
  };

  const handleDeleteWorkout = () => {
    if (!deleteId) return;
    
    deleteWorkout(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  const { data: openWorkouts } = useOpenWorkouts();
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button filled onClick={handleCreateWorkout} sx={{ width: '20rem', mt: '3rem' }}>
        Start New Workout
      </Button>

      {openWorkouts && openWorkouts.length > 0 && (
        <Box sx={{ alignSelf: "center", alignItems: "center" }}>
          <Typography sx={{ textAlign: "center" }}>Open Workouts</Typography>
          <List sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {openWorkouts.map((workout) => (
              <ListItem key={workout.id}>
                <Button onClick={() => setWorkout({workoutId: workout.id})}>
                  {`${format(workout.startTime, "MM/dd/yyyy")} - ${workout.id}`}
                </Button>
                <IconButton onClick={() => setDeleteId(workout.id)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <ArchivedWorkouts />

      {deleteId && (
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle>Delete Workout</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this workout?
          </DialogContent>
          <DialogActions>
            <Button filled onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button onClick={handleDeleteWorkout}>Delete</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
