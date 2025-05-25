import { Dialog, DialogContent, Divider } from "@mui/material";
import { FC, ReactNode } from "react";
import { DialogTitle } from "./DialogTitle";
import { ButtonStack } from "./ButtonStack";
import Button from "./Button";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

const Modal: FC<ModalProps> = ({ children, onClose, onConfirm, title, confirmText, cancelText }) => {
  return (
    <Dialog onClose={onClose} open sx={{ padding: '2rem'}}>
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        {children}
      </DialogContent>
      <Divider />
      <ButtonStack direction="row" sx={{ justifyContent: 'flex-end' }}>
          <Button filled onClick={onClose}>
            {cancelText ?? 'Cancel'}
          </Button>
          <Button onClick={onConfirm}>
            {confirmText ?? 'Confirm'}
          </Button>
        </ButtonStack>
    </Dialog>
  );
};

export default Modal;
