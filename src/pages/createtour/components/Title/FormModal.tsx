import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";

interface FormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: BoxData[]) => void; // Fix the type here
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
    const [boxes, setBoxes] = useState<BoxData[]>([]);
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
            toTime: toTime
        };
        setBoxes(prevBoxes => [...prevBoxes, newBox]);
        setFormData("");
        setFromTime("00:00");
        setToTime("00:00");
    };

    const handleSubmit = () => {
        onSubmit(boxes); // Pass the array directly
        setFormData("");
        onClose();
        setBoxes([]);
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
                    <Box>
                        <label>
                            From Time:
                            <input
                                type="time"
                                value={fromTime}
                                onChange={handleFromTimeChange}
                            />
                        </label>
                        <label>
                            To Time:
                            <input type="time" value={toTime} onChange={handleToTimeChange} />
                        </label>
                        <TextField
                            value={formData}
                            onChange={handleInputChange}
                            placeholder="Enter your form data"
                        />
                        <IoAddCircleOutline onClick={handleAddBox} />
                    </Box>
                    {boxes.map((boxData, index) => (
                        <div key={index}>
                            <p>Data: {boxData.data}</p>
                            <p>From Time: {boxData.fromTime}</p>
                            <p>To Time: {boxData.toTime}</p>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                </Box>
            </Modal>
        </div>
    );
};

export default FormModal;
