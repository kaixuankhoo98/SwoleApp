import { Logout } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useAuth } from "../../app/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../Auth/authHooks";
import Modal from "../../shared/components/Modal";

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
      {open && (
        <Modal title="Log Out" onClose={handleCloseDialog} onConfirm={handleLogout}>
          <Typography>
            Are you sure you want to log out?
          </Typography>
        </Modal>
      )}
    </>
  );
};
