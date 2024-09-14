import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const Loading: FC = () => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress sx={{ margin: "3rem" }} />
  </Box>
);
