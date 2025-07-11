import { FC, useState, useCallback, memo, useEffect, useRef } from "react";
import { z } from "zod";
import { TableCell, Table, TableContainer, TableHead, TableRow, TableBody, styled, Checkbox, TextField, IconButton, alpha, Tooltip, Stack } from "@mui/material";
import { ExerciseResponse, SetResponse, WeightedSetResponse, DurationSetResponse, isWeightedSet, isDurationSet } from "../hooks/types";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import colors from "../../../shared/theme/colors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/Button";
import { useCreateWeightedSet, useCreateDurationSet, useDeleteSet, useUpdateSet, useAddEmptySet, useRemoveEmptySet } from "../hooks/setHooks";
import { useGetExerciseTypes } from "../../ConfigureWorkouts/hooks/exerciseTypeHooks";
import { ExerciseTypeEnum } from "../../ConfigureWorkouts/hooks/types";

type SetsTableProps = {
  exercise: ExerciseResponse;
}

// Utility function to determine if an exercise should use weighted or duration sets
const getSetTypeForExercise = (exerciseTypeId: number, exerciseTypes: any[] | undefined): 'weighted' | 'duration' => {
  if (!exerciseTypes) return 'weighted'; // Default fallback
  
  const exerciseType = exerciseTypes.find(et => et.id === exerciseTypeId);
  if (!exerciseType) return 'weighted'; // Default fallback
  
  return exerciseType.type === ExerciseTypeEnum.duration ? 'duration' : 'weighted';
};

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: colors.blackDark,
  borderRadius: '0.5rem',
  padding: '0.25rem 0.5rem',
});

const StyledTableHead = styled(TableHead)({
  borderBottom: `2px solid ${colors.white}`,
});

const StyledTableCell = styled(TableCell)({
  color: colors.white,
  padding: '0.25rem 0.5rem',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    padding: '0.25rem 0.5rem',
  },
});

const ConfirmCancelIconCell: FC<{
  confirmActionText: string;
  cancelActionText: string;
  confirmAction: () => void;
  cancelAction: () => void;
  cancelDisabled?: boolean;
}> = ({ confirmActionText, cancelActionText, confirmAction, cancelAction, cancelDisabled = false }) => {
  return (
    <>
      <Tooltip title={confirmActionText} arrow>
        <IconButton size="small" sx={{ p: 0.25 }} onClick={confirmAction}>
          <Check />
        </IconButton>
      </Tooltip>
      <Tooltip title={cancelActionText} arrow>
        <span>
          <IconButton size="small" sx={{ p: 0.25 }} onClick={cancelAction} disabled={cancelDisabled}>
            <Close />
          </IconButton>
        </span>
      </Tooltip>
    </>
  )
}

