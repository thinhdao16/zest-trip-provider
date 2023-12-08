import React, { useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import TicketSpecial from "./TicketSpecial";
import { ButtonCreateTicketSpecial } from "./ButtonCreateTicketSpecial";
import { Modal } from "antd";
import AvailabilityForCreateTicketSpecial from "./AvailabilityForCreateTicketSpecial";

export default function ModalCreateTicketSpecial() {
  const [open, setOpen] = useState<any>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <button
        className="bg-navy-blue text-white py-1 px-2 rounded-lg"
        onClick={handleClickOpen}
      >
        Add special ticket
      </button>
      <Modal
        className="top-10"
        title="Add children"
        open={open}
        onCancel={() => handleClose()}
        width={1450}
        // onOk={handleUpdateTicket}
      >
        <List>
          <Button autoFocus color="inherit" onClick={handleClose}>
            <ButtonCreateTicketSpecial />
          </Button>
          <div className="flex items-start gap-8">
            <AvailabilityForCreateTicketSpecial />
            <TicketSpecial />
          </div>
        </List>
      </Modal>
      {/* </Dialog> */}
    </React.Fragment>
  );
}
