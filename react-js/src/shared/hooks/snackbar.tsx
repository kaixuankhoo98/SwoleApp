import { useSnackbar as useNotistackSnackbar } from "notistack";
import { Alert, AlertColor, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface SnackbarProps {
  message: string;
  variant?: AlertColor;
  duration?: number;
  hideCloseButton?: boolean;
}

export const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useNotistackSnackbar();

  // Custom enqueueSnackbar function that renders MUI Alerts with a close button
  const customEnqueueSnackbar = ({
    message,
    variant = "info",
    duration = 3000,
    hideCloseButton = false,
  }: SnackbarProps) => {
    return enqueueSnackbar(message, {
      variant,
      autoHideDuration: duration,
      content: (key, message) => (
        <Alert
          severity={variant}
          sx={{ alignItems: "center" }}
          action={
            hideCloseButton ? null : (
              <IconButton
                onClick={() => closeSnackbar(key)}
              >
                <Close />
              </IconButton>
            )
          }
        >
          {message}
        </Alert>
      ),
    });
  };

  return { enqueueSnackbar: customEnqueueSnackbar, closeSnackbar };
};