// Weighted Set Row Component
const WeightedSetRow: FC<{
  index: number;
  currentSet: WeightedSetResponse;
  exerciseId: number;
  removeSet: (index: number) => void;
  isAutoAdded?: boolean;
}> = memo(({ index, currentSet, exerciseId, removeSet, isAutoAdded = false }) => {
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(currentSet.id === undefined);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const { control, handleSubmit, setValue, reset } = useForm<WeightedSetResponse>({
    defaultValues: currentSet,
    resolver: zodResolver(z.object({
      id: currentSet.id ? z.number() : z.undefined(),
      reps: z.coerce.number().min(0, "Reps must be 0 or greater"),
      weight: z.coerce.number().min(0, "Weight must be 0 or greater"),
      isCompleted: z.boolean(),
    }))
  });

  const { mutate: createWeightedSet } = useCreateWeightedSet();
  const { mutate: updateSet } = useUpdateSet();
  const { mutate: deleteSet } = useDeleteSet();

  const onCheck = useCallback((data: WeightedSetResponse) => {
    if (currentSet.id === undefined) {
      createWeightedSet({
        exerciseId,
        set: data,
        isCompleted: true,
        setIndex: index,
      }, {
        onError: () => {
          setIsError(true);
        }
      });
    } else {
      updateSet({
        exerciseId,
        set: data,
        isCompleted: true,
      }, {
        onError: () => {
          setIsError(true);
        }
      });
    }
  }, [currentSet.id, exerciseId, createWeightedSet, updateSet, index]);

  const onUnCheck = useCallback((data: WeightedSetResponse) => {
    if (currentSet.id) {
      updateSet({
        exerciseId,
        set: data,
        isCompleted: false,
      }, {
        onError: () => {
          setIsError(true);
        }
      });
    }
  }, [currentSet.id, exerciseId, updateSet]);

  const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      handleSubmit(onCheck)();
    } else {
      handleSubmit(onUnCheck)();
    }
  }, [handleSubmit, onCheck, onUnCheck]);

  const handleSave = useCallback((data: WeightedSetResponse) => {
    if (currentSet.id === undefined) {
      createWeightedSet({
        exerciseId,
        set: data,
        isCompleted: false,
        setIndex: index,
      }, {
        onSuccess: () => {
          setIsEditing(false);
        }
      });
    } else {
      // Only update if weight or reps have changed
      const hasChanges = data.weight !== currentSet.weight || data.reps !== currentSet.reps;
      if (hasChanges) {
        updateSet({
          exerciseId,
          set: data,
          isCompleted: currentSet.isCompleted,
        }, {
          onSuccess: () => {
            setIsEditing(false);
          }
        });
      } else {
        setIsEditing(false);
      }
    }
  }, [currentSet.id, exerciseId, createWeightedSet, updateSet, currentSet.isCompleted, currentSet.weight, currentSet.reps, index]);

  const handleDelete = () => {
    if (currentSet.id) {
      deleteSet({ setId: currentSet.id });
    }
  };

  const handleCancelEdit = () => {
    if (currentSet.id === undefined) {
      removeSet(index);
    } else {
      reset();
      setIsEditing(false);
    }
  };

  // To update the id when successfully creating a set
  useEffect(() => {
    setValue('id', currentSet.id);
  }, [currentSet.id, setValue]);

  return (
    <TableRow sx={{
      '&:last-child td, &:last-child th': { border: 0 },
      backgroundColor: isError ? alpha(colors.darkRed, 0.2) : undefined,
    }}>
      <StyledTableCell>
        <Stack direction="row" spacing={0.5}>
          {!isDeleteConfirm && !isEditing && (
            <>
              <Tooltip title="Delete" arrow>
                <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setIsDeleteConfirm(true)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" arrow>
                <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setIsEditing(true)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </>
          )}
          {isDeleteConfirm && (
            <ConfirmCancelIconCell
              confirmActionText="Confirm Delete"
              cancelActionText="Cancel"
              confirmAction={handleDelete}
              cancelAction={() => setIsDeleteConfirm(false)}
            />
          )}
          {isEditing && (
            <ConfirmCancelIconCell
              confirmActionText="Save"
              cancelActionText="Cancel"
              confirmAction={handleSubmit(handleSave)}
              cancelAction={handleCancelEdit}
              cancelDisabled={isAutoAdded}
            />
          )}
        </Stack>
      </StyledTableCell>
      <StyledTableCell>
        {index + 1}
      </StyledTableCell>
      <StyledTableCell>
        <Controller
          control={control}
          name="weight"
          render={({ field }) => (
            <Tooltip title={!isEditing && currentSet.isCompleted ? 'Click edit to change' : 'Weight'} arrow>
              <StyledTextField
                {...field}
                type="number"
                size="small"
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.select();
                  }
                }}
                slotProps={{
                  input: {
                    readOnly: !isEditing && currentSet.isCompleted,
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: !isEditing && currentSet.isCompleted ? colors.success : undefined,
                    },
                  },
                  minWidth: '3.5rem',
                }}
              />
            </Tooltip>
          )}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Controller
          control={control}
          name="reps"
          render={({ field }) => (
            <Tooltip title={!isEditing && currentSet.isCompleted ? 'Click edit to change' : 'Reps'} arrow>
              <StyledTextField
                {...field}
                type="number"
                size="small"
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.select();
                  }
                }}
                slotProps={{
                  input: {
                    readOnly: !isEditing && currentSet.isCompleted,
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: !isEditing && currentSet.isCompleted ? colors.success : undefined,
                    },
                  },
                  minWidth: '2.5rem',
                }}
              />
            </Tooltip>
          )}
        />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Checkbox
          checked={currentSet.isCompleted}
          onChange={handleCheckboxChange}
          disabled={isEditing && currentSet.id !== undefined}
          sx={{
            color: colors.white,
            '&.Mui-checked': {
              color: isEditing ? colors.grey850 : colors.success,
            }
          }}
        />
      </StyledTableCell>
    </TableRow>
  );
});

WeightedSetRow.displayName = 'WeightedSetRow';

