import * as React from "react";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { unBlockTour } from "../../../store/redux/silce/booking";
import { Alert, CircularProgress } from "@mui/joy";
import { Modal } from "antd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DataContext } from "../../../store/dataContext/DataContext";

export default function ModalUnBlockBooking({
  dataDate,
  openModal,
  setOpenMoal,
}: {
  dataDate: any;
  openModal: boolean;
  setOpenMoal: any;
}) {
  const { index } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const { setLoading } = React.useContext(DataContext);
  const handleClose = () => {
    setOpenMoal(false);
  };
  const handleCancelTour = () => {
    const data = {
      idTour: index,
      dataDate: dataDate,
    };
    dispatch(unBlockTour(data)).then((response) => {
      if (unBlockTour.fulfilled.match(response)) {
        setOpenConfirm(false);

        setLoading((prev: any) => !prev);
        setOpenMoal(false);
      }
      if (unBlockTour.rejected.match(response)) {
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
        title="Unblock tour"
        open={openModal}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
      >
        <div className="">
          <div className=" flex  items-center justify-center">
            <div className="flex flex-col w-96 ">
              <span className=" font-medium">Date Unblock</span>

              {dataDate && dataDate?.length > 0 && (
                <span className="flex flex-wrap ">
                  {dataDate?.map((date: string) => (
                    <span className="mr-2">
                      {date},{""}
                    </span>
                  ))}
                </span>
              )}
              <div className="text-center">
                <button
                  className="bg-navy-blue text-white py-1 px-2 rounded-lg mt-4"
                  onClick={handleOpenConfirm}
                >
                  Unblock tour
                </button>
              </div>
            </div>
          </div>
          {openConfirm && (
            <div className=" fixed top-0 inset-0 flex items-center justify-center bg-gray-50  z-50 ">
              <Alert
                variant="soft"
                color="success"
                invertedColors
                startDecorator={
                  <CircularProgress size="lg" color="danger">
                    <CheckCircleOutlineIcon />
                  </CircularProgress>
                }
                sx={{ alignItems: "flex-start", gap: "1rem" }}
              >
                <div>
                  <p className="text-xl">Unblock Tour</p>
                  <span className="w-64 flex flex-wrap">
                    Whether you're traveling with an intimate circle or a larger
                    group, the "Unblock Tour" feature accommodates varying group
                    sizes, providing flexibility for gatherings of all kinds.
                  </span>
                  <div className="text-end mt-4">
                    <button
                      className="bg-white text-green-900 px-4 py-1 rounded-md mr-4"
                      onClick={handleCloseConfirm}
                    >
                      No
                    </button>
                    <button
                      className="bg-green-900 text-white px-4 py-1 rounded-md"
                      onClick={handleCancelTour}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </Alert>
            </div>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}
