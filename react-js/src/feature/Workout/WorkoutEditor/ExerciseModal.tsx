import { FC, useMemo, useState } from "react";
import Modal from "../../../shared/components/Modal";
import { useExerciseTypesByGroup } from "../../ConfigureWorkouts/hooks/useExerciseTypesByGroup";
import { alpha, Autocomplete, Button, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ExerciseResponse } from "../hooks/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateExercise, useUpdateExercise } from "../hooks/exerciseHooks";
import { ExerciseType } from "../../ConfigureWorkouts/hooks/types";
import colors from "../../../shared/theme/colors";
import { SearchFilter } from "../../../shared/components/SearchFilter";

type ExerciseModalProps = {
  edit?: ExerciseResponse;
  onClose: () => void;
}

enum FilterOptions {
  ALL = 'alphabetical',
  GROUP = 'group',
}

const ExerciseTypeRow: FC<{ exerciseType: ExerciseType, isSelected: boolean, onClick: () => void }> = ({ exerciseType, isSelected, onClick }) => {
  return (
    <Button onClick={onClick} sx={{ 
      border: '1px solid',
      borderColor: isSelected ? colors.blue100 : colors.black,
      backgroundColor: isSelected ? colors.grey100 : colors.casalGrey,
      color: colors.white,
      width: '100%',
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      "&:hover": {
        backgroundColor: isSelected
          ? alpha(colors.grey100, 0.6)
          : alpha(colors.casalGrey, 0.6),
        },
    }}>
      <Typography>{exerciseType.name}</Typography>
    </Button>
  )
}

export const ExerciseModal: FC<ExerciseModalProps> = ({
  edit,
  onClose,
}) => {
  const { exerciseTypes, exerciseTypesByGroup, getGroupName, groups } = useExerciseTypesByGroup();
  const [searchTerm, setSearchTerm] = useState("");
  const [ selectedFilter, setSelectedFilter ] = useState<FilterOptions>(FilterOptions.GROUP);
  const [ selectedGroup, setSelectedGroup ] = useState<number | null>(null);

  const filteredExerciseTypes = useMemo(() => {
    if (selectedFilter === FilterOptions.ALL) {
      const filtered = exerciseTypes?.filter((exerciseType) => 
        exerciseType.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? [];
      
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      const allExerciseTypes = exerciseTypes ?? [];
      const filtered = allExerciseTypes.filter((exerciseType) => 
        exerciseType.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [exerciseTypes, searchTerm, selectedFilter, exerciseTypesByGroup]);

  const { control, handleSubmit, watch } = useForm<ExerciseResponse>({
    defaultValues: {
      exerciseTypeId: edit?.exerciseTypeId ?? 0,
    },
    resolver: zodResolver(
      z.object({
        exerciseTypeId: z.number(),
      })
    ),
  });

  const selectedExerciseTypeId = watch('exerciseTypeId');

  const { mutate: createExercise } = useCreateExercise();
  const { mutate: updateExercise } = useUpdateExercise();

  const onSubmit = (data: ExerciseResponse) => {
    if (edit) {
      updateExercise({ exerciseId: edit.id, exerciseTypeId: data.exerciseTypeId }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else {
      createExercise({ exerciseTypeId: data.exerciseTypeId }, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  }

  return (
    <Modal 
      title={edit ? 'Edit Exercise' : 'Add Exercise'} 
      onClose={onClose} 
      onConfirm={handleSubmit(onSubmit)} 
      maxHeight 
      maxWidth
    >
      <Stack direction="column" gap="1rem">
        <SearchFilter onSearchChange={setSearchTerm} label="Search Exercise" />
        <RadioGroup
          sx={{ flexDirection: 'row', }}
          value={selectedFilter} 
          onChange={(e) => setSelectedFilter(e.target.value as FilterOptions)}
        >
          <FormControlLabel value={FilterOptions.ALL} control={<Radio />} label="All" />
          <FormControlLabel value={FilterOptions.GROUP} control={<Radio />} label="Group" />
        </RadioGroup>
        {selectedFilter === FilterOptions.GROUP && (
          <Autocomplete
            options={groups ? groups.map((group) => ({label: group.name, value: group.id})) : []}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Group" />}
            onChange={(_, value) => setSelectedGroup(value?.value ?? null)}
          />
        )}

        <Controller
          control={control}
          name="exerciseTypeId"
          render={({ field }) => (
            <Stack direction="column" gap="0.25rem">
              {selectedFilter === FilterOptions.ALL ? (
                // Show all exercise types in a flat list
                filteredExerciseTypes?.map((exerciseType) => (
                  <ExerciseTypeRow 
                    exerciseType={exerciseType} 
                    key={exerciseType.id} 
                    isSelected={field.value === exerciseType.id} 
                    onClick={() => field.onChange(exerciseType.id)} 
                  />
                ))
              ) : (
                // Show exercise types grouped by their group
                Array.from(exerciseTypesByGroup.entries()).map(([groupId, groupExerciseTypes]) => {
                  // If a group is selected, only show exercise types in that group
                  if (selectedGroup && groupId !== selectedGroup) return null;
                  const filteredGroupTypes = groupExerciseTypes.filter((exerciseType) => 
                    exerciseType.name.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  if (filteredGroupTypes.length === 0) return null;
                  return (
                    <Stack key={groupId} direction="column" gap="0.25rem" sx={{ mb: '0.75rem' }}>
                      <Typography sx={{ fontWeight: 'bold', color: colors.white }}>
                        {getGroupName(groupId)}
                      </Typography>
                      {filteredGroupTypes.map((exerciseType) => (
                        <ExerciseTypeRow 
                          exerciseType={exerciseType} 
                          key={exerciseType.id} 
                          isSelected={selectedExerciseTypeId === exerciseType.id} 
                          onClick={() => field.onChange(exerciseType.id)} 
                        />
                      ))}
                    </Stack>
                  );
                })
              )}
            </Stack>
          )}
        />
      </Stack>
    </Modal>
  )
}