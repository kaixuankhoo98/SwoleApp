import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";

const StartWorkoutButton: FC = () => {
  const navigate = useNavigate();

  const { palette } = useTheme();

  return (
    <Box
      alignSelf="center"
      sx={{
        width: '70vw',
        backgroundColor: palette.background.paper,
        borderRadius: '10px', 
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <Typography>Ready to start your next workout?</Typography>
      <Button onClick={() => navigate("/workout")}>Get Started</Button>
    </Box>
  )
};

export default StartWorkoutButton;