import { FC } from "react"
import Modal from "../../shared/components/Modal"
import { Autocomplete, Stack, TextField } from "@mui/material"
import { ExerciseType, ExerciseTypeEnum } from "./hooks/types";
import { useGetGroups } from "./hooks/groupHooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddExerciseType, useUpdateExerciseType } from "./hooks/exerciseTypeHooks";
import { z } from "zod";

type ExerciseTypeModalProps = {
  onClose: () => void;
  edit?: ExerciseType;
  groupId?: number;
}

type GroupOption = {
  label: string;
  value: number;
}

export const ExerciseTypeModal: FC<ExerciseTypeModalProps> = ({ onClose, edit, groupId }) => {
  const { data: groups } = useGetGroups();

  const { control, handleSubmit, formState: { errors } } = useForm<ExerciseType>({
    defaultValues: edit ? edit : {
      name: '',
      groupId: groupId ?? undefined,
      type: ExerciseTypeEnum.weight,
    },
    resolver: zodResolver(
      z.object({
        id: edit ? z.number() : z.undefined(),
        name: z.string().min(1, { message: 'Name is required' }),
        groupId: z.number().optional(),
        type: z.nativeEnum(ExerciseTypeEnum),
      })
    )
  });

  const { mutate: addExerciseType } = useAddExerciseType();
  const { mutate: updateExerciseType } = useUpdateExerciseType();

  const options: GroupOption[] = groups?.map((group) => ({
    label: group.name,
    value: group.id ?? -1,
  })) ?? [];

  const onSubmit = (data: ExerciseType) => {
    const { name, groupId, type } = data;
    if (edit) {
      updateExerciseType({ exerciseTypeId: edit.id, name, groupId, type }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else {
      addExerciseType({ name, groupId, type }, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  }

  return (
    <Modal title={edit ? 'Edit Exercise Type' : 'Add Exercise Type'} onClose={onClose} onConfirm={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} />
          )}
        />

        <Controller
          control={control}
          name="groupId"
          render={({ field }) => (
            <Autocomplete<GroupOption>
              options={options}
              value={options.find(opt => opt.value === field.value) ?? null}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => <TextField {...params} label="Group" error={!!errors.groupId} helperText={errors.groupId?.message} />}
              onChange={(_, value) => field.onChange(value?.value)}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Autocomplete<ExerciseTypeEnum>
              options={Object.values(ExerciseTypeEnum)}
              value={field.value}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderInput={(params) => <TextField {...params} label="Type" error={!!errors.type} helperText={errors.type?.message} />}
              onChange={(_, value) => field.onChange(value)}
            />
          )}
        />
      </Stack>
    </Modal>
  )
}
