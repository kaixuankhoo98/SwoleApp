import { FC, useMemo, useState } from "react";
import Modal from "../../../shared/components/Modal";
import { useGetExerciseTypes } from "../../ConfigureWorkouts/hooks/exerciseTypeHooks";
import { useExerciseTypesByGroup } from "../../ConfigureWorkouts/hooks/useExerciseTypesByGroup";
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
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
    <Button component="button" onClick={onClick} sx={{ 
      border: '1px solid',
      borderColor: isSelected ? colors.casalGrey : colors.casalGrey,
      backgroundColor: isSelected ? colors.casalGrey : colors.casalGrey,
      color: isSelected ? colors.black : colors.white,
      width: '100%',
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
    }}>
      <Typography>{exerciseType.name}</Typography>
    </Button>
  )
}

export const ExerciseModal: FC<ExerciseModalProps> = ({
  edit,
  onClose,
}) => {
  const { data: exerciseTypes } = useGetExerciseTypes();
  const { exerciseTypesByGroup, getGroupName } = useExerciseTypesByGroup();
  const [searchTerm, setSearchTerm] = useState("");
  const [ selectedFilter, setSelectedFilter ] = useState<FilterOptions>(FilterOptions.GROUP);

  const filteredExerciseTypes = useMemo(() => {
    if (selectedFilter === FilterOptions.ALL) {
      const filtered = exerciseTypes?.filter((exerciseType) => 
        exerciseType.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? [];
      
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Group filter - return all exercise types grouped by their group
      const allExerciseTypes = exerciseTypes ?? [];
      const filtered = allExerciseTypes.filter((exerciseType) => 
        exerciseType.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [exerciseTypes, searchTerm, selectedFilter, exerciseTypesByGroup]);

  const { control, handleSubmit } = useForm<ExerciseResponse>({
    defaultValues: {
      exerciseTypeId: edit?.exerciseTypeId ?? 0,
    },
    resolver: zodResolver(
      z.object({
        exerciseTypeId: z.number(),
      })
    ),
  });

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
    <Modal title={edit ? 'Edit Exercise' : 'Add Exercise'} onClose={onClose} onConfirm={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="1rem">
        <SearchFilter onSearchChange={setSearchTerm} label="Search Exercise" />
        <RadioGroup
          value={selectedFilter} 
          onChange={(e) => setSelectedFilter(e.target.value as FilterOptions)}
        >
          <FormLabel>Filter by</FormLabel>
          <FormControlLabel value={FilterOptions.ALL} control={<Radio />} label="All" />
          <FormControlLabel value={FilterOptions.GROUP} control={<Radio />} label="Group" />
        </RadioGroup>
        

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
                          isSelected={field.value === exerciseType.id} 
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