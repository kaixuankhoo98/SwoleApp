import { IconButton, Stack, Typography } from "@mui/material"
import { ExerciseType } from "./hooks/types"
import { FC, useState } from "react"
import colors from "../../shared/theme/colors"
import { Delete, Edit } from "@mui/icons-material"
import Modal from "../../shared/components/Modal"
import { useDeleteExerciseType } from "./hooks/exerciseTypeHooks"
import { ExerciseTypeModal } from "./ExerciseTypeModal"

type ExerciseTypeRowProps = {
  exerciseType: ExerciseType
}

export const ExerciseTypeRow: FC<ExerciseTypeRowProps> = ({ exerciseType }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: deleteExerciseType, isPending: isDeletingExerciseType } = useDeleteExerciseType();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    deleteExerciseType(exerciseType.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      }
    });
  }
  return (
    <Stack
      direction="row"
      sx={{
        m: '0.25rem',
        py: '0.25rem',
        pl: '1rem',
        borderRadius: '0.25rem',
        alignItems: 'center',
        backgroundColor: colors.casalGrey,
        justifyContent: 'space-between'
      }}
    >
      <Typography>{exerciseType.name}</Typography>
      <Stack direction="row">
        <IconButton size="small" onClick={() => setIsEditModalOpen(true)}>
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={() => setIsDeleteModalOpen(true)}>
          <Delete />
        </IconButton>
      </Stack>
      {isDeleteModalOpen && (
        <Modal
          title="Delete Exercise Type"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          isConfirmLoading={isDeletingExerciseType}
        >
          <Typography>Are you sure you want to delete this exercise type?</Typography>
        </Modal>
      )}
      {isEditModalOpen && (
        <ExerciseTypeModal
          edit={exerciseType}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </Stack>
  )
}