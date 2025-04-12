import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  Logout,
  SettingsOutlined,
} from "@mui/icons-material";
import { FC } from "react";
import MenuButton from "./MenuButton";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../Auth/authHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../app/AuthContext";

const NavBar: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const queryClient = useQueryClient();
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.clear();
        setUser(null);
        navigate("/login");
      },
    });
  }
  
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
            <IconButton onClick={() => navigate('/settings')}>
              <SettingsOutlined />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
