import { FC, useState } from 'react';
import { useWorkoutStore } from '../workoutStore';
import Button from '../../../shared/components/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useEndWorkout, useGetWorkout } from '../hooks/workoutHooks';
import { WorkoutTimer } from './WorkoutTimer';
import { addSeconds } from 'date-fns';
import { differenceInSeconds } from 'date-fns';
import { ExerciseEditor } from './ExerciseEditor';
import { GetWorkout } from '../hooks/types';
import Modal from '../../../shared/components/Modal';
import { useNavigate } from 'react-router-dom';

const WorkoutEditorHeader: FC<{ workout: GetWorkout | undefined }> = ({ workout }) => {
  const startTime = workout?.startTime ? new Date(workout.startTime) : new Date(0);
  const difference = differenceInSeconds(new Date(), startTime);
  const offset = addSeconds(new Date(), difference);

  if (workout === undefined || workout.startTime === undefined) {
    return null;
  }
  
  return (
    <Stack direction="column" gap="1rem" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        {startTime.toLocaleDateString()}
      </Typography>
      <WorkoutTimer offset={offset} />
    </Stack>
  );
};

export const WorkoutEditor: FC = () => {
  const { workout, setWorkout } = useWorkoutStore();
  const { data: workoutData } = useGetWorkout(workout?.workoutId ?? null);
  const [endWorkoutModalOpen, setEndWorkoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: endWorkout } = useEndWorkout();

  const handleEndWorkout = () => {
    endWorkout(workout?.workoutId ?? 0, {
      onSuccess: () => {
        setEndWorkoutModalOpen(false);
        setWorkout(null);
        navigate('/home');
      }
    });
  }

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" gap="1rem" justifyContent="space-between" alignItems="center">
        <Typography>Active Workout: {workout?.workoutId}</Typography>
        <Button onClick={() => setWorkout(null)}>Exit Workout</Button>
      </Stack>
      <WorkoutEditorHeader workout={workoutData} />
      <ExerciseEditor />
      <Button onClick={() => setEndWorkoutModalOpen(true)}>
        End Workout
      </Button>
      {endWorkoutModalOpen && (
        <Modal title="End Workout" onClose={() => setEndWorkoutModalOpen(false)} onConfirm={() => handleEndWorkout()}>
          <Typography>Are you sure you want to end this workout?</Typography>
        </Modal>
      )}
    </Box>
  );
};

