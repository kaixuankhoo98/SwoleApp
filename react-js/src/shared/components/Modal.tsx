import { Dialog, DialogContent, Divider, Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import { DialogTitle } from "./DialogTitle";
import Button from "./Button";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  isConfirmLoading?: boolean;
  maxHeight?: boolean;
  maxWidth?: boolean;
}

const Modal: FC<ModalProps> = ({ 
  children, 
  onClose, 
  onConfirm, 
  title, 
  confirmText, 
  cancelText, 
  isConfirmLoading, 
  maxHeight = false, 
  maxWidth = false 
}) => {
  return (
    <Dialog 
      onClose={onClose} 
      open 
      sx={{ 
        padding: '2rem',
        '& .MuiDialog-paper': {
          borderRadius: '0.5rem',
          height: maxHeight ? '95%' : 'auto',
          width: maxWidth ? '95%' : 'auto',
        }
      }}
    >
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        {children}
      </DialogContent>
      <Divider />
      <Stack 
        direction="row" 
        sx={{ 
          p: '0.5rem',
          justifyContent: 'center', 
          gap: '1rem' 
        }}
      >
        <Button filled onClick={onClose}>
          {cancelText ?? 'Cancel'}
        </Button>
        <Button onClick={onConfirm} isLoading={isConfirmLoading}>
          {confirmText ?? 'Confirm'}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default Modal;
