import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { AddExerciseButton } from "./AddExerciseButton";
import { ExerciseResponse, GetWorkout } from "../hooks/types";
import { ExerciseModal } from "./ExerciseModal";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteExercise } from "../hooks/exerciseHooks";
import Modal from "../../../shared/components/Modal";

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
    <Stack direction="row" gap="1rem" key={exercise.id}>
      <Typography>{exercise.exerciseType}</Typography>
      <IconButton onClick={() => setIsEditModalOpen(true)}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => setIsDeleteModalOpen(true)}>
        <Delete />
      </IconButton>
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
  )
}

export const ExerciseEditor: FC<ExerciseEditorProps> = ({ workout }) => {
  return (
    <>
      <AddExerciseButton />
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          <Typography>Exercise</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" gap="1rem">
            {workout?.exercises.map((exercise) => (
              <ExerciseRow exercise={exercise} key={exercise.id} />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

