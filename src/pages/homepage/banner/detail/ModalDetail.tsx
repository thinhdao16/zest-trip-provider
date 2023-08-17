import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from '@mui/material/Backdrop';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const style = {
  position: "absolute",
  top: "7%",
  left: "7%",
  transform: "translate(-7%, -7%)",
  width: "100vw",
  bgcolor: "background.paper",
  borderRadius: "15px 0 0 0",
  boxShadow: 24,
  p: 4,
};

const ModalDetail: React.FC<FormModalProps> = ({ open, onClose, onSubmit }) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <button onClick={handleSubmit}>Submit</button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDetail;
