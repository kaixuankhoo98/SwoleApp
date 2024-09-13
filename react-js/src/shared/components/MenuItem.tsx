import { MenuItem as BaseMenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { FC, ReactNode } from "react";

interface MenuItemProps {
  onClick: () => void;
  icon: ReactNode;
  text: string;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, icon, text }) => {
  return (

  <BaseMenuItem onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText>{text}</ListItemText>
  </BaseMenuItem>
  )
};

export default MenuItem;
