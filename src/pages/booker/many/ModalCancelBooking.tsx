import * as React from "react";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { cancelTour } from "../../../store/redux/silce/booking";
import { Alert, CircularProgress } from "@mui/joy";
import Warning from "@mui/icons-material/Warning";
import { Modal } from "antd";
import { DataContext } from "../../../store/dataContext/DataContext";

export default function ModalCancelBooking({
  dataDate,
  openModal,
  setOpenMoal,
}: {
  dataDate: any;
  openModal: boolean;
  setOpenMoal: any;
}) {
  const { index } = useParams();
  const [reason, setReason] = React.useState("");
  const dispatch: AppDispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const { setLoading } = React.useContext(DataContext);
  const handleClose = () => {
    setOpenMoal(false);
  };
  const handleCancelTour = () => {
    const data = {
      idTour: index,
      dataDate: dataDate?.[0],
      reason: reason,
    };
    dispatch(cancelTour(data)).then((response) => {
      if (cancelTour.fulfilled.match(response)) {
        setOpenConfirm(false);
        setLoading((prev: any) => !prev);
        setOpenMoal(false);
      }
      if (cancelTour.rejected.match(response)) {
        setOpenConfirm(false);

        setLoading((prev: any) => !prev);
        setOpenMoal(false);
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
      <Modal
        title="Cancel tour"
        open={openModal}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
      >
        <div className=" flex  items-center justify-center">
          <div className="flex flex-col w-96 ">
            <span className="font-medium">Cancel Date</span>
            {dataDate && dataDate?.length > 0 && (
              <span className="block ">
                {dataDate?.map((date: string) => (
                  <span>{date}</span>
                ))}
              </span>
            )}
            <span className="font-medium mb-1 ">Reason</span>

            <textarea
              className="border border-gray-300 w-full p-2 rounded-lg min-h-[24vh] "
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="text-center">
              <button
                className="bg-red-500 text-white   py-1 px-2 rounded-lg mt-4"
                onClick={handleOpenConfirm}
              >
                Cancel tour
              </button>
            </div>
          </div>
        </div>
        {openConfirm && (
          <div className="fixed top-0 inset-0 flex items-center justify-center bg-gray-50  z-50">
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
      </Modal>
    </React.Fragment>
  );
}
