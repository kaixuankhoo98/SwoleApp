import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  HelpOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { FC } from "react";
import MenuButton from "./MenuButton";
import { useNavigate } from "react-router-dom";

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
            <IconButton>
              <HelpOutline />
            </IconButton>
            <IconButton onClick={() => navigate('/settings')}>
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
