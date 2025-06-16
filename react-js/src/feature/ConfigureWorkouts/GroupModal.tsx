import { FC } from "react"
import Modal from "../../shared/components/Modal"
import { group, Group } from "./hooks/types";
import { Controller, useForm } from "react-hook-form";
import { Alert, Stack, TextField } from "@mui/material";
import { useCreateGroup, useUpdateGroup } from "./hooks/groupHooks";
import { zodResolver } from "@hookform/resolvers/zod";

type GroupModalProps = {
  onClose: () => void;
  edit?: Group;
}

export const GroupModal: FC<GroupModalProps> = ({ onClose, edit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<Group>({
    defaultValues: {
      name: edit?.name ?? '',
    },
    resolver: zodResolver(group)
  });

  const { mutate: createGroup, isPending: isCreatingGroup, isError: isCreateError } = useCreateGroup();
  const { mutate: updateGroup, isPending: isUpdatingGroup, isError: isUpdateError } = useUpdateGroup();

  const onConfirm = (data: Group) => {
    if (edit) {
      updateGroup({ groupId: edit.id!, name: data.name }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else {
      createGroup(data.name, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  }

  return (
    <Modal 
      title={edit ? 'Edit Group' : 'Add Group'}
      confirmText={edit ? 'Save Changes' : 'Add Group'}
      onClose={onClose} 
      onConfirm={handleSubmit(onConfirm)}
      isConfirmLoading={isCreatingGroup || isUpdatingGroup}
    >
      <Stack spacing={1}>
        {isCreateError && <Alert severity="error">Error creating group</Alert>}
        {isUpdateError && <Alert severity="error">Error updating group</Alert>}
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} />
          )}
        />
      </Stack>
    </Modal>
  )
}
