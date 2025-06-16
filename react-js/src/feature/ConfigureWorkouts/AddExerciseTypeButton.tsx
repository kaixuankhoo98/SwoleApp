import { FC, useState } from "react"
import Button from "../../shared/components/Button"
import { Add } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import { ExerciseTypeModal } from "./ExerciseTypeModal"

const AddButton: FC<{ groupId?: number, onClick: () => void }> = ({ groupId, onClick }) => {
  if (!groupId) {
    return (
      <Button variant="contained" sx={{ gap: '0.5rem' }} onClick={onClick}>
        <Add />
        Add Exercise Type
      </Button>
    )
  }
  return (
    <IconButton onClick={onClick} sx={{ p: 0, m: 0 }}>
      <Add />
    </IconButton>
  )
}

export const AddExerciseTypeButton: FC<{ groupId?: number }> = ({ groupId }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box
      sx={{
        ...(!groupId && {
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '1rem',
        })
      }}>
      <AddButton groupId={groupId} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <ExerciseTypeModal onClose={() => setIsOpen(false)} groupId={groupId} />
      )}
    </Box>
  )
}
