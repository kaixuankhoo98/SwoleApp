import { Box, List, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";
import { usePreviousWorkouts } from "./previousWorkoutHooks";
import { format, startOfYear } from "date-fns";

export const PreviousWorkouts: FC = () => {
  const { data } = usePreviousWorkouts({
    startDate: startOfYear(new Date()),
  });

  return <Box sx={{ alignSelf: 'center' }}>
    <List>
      {data.map((workout) => (
        <ListItem key={workout.id}>
          <ListItemText primary={format(workout.startTime, 'MM/dd/yyyy')} />
        </ListItem>
      ))}
    </List>
  </Box>;
};
