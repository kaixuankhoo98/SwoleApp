import { Box, Button, Stack, Typography } from "@mui/material";
import Main from "../Main/Main";
import useUser from "../Auth/authHooks";

const Workout = () => {
  const user = useUser();
  return (
    <Main>
      <Stack direction='column' gap='1rem'>
        Workout
      </Stack>
    </Main>
  )
}

export default Workout;