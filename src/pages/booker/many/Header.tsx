import Box from "@mui/material/Box";
import { FaAngleLeft } from "react-icons/fa6";
// import { StateTour } from "../../createtour/types/index.t";

export default function Header() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="h-[12.8vh] ">
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <div className=" py-6 px-4 bg-white">
          <div className="flex justify-between items-center ">
            <div
              onClick={goBack}
              className=" flex items-center justify-center gap-x-4 h-12"
            >
              <FaAngleLeft />
              {/* <span className=" font-medium text-xl"> {tourDetail?.name}</span>  */}
            </div>
            {/* <div className="flex gap-x-8">
              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue ">
                Any question ?
              </button>

              <button className="text-black font-medium border border-gray-300 px-3 py-2 rounded-3xl  hover:text-black hover:border-navy-blue">
                Save
              </button>
            </div> */}
          </div>
        </div>
        <div className="px-4">
          <hr />
        </div>
      </Box>
    </div>
  );
}
