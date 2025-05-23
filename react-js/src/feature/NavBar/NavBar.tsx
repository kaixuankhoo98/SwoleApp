import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import MenuButton from "./MenuButton";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

const NavBar: FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <MenuButton />
          <Box onClick={() => navigate('/home')} sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography sx={{ paddingLeft: "0.5rem", fontWeight: "700" }}>
              SWOLE
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
