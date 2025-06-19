import { useMemo } from "react";
import { ExerciseType } from "./types";
import { useGetExerciseTypes } from "./exerciseTypeHooks";
import { useGetGroups } from "./groupHooks";

export const useExerciseTypesByGroup = () => {
  const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useGetExerciseTypes();
  const { data: groups, isLoading: isLoadingGroups } = useGetGroups();

  const exerciseTypesByGroup = useMemo(() => {
    if (!exerciseTypes || !groups) return new Map<number, ExerciseType[]>();
    
    return exerciseTypes.reduce((acc, exerciseType) => {
      const groupId = exerciseType.groupId;
      if (!groupId) return acc;
      
      const existing = acc.get(groupId) ?? [];
      acc.set(groupId, [...existing, exerciseType]);
      return acc;
    }, new Map<number, ExerciseType[]>());
  }, [exerciseTypes, groups]);

  const getGroupName = useMemo(() => {
    if (!groups) return () => '';
    
    return (groupId: number) => {
      const group = groups.find(g => g.id === groupId);
      return group?.name ?? `Group ${groupId}`;
    };
  }, [groups]);

  return {
    exerciseTypes,
    groups,
    exerciseTypesByGroup,
    getGroupName,
    isLoading: isLoadingExerciseTypes || isLoadingGroups,
  };
}; 