import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (boxes: BoxData[]) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

interface BoxData {
  data: string;
  fromTime: string;
  toTime: string;
}

const FormModal: React.FC<FormModalProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState("");
  const [fromTime, setFromTime] = useState("00:00");
  const [toTime, setToTime] = useState("00:00");
  const [formEntries, setFormEntries] = useState<BoxData[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  const handleFromTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromTime(event.target.value);
  };

  const handleToTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToTime(event.target.value);
  };

  const handleAddBox = () => {
    const newBox: BoxData = {
      data: formData,
      fromTime: fromTime,
      toTime: toTime,
    };

    setFormEntries((prevBoxes) => [...prevBoxes, newBox]);
    setFormData("");
    setFromTime("00:00");
    setToTime("00:00");
  };

  const handleSubmit = () => {
    onSubmit(formEntries);
    setFormEntries([]);
    setFormData("");
    setFromTime("00:00");
    setToTime("00:00");
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={3}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>From time:</p>
              <input
                style={{ borderRadius: "8px" }}
                type="time"
                value={fromTime}
                onChange={handleFromTimeChange}
              />
            </Grid>
            <Grid item xs={3}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>To Time:</p>
              <input
                style={{ borderRadius: "8px" }}
                type="time"
                value={toTime}
                onChange={handleToTimeChange}
              />
            </Grid>
            <Grid item xs={5}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>
                Description:
              </p>
              <input
                style={{ height: "40px", borderRadius: "8px" }}
                value={formData}
                onChange={handleInputChange}
                placeholder="Enter your form data"
              />
            </Grid>
            <Grid item xs={1}>
              <IoAddCircleOutline onClick={handleAddBox} />
            </Grid>
          </Grid>

          <Box>
            {formEntries.map((boxData, index) => (
              <Box key={index}>
                <div>{boxData?.data}</div>
              </Box>
            ))}
            <button onClick={handleSubmit}>Submit</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
