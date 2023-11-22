// Tên file: SnackbarNoti.tsx
import React from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface SnackbarNotiProps {
  open: boolean;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
  actionButtonLabel: string;
  onActionButtonClick: () => void;
}

export function SnackbarNoti({
  open,
  onClose,
  message,
  actionButtonLabel,
  onActionButtonClick,
}: SnackbarNotiProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={onActionButtonClick}>
            {actionButtonLabel}
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <IoMdClose fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