// Duration Set Row Component
const DurationSetRow: FC<{
  index: number;
  currentSet: DurationSetResponse;
  exerciseId: number;
  removeSet: (index: number) => void;
  isAutoAdded?: boolean;
}> = memo(({ index, currentSet, exerciseId, removeSet, isAutoAdded = false }) => {
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(currentSet.id === undefined);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const { control, handleSubmit, setValue, reset } = useForm<DurationSetResponse>({
    defaultValues: currentSet,
    resolver: zodResolver(z.object({
      id: currentSet.id ? z.number() : z.undefined(),
      duration: z.coerce.number().min(0, "Duration must be 0 or greater"),
      isCompleted: z.boolean(),
    }))
  });

  const { mutate: createDurationSet } = useCreateDurationSet();
  const { mutate: updateSet } = useUpdateSet();
  const { mutate: deleteSet } = useDeleteSet();

  const onCheck = useCallback((data: DurationSetResponse) => {
    if (currentSet.id === undefined) {
      createDurationSet({
        exerciseId,
        set: data,
        isCompleted: true,
        setIndex: index,
      }, {
        onError: () => {
          setIsError(true);
        }
      });
    } else {
      updateSet({
        exerciseId,
        set: data,
        isCompleted: true,
      }, {
        onError: () => {
          setIsError(true);
        }
      });
    }
  }, [currentSet.id, exerciseId, createDurationSet, updateSet, index]);

  const onUnCheck = useCallback((data: DurationSetResponse) => {
    if (currentSet.id) {
      updateSet({
        exerciseId,
        set: data,
        isCompleted: false,
      }, {
        onError: () => {
          setIsError(true);
        }
      });
    }
  }, [currentSet.id, exerciseId, updateSet]);

  const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      handleSubmit(onCheck)();
    } else {
      handleSubmit(onUnCheck)();
    }
  }, [handleSubmit, onCheck, onUnCheck]);

  const handleSave = useCallback((data: DurationSetResponse) => {
    if (currentSet.id === undefined) {
      createDurationSet({
        exerciseId,
        set: data,
        isCompleted: false,
        setIndex: index,
      }, {
        onSuccess: () => {
          setIsEditing(false);
        }
      });
    } else {
      // Only update if duration has changed
      const hasChanges = data.duration !== currentSet.duration;
      if (hasChanges) {
        updateSet({
          exerciseId,
          set: data,
          isCompleted: currentSet.isCompleted,
        }, {
          onSuccess: () => {
            setIsEditing(false);
          }
        });
      } else {
        setIsEditing(false);
      }
    }
  }, [currentSet.id, exerciseId, createDurationSet, updateSet, currentSet.isCompleted, currentSet.duration, index]);

  const handleDelete = () => {
    if (currentSet.id) {
      deleteSet({ setId: currentSet.id });
    }
  };

  const handleCancelEdit = () => {
    if (currentSet.id === undefined) {
      removeSet(index);
    } else {
      reset();
      setIsEditing(false);
    }
  };

  // To update the id when successfully creating a set
  useEffect(() => {
    setValue('id', currentSet.id);
  }, [currentSet.id, setValue]);

  return (
    <TableRow sx={{
      '&:last-child td, &:last-child th': { border: 0 },
      backgroundColor: isError ? alpha(colors.darkRed, 0.2) : undefined,
    }}>
      <StyledTableCell>
        <Stack direction="row" spacing={0.5}>
          {!isDeleteConfirm && !isEditing && (
            <>
              <Tooltip title="Delete" arrow>
                <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setIsDeleteConfirm(true)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" arrow>
                <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setIsEditing(true)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </>
          )}
          {isDeleteConfirm && (
            <ConfirmCancelIconCell
              confirmActionText="Confirm Delete"
              cancelActionText="Cancel"
              confirmAction={handleDelete}
              cancelAction={() => setIsDeleteConfirm(false)}
            />
          )}
          {isEditing && (
            <ConfirmCancelIconCell
              confirmActionText="Save"
              cancelActionText="Cancel"
              confirmAction={handleSubmit(handleSave)}
              cancelAction={handleCancelEdit}
              cancelDisabled={isAutoAdded}
            />
          )}
        </Stack>
      </StyledTableCell>
      <StyledTableCell>
        {index + 1}
      </StyledTableCell>
      <StyledTableCell>
        <Controller
          control={control}
          name="duration"
          render={({ field }) => (
            <Tooltip title={!isEditing && currentSet.isCompleted ? 'Click edit to change' : 'Duration (seconds)'} arrow>
              <StyledTextField
                {...field}
                type="number"
                size="small"
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.select();
                  }
                }}
                slotProps={{
                  input: {
                    readOnly: !isEditing && currentSet.isCompleted,
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: !isEditing && currentSet.isCompleted ? colors.success : undefined,
                    },
                  },
                  minWidth: '4rem',
                }}
              />
            </Tooltip>
          )}
        />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Checkbox
          checked={currentSet.isCompleted}
          onChange={handleCheckboxChange}
          disabled={isEditing && currentSet.id !== undefined}
          sx={{
            color: colors.white,
            '&.Mui-checked': {
              color: isEditing ? colors.grey850 : colors.success,
            }
          }}
        />
      </StyledTableCell>
    </TableRow>
  );
});

