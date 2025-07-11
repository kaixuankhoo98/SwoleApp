import { IconButton, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { AddExerciseButton } from "./AddExerciseButton";
import { ExerciseResponse, GetWorkout } from "../hooks/types";
import { ExerciseModal } from "./ExerciseModal";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteExercise } from "../hooks/exerciseHooks";
import Modal from "../../../shared/components/Modal";
import colors from "../../../shared/theme/colors";
import { SetsTable } from "./SetsTable";

type ExerciseEditorProps = {
  workout: GetWorkout | undefined;
}

const ExerciseRow: FC<{ exercise: ExerciseResponse }> = ({ exercise }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: deleteExercise, isPending: isDeletingExercise } = useDeleteExercise();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    deleteExercise(exercise.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      }
    });
  }

  return (
    <Stack 
      direction="column" 
      gap="0.5rem" 
      key={exercise.id}
      sx={{ 
        backgroundColor: colors.casalGrey,
        borderRadius: '0.5rem',
        p: '0.5rem 1rem',
      }}
    >
      <Stack 
        direction="row"
        justifyContent="space-between"
      >
        <Typography sx={{ fontWeight: 'bold' }}>{exercise.exerciseType}</Typography>
        <Stack direction="row">
          <IconButton onClick={() => setIsEditModalOpen(true)} size="small" sx={{ p: '0.125rem' }}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => setIsDeleteModalOpen(true)} size="small" sx={{ p: '0.125rem' }}>
            <Delete />
          </IconButton>
        </Stack>

        {isEditModalOpen && <ExerciseModal edit={exercise} onClose={() => setIsEditModalOpen(false)} />}
        {isDeleteModalOpen &&
          <Modal
          title="Delete Exercise"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          isConfirmLoading={isDeletingExercise}
          >
            <Typography>Are you sure you want to delete this exercise?</Typography>
          </Modal>
        }
      </Stack>
      <SetsTable exercise={exercise} />
    </Stack>
  )
}

export const ExerciseEditor: FC<ExerciseEditorProps> = ({ workout }) => {
  return (
    <Stack 
      direction="column" 
      gap="1rem"
      sx={{
        borderRadius: '0.5rem',
        backgroundColor: colors.blackDark,
        p: '0.5rem',
      }}
    >
      <Stack direction="column" gap="1rem">
        {workout?.exercises.map((exercise) => (
          <ExerciseRow exercise={exercise} key={exercise.id} />
        ))}
        {workout?.exercises.length === 0 && (
          <Typography sx={{ textAlign: 'center', p: '2rem' }}>
            No exercises added. Add an exercise to get started!
          </Typography>
        )}
      </Stack>
      <AddExerciseButton />
    </Stack>
  );
};

