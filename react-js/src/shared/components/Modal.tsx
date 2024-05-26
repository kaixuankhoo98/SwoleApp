import { Dialog, DialogTitle } from "@mui/material";
import { FC, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
}

const Modal: FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <Dialog onClose={onClose} open>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default Modal;
