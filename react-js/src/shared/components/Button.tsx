import { Button as BaseButton } from "@mui/material";
import { FC, ReactNode } from "react";
import colors from "../theme/colors";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  filled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, onClick, filled }) => {
  return (
    <BaseButton
      variant={filled ? "contained" : "outlined"}
      sx={{
        backgroundColor: filled ? colors.regentGrey : null,
        color: filled ? 'black' : 'white'
      }}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
