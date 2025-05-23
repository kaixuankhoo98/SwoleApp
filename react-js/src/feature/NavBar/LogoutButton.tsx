import { Logout } from "@mui/icons-material";
import { Dialog, Divider, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useAuth } from "../../app/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../Auth/authHooks";
import { ButtonStack } from "../../shared/components/ButtonStack";
import Button from "../../shared/components/Button";
import { DialogTitle } from "../../shared/components/DialogTitle";

export const LogoutButton: FC = () => {
  const { setUser } = useAuth();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  }

  const queryClient = useQueryClient();
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.clear();
        localStorage.clear();
        setUser(null);
      },
    });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Logout />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog} sx={{ padding: '2rem'}}>
        <DialogTitle onClose={handleCloseDialog}>Log Out</DialogTitle>
        <Divider />
        <Typography>
          Are you sure you want to log out?
        </Typography>
        <Divider />
        <ButtonStack direction="row">
          <Button filled onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleLogout}>
            Log Out
          </Button>
        </ButtonStack>
        {/* <div style={{ padding: "1rem" }}>
          <h2>Are you sure you want to log out?</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton onClick={() => setOpen(false)} color="error">
              <Close />
            </IconButton>
            <IconButton onClick={handleLogout} color="success">
              <Check />
            </IconButton>
          </div>
        </div> */}
      </Dialog>
    </>
  );
};
