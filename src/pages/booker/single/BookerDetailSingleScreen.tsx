import ScreenMain from "./ScreenMain";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Index";

function BookerDetailSingleScreen() {
  const { loadingBooking } = useSelector((state: any) => state.booking);

  return (
    <div className="h-[100vh]">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBooking}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Navbar />
        <div>
          <ScreenMain />
        </div>
      </div>
    </div>
  );
}

BookerDetailSingleScreen.propTypes = {};

export default BookerDetailSingleScreen;
