import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import MenuButton from "./MenuButton";
import { LogoutButton } from "./LogoutButton";

const NavBar: FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <MenuButton />
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
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
