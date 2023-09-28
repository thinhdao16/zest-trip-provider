import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCircle, FaEnvelopeOpenText } from "react-icons/fa6";

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
  console.log(formEntries);
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
            Schedule information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            These periods normally correspond with normal working hours for the
            work week and reduced hours for weekends and holidays.
          </Typography>
          <Grid
            container
            style={{ display: "flex", alignItems: "center", marginTop: "12px" }}
          >
            <Grid item xs={6} sm={2.5}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>From time:</p>
              <input
                className="border border-gray-300 p-2 rounded-lg shadow-custom-card-mui hover:border-navy-blue focus:outline-none focus:border-navy-blue"
                type="time"
                value={fromTime}
                onChange={handleFromTimeChange}
              />
            </Grid>
            <Grid item xs={6} sm={2.5}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>To Time:</p>
              <input
                className="border border-gray-300 p-2 rounded-lg shadow-custom-card-mui hover:border-navy-blue focus:outline-none focus:border-navy-blue"
                type="time"
                value={toTime}
                onChange={handleToTimeChange}
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>
                Description:
              </p>
              <div className="relative">
                <FaEnvelopeOpenText className="absolute top-3 left-2" />
                <input
                  className="w-72 border border-gray-300 py-2 px-7 rounded-lg text-black shadow-custom-card-mui hover:border-navy-blue focus:outline-none focus:border-navy-blue"
                  value={formData}
                  onChange={handleInputChange}
                  placeholder="Enter your form data"
                />
              </div>
            </Grid>
            <Grid item xs={2} sm={2}>
              <p style={{ fontWeight: 500, marginBottom: "5px" }}>Add more:</p>
              <IoAddCircleOutline className="mt-3" onClick={handleAddBox} />
            </Grid>
          </Grid>

          <div
            className="mt-5 w-1/2 gap-6 grid mb-6"
            style={{ overflowWrap: "break-word" }}
          >
            {formEntries.map((boxData, index) => (
              <div key={index} className="relative max-w-full ">
                <FaCircle className="absolute inset-y-1/3 w-2" />
                <div className="ml-6">
                  <div className="flex gap-2">
                    <p className="font-medium">{boxData?.fromTime}</p>
                    <p className="font-medium">-</p>
                    <p className="font-medium ">{boxData?.toTime}</p>
                  </div>
                  <p>{boxData?.data}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            style={{}}
            className=" p-2 bg-navy-blue border border-navy-blue rounded-lg text-white hover:border-navy-blue hover:bg-white hover:text-navy-blue hover:border"
            onClick={handleSubmit}
          >
            Add schedule
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
