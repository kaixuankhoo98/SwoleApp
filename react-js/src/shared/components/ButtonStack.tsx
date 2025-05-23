import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type ButtonStackProps = {
  children: ReactNode;
  direction?: "row" | "column";
};
export const ButtonStack: FC<ButtonStackProps> = ({ children, direction }) => {
  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: direction || "column",
        gap: 1,
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};