DurationSetRow.displayName = 'DurationSetRow';

// Generic Set Row Component that renders the appropriate type
const SetRow: FC<{
  index: number;
  currentSet: SetResponse;
  exerciseId: number;
  removeSet: (index: number) => void;
  isAutoAdded?: boolean;
}> = memo(({ index, currentSet, exerciseId, removeSet, isAutoAdded = false }) => {
  if (isWeightedSet(currentSet)) {
    return (
      <WeightedSetRow
        index={index}
        currentSet={currentSet}
        exerciseId={exerciseId}
        removeSet={removeSet}
        isAutoAdded={isAutoAdded}
      />
    );
  } else if (isDurationSet(currentSet)) {
    return (
      <DurationSetRow
        index={index}
        currentSet={currentSet}
        exerciseId={exerciseId}
        removeSet={removeSet}
        isAutoAdded={isAutoAdded}
      />
    );
  }
  
  return null; // Should never happen with proper type guards
});

SetRow.displayName = 'SetRow';

export const SetsTable: FC<SetsTableProps> = ({ exercise }) => {
  const { mutate: addEmptySet } = useAddEmptySet();
  const { mutate: removeEmptySet } = useRemoveEmptySet();
  const hasAddedEmptySet = useRef(false);
  const { data: exerciseTypes } = useGetExerciseTypes();

  const addSet = useCallback(() => {
    // Determine the set type based on exercise type
    const setType = getSetTypeForExercise(exercise.exerciseTypeId, exerciseTypes);
    addEmptySet({ exerciseId: exercise.id, setType });
  }, [addEmptySet, exercise.id, exercise.exerciseTypeId, exerciseTypes]);

  const removeSet = useCallback((index: number) => {
    removeEmptySet({ exerciseId: exercise.id, index });
  }, [removeEmptySet, exercise.id]);

  // Auto-add empty set if table is empty
  useEffect(() => {
    if (exercise.sets.length === 0 && !hasAddedEmptySet.current) {
      hasAddedEmptySet.current = true;
      const setType = getSetTypeForExercise(exercise.exerciseTypeId, exerciseTypes);
      addEmptySet({ exerciseId: exercise.id, setType });
    } else if (exercise.sets.length > 0) {
      hasAddedEmptySet.current = false;
    }
  }, [exercise.sets.length, exercise.id, exercise.exerciseTypeId, exerciseTypes, addEmptySet]);

  // Determine if this exercise uses weighted or duration sets
  const hasWeightedSets = exercise.sets.some(set => isWeightedSet(set));
  const hasDurationSets = exercise.sets.some(set => isDurationSet(set));
  
  // Determine exercise type based on exercise type data
  const exerciseSetType = getSetTypeForExercise(exercise.exerciseTypeId, exerciseTypes);
  
  // If we have existing sets, use their type to determine table headers
  // Otherwise, determine based on exercise type
  // Default to weighted if exercise types are still loading
  const isWeightedExercise = hasWeightedSets || (!hasWeightedSets && !hasDurationSets && (exerciseSetType === 'weighted' || !exerciseTypes));

  return (
    <>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>Set</StyledTableCell>
              {isWeightedExercise ? (
                <>
                  <StyledTableCell>Weight</StyledTableCell>
                  <StyledTableCell>Reps</StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell>Duration (s)</StyledTableCell>
                </>
              )}
              <StyledTableCell align="right">Complete</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {exercise.sets.map((set, index) => (
              <SetRow
                key={set.id !== undefined ? `set-${set.id}` : `new-set-${index}`}
                index={index}
                currentSet={set}
                exerciseId={exercise.id}
                removeSet={removeSet}
                isAutoAdded={exercise.sets.length === 1 && set.id === undefined}
              />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Button filled onClick={addSet}>Add Set</Button>
    </>
  );
};