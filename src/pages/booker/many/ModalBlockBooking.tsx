import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { blockTour } from "../../../store/redux/silce/booking";
import { Alert, CircularProgress } from "@mui/joy";
import Warning from "@mui/icons-material/Warning";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalBlockBooking(dataDate: any) {
  const { index } = useParams();
  const [open, setOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleClickOpen = () => {
    if (dataDate?.dateDate.length === 0) {
      toast.warning("Please select a date before block the trip.");
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelTour = () => {
    const data = {
      idTour: index,
      dataDate: dataDate?.dateDate,
    };
    dispatch(blockTour(data));
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        type="button"
        className="bg-yellow-500 px-2 py-1 text-white rounded-md"
      >
        Block trip
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className="bg-navy-blue p-5">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Block tour
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="min-h-[70vh] flex  items-center justify-center">
          <div className="flex flex-col w-96 ">
            <span className="text-lg   font-semibold">Date Block</span>
            {dataDate && dataDate?.dateDate?.length > 0 && (
              <span className="block ">
                {dataDate?.dateDate?.map((date: string) => (
                  <span>{date}</span>
                ))}
              </span>
            )}
            <button
              className="bg-yellow-500 text-white py-1.5 rounded-lg mt-4"
              onClick={handleOpenConfirm}
            >
              Block tour
            </button>
          </div>
        </div>
        {openConfirm && (
          <div className="fixed w-screen h-screen flex items-center justify-center bg-gray-50 z-50  ">
            <Alert
              variant="soft"
              color="warning"
              invertedColors
              startDecorator={
                <CircularProgress size="lg" color="danger">
                  <Warning />
                </CircularProgress>
              }
              sx={{ alignItems: "flex-start", gap: "1rem" }}
            >
              <div>
                <p className="text-xl">Block Tour</p>
                <span className="w-64 flex flex-wrap">
                  Whether you're traveling with an intimate circle or a larger
                  group, the "Block Tour" feature accommodates varying group
                  sizes, providing flexibility for gatherings of all kinds.
                </span>
                <div className="text-end mt-4">
                  <button
                    className="bg-white text-yellow-900 px-4 py-1 rounded-md mr-4"
                    onClick={handleCloseConfirm}
                  >
                    No
                  </button>
                  <button
                    className="bg-yellow-900 text-white px-4 py-1 rounded-md"
                    onClick={handleCancelTour}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </Alert>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}
