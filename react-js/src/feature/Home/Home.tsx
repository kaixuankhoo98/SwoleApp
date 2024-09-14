import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import Main from "../Main/Main";
import useUser from "../Auth/authHooks";
import StartWorkoutButton from "./StartWorkoutButton";
import { PreviousWorkouts } from "./PreviousWorkouts";

const Home: FC = () => {
  const { data } = useUser();

  return (
    <Main>
      <Stack direction="column" gap="1rem">
        <Typography variant="h4" align="center" sx={{ marginTop: "1.125rem" }}>
          {`Welcome back, ${data.firstName}!`}
        </Typography>
        <PreviousWorkouts />
        <StartWorkoutButton />
      </Stack>
    </Main>
  );
};

export default Home;
