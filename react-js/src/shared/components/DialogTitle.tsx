import { Close } from "@mui/icons-material";
import { DialogTitle as BaseDialogTitle, DialogTitleOwnProps, IconButton, useTheme } from "@mui/material";
import { FC } from "react";

type OnClose = {
  bivarianceHack: (
    onClose?: (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeButton') => void
  ) => void
}['bivarianceHack']
type DialogTitleProps = DialogTitleOwnProps & {
  onClose?: OnClose
}

export const DialogTitle: FC<DialogTitleProps> = ({ onClose, children, ...props }) => {
  const theme = useTheme();
  return (
    <BaseDialogTitle
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: '0.5rem 1rem',
        backgroundColor: theme.palette.background.paper,
      }}>
      {children}
      <IconButton onClick={() => onClose && onClose()} color="inherit" aria-label="close">
        <Close />
      </IconButton>
    </BaseDialogTitle>
  )
}