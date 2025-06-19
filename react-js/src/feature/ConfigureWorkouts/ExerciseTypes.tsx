import { FC } from "react"
import { Accordion } from "../../shared/components/Accordion"
import { Box, Stack, Typography } from "@mui/material"
import { AddExerciseTypeButton } from "./AddExerciseTypeButton";
import { Loading } from "../../shared/components/Loading";
import colors from "../../shared/theme/colors";
import { ExerciseTypeRow } from "./ExerciseTypeRow";
import { useExerciseTypesByGroup } from "./hooks/useExerciseTypesByGroup";

export const ExerciseTypes: FC = () => {
  const { groups, exerciseTypesByGroup, isLoading } = useExerciseTypesByGroup();

  if (isLoading || !groups || !exerciseTypesByGroup) {
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
