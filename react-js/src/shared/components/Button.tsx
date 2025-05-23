import {
  alpha,
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  CircularProgress,
} from "@mui/material";
import { FC } from "react";
import colors from "../theme/colors";

type ButtonProps = BaseButtonProps & {
  filled?: boolean;
  isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({ filled, isLoading, ...otherProps }) => {
  return (
    <BaseButton
      variant={filled ? "contained" : "outlined"}
      sx={{
        padding: "0.625rem 1.125rem",
        height: "2.5rem",
        backgroundColor: filled ? colors.white : colors.casalGrey,
        color: filled ? colors.blackDark : colors.white,
        borderColor: colors.white,
        "&:hover": {
          backgroundColor: filled
          ? alpha(colors.white, 0.6)
          : alpha(colors.casalGrey, 0.6),
        },
      }}
      {...otherProps}
    >
      {isLoading ? (
        <CircularProgress size='1rem' sx={{ color: filled ? colors.darkInfo : colors.white }}/>
      ) : (
        otherProps.children
      )}
    </BaseButton>
  );
};

export default Button;
