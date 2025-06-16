import { FC, useState } from "react"
import { Add } from "@mui/icons-material"
import { Box } from "@mui/material"
import Button from "../../shared/components/Button"
import { GroupModal } from "./GroupModal"

export const AddGroupButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '1rem'
      }}>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        <Add />
        Add Group
      </Button>
      {isOpen && (
        <GroupModal onClose={() => setIsOpen(false)} />
      )}
    </Box>
  )
}
