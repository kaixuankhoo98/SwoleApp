import { FC, useMemo } from "react"
import { Accordion } from "../../shared/components/Accordion"
import { Box, Stack, Typography } from "@mui/material"
import { useGetExerciseTypes } from "./hooks/exerciseTypeHooks";
import { AddExerciseTypeButton } from "./AddExerciseTypeButton";
import { UseQueryResult } from "@tanstack/react-query";
import { ExerciseType, Group } from "./hooks/types";
import { Loading } from "../../shared/components/Loading";
import colors from "../../shared/theme/colors";
import { ExerciseTypeRow } from "./ExerciseTypeRow";

export const ExerciseTypes: FC<{ getGroups: UseQueryResult<Group[], Error> }> = ({ getGroups }) => {
  const { data: exerciseTypes, isLoading } = useGetExerciseTypes();
  const { data: groups } = getGroups;

  // Create a map of group IDs to their exercise types
  const exerciseTypesByGroup = useMemo(() => {
    if (!exerciseTypes) return new Map<number, ExerciseType[]>();
    
    return exerciseTypes.reduce((acc, exerciseType) => {
      const groupId = exerciseType.groupId;
      if (!groupId) return acc;
      
      const existing = acc.get(groupId) ?? [];
      acc.set(groupId, [...existing, exerciseType]);
      return acc;
    }, new Map<number, ExerciseType[]>());
  }, [exerciseTypes]);

  if (isLoading || !groups || !exerciseTypes) {
    return <Loading />
  }

  return (
    <Accordion title="Exercise Types" defaultExpanded={true}>
      <Box>
        {groups?.map((group) => (
          <Box key={group.id} sx={{ backgroundColor: colors.blackDark, p: '0.5rem', borderRadius: '0.25rem', mb: '0.5rem' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ pl: '0.25rem' }}>{group.name}</Typography>
              <AddExerciseTypeButton groupId={group.id} />
            </Stack>
            {exerciseTypesByGroup.get(group.id)?.map((exerciseType) => (
              <ExerciseTypeRow exerciseType={exerciseType} key={exerciseType.id} />
            ))}
          </Box>
        ))}
        <AddExerciseTypeButton />
      </Box>
    </Accordion>
  )
}
