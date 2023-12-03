import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TicketSpecial from "./TicketSpecial";
import { ButtonCreateTicketSpecial } from "./ButtonCreateTicketSpecial";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateTicketSpecial() {
  const [open, setOpen] = React.useState(false);

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
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className="bg-navy-blue">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create ticket special{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <ButtonCreateTicketSpecial />
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <TicketSpecial />
        </List>
      </Dialog>
    </React.Fragment>
  );
}
