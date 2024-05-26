import { Box, Stack, Typography } from "@mui/material";
import Main from "../Main/Main";
import useUser from "../Auth/authHooks";
import { FC } from "react";
import StartWorkoutButton from "./StartWorkoutButton";

const Home: FC = () => {
  const user = useUser();

  return (
    <Main>
      <Stack direction="column" gap="1rem">
        <Typography variant="h4" align="center" sx={{ marginTop: "1.125rem" }}>
          {" "}
          {`Welcome back, ${user.name}!`}
        </Typography>
        <Box>
          <Typography variant="body1" align="center">
            Here's a summary of your last workout:
          </Typography>
        </Box>

        <StartWorkoutButton />
      </Stack>
    </Main>
  );
};

export default Home;
