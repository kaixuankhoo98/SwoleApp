import { IconButton, Stack, Typography } from "@mui/material"
import { FC, useState } from "react"
import { Group } from "./hooks/types"
import { Delete, Edit } from "@mui/icons-material"
import { useDeleteGroup } from "./hooks/groupHooks"
import Modal from "../../shared/components/Modal"
import { GroupModal } from "./GroupModal"
import colors from "../../shared/theme/colors"

type GroupRowProps = {
  group: Group
}

export const GroupRow: FC<GroupRowProps> = ({ group }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: deleteGroup, isPending: isDeletingGroup } = useDeleteGroup();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    deleteGroup(group.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      }
    });
  }

  return (
    <Stack
      key={group.id}
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
      <Typography>{group.name}</Typography>
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
          title="Delete Group"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          isConfirmLoading={isDeletingGroup}
        >
          <Typography>Are you sure you want to delete this group?</Typography>
        </Modal>
      )}
      {isEditModalOpen && (
        <GroupModal
          edit={group}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </Stack>
  )
}
