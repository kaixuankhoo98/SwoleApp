import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Main from "../Main/Main";
import StartWorkoutButton from "./StartWorkoutButton";
import { PreviousWorkouts } from "../PreviousWorkouts/PreviousWorkouts";
import { useSnackbar } from "../../shared/hooks/snackbar";
import { useUser } from "../Auth/authHooks";

const Home: FC = () => {
  const { data } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Main>
      <Stack direction="column" gap="1rem">
        <Typography variant="h4" align="center" sx={{ marginTop: "1.125rem" }}>
          {`Welcome back, ${data?.email}!`}
        </Typography>
        <PreviousWorkouts />
        <StartWorkoutButton />
        <Button onClick={() => enqueueSnackbar({ message: 'test', variant:'success' })}>enqueue snackbar</Button>
      </Stack>
    </Main>
  );
};

export default Home;
