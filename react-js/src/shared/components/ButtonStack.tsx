import { Box, SxProps, Theme } from "@mui/material";
import { FC, ReactNode } from "react";

type ButtonStackProps = {
  children: ReactNode;
  direction?: "row" | "column";
  sx?: SxProps<Theme>;
};

export const ButtonStack: FC<ButtonStackProps> = ({ children, direction, sx }) => {
  return (
    <Box
      sx={{
        marginTop: 2,
        alignItems: 'center',
        direction: direction || 'column',
        gap: 1,
        width: "100%",
        ...sx
      } as SxProps<Theme>}
    >
      {children}
    </Box>
  );
};
