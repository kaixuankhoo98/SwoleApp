import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import NavBar from "../NavBar/NavBar";

type MainProps = {
  children: ReactNode;
};

const Main: FC<MainProps> = ({ children }) => {
  return (
    <Box sx={{ flex: 1 }} component='main'>
      <NavBar/>
      <Box sx={{ padding: '1rem' }}>
        {children}
      </Box>
    </Box>
  )
}

export default Main;