import Box from "@mui/material/Box";
import { FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StateTour } from "../../createtour/types/index.t";

export default function Header() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  return (
    <div className="h-[12.8vh]">
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <div className=" py-6 px-4 ">
          <div className="flex justify-between items-center ">
            <Link to="/" className=" flex items-center justify-center gap-x-4">
              <FaAngleLeft />
              <span className=" font-medium text-xl"> {tourDetail?.name}</span>
            </Link>
            <div className="flex gap-x-8">
              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue ">
                Any question ?
              </button>

              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue">
                Save and quit
              </button>
            </div>
          </div>
        </div>
        <div className="px-4">
          <hr />
        </div>
      </Box>
    </div>
  );
}
