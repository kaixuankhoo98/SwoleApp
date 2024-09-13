import {
  Close,
  FitnessCenter,
  Home,
  Menu as MenuIcon,
  Person,
  Settings,
} from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "../../shared/components/MenuItem";

const MenuButton: FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>

      {open && (
        <Menu
          open
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose} text="Close" icon={<Close />} />
          <MenuItem
            onClick={() => navigate("/home")}
            text="Home"
            icon={<Home />}
          />
          <MenuItem
            onClick={() => navigate("/profile")}
            text="Profile"
            icon={<Person />}
          />
          <MenuItem
            onClick={() => navigate("/workout")}
            text="Start a Workout"
            icon={<FitnessCenter />}
          />
          <MenuItem
            onClick={() => navigate("/settings")}
            text="Settings"
            icon={<Settings />}
          />
        </Menu>
      )}
    </>
  );
};

export default MenuButton;
