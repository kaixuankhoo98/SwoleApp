import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  BarChartOutlined,
  HelpOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { FC } from "react";
import MenuButton from "./MenuButton";

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
            <IconButton>
              <HelpOutline />
            </IconButton>
            <IconButton>
              <BarChartOutlined />
            </IconButton>
            <IconButton>
              <SettingsOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
