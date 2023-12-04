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
import { cancelTour } from "../../../store/redux/silce/booking";
import { Alert, CircularProgress } from "@mui/joy";
import Warning from "@mui/icons-material/Warning";
import { message } from "antd";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCancelBooking(dataDate: any) {
  const { index } = useParams();
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const dispatch: AppDispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleClickOpen = () => {
    if (dataDate?.dateDate.length === 0) {
      message.warning("Please select a date before canceling the trip.");
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
      dataDate: dataDate?.dateDate?.[0],
      reason: reason,
    };
    dispatch(cancelTour(data)).then((response) => {
      if (cancelTour.fulfilled.match(response)) {
        setOpen(false);
      }
      if (cancelTour.rejected.match(response)) {
        setOpen(false);
      }
    });
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
        className="bg-red-500 px-2 py-1 text-white rounded-md"
      >
        Cancel trip
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
              Cancel tour
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="min-h-[70vh] flex  items-center justify-center">
          <div className="flex flex-col w-96 ">
            <span className="text-lg   font-semibold">Cancel Date</span>
            {dataDate && dataDate?.dateDate?.length > 0 && (
              <span className="block ">
                {dataDate?.dateDate?.map((date: string) => (
                  <span>{date}</span>
                ))}
              </span>
            )}
            <span className="text-lg font-semibold mb-1 ">Reason</span>

            <textarea
              className="border border-gray-300 w-full p-2 rounded-lg min-h-[24vh] "
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button
              className="bg-red-500 text-white py-1.5 rounded-lg mt-4"
              onClick={handleOpenConfirm}
            >
              Cancel tour
            </button>
          </div>
        </div>
        {openConfirm && (
          <div className="fixed w-screen h-screen flex items-center justify-center bg-gray-50 z-50  ">
            <Alert
              variant="soft"
              color="danger"
              invertedColors
              startDecorator={
                <CircularProgress size="lg" color="danger">
                  <Warning />
                </CircularProgress>
              }
              sx={{ alignItems: "flex-start", gap: "1rem" }}
            >
              <div>
                <p className="text-xl">Cancel Tour</p>
                <span className="w-64 flex flex-wrap">
                  Enjoy the freedom to plan without worries. Our "Cancel Tour"
                  feature provides you with peace of mind, knowing that your
                  travel arrangements can adapt to your evolving needs.
                </span>
                <div className="text-end mt-4">
                  <button
                    className="bg-white text-red-900 px-4 py-1 rounded-md mr-4"
                    onClick={handleCloseConfirm}
                  >
                    No
                  </button>
                  <button
                    className="bg-red-900 text-white px-4 py-1 rounded-md"
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
