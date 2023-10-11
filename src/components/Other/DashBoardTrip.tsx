import { AiFillPlusSquare, AiOutlineSearch } from "react-icons/ai";
import { FaSliders } from "react-icons/fa6";
import { Link } from "react-router-dom";

function DashBoardTrip() {
  return (
    <div className="relative">
      <p className="font-medium text-xl mb-4">Your Tours</p>
      <div className="p-3 bg-white rounded-xl shadow-custom-card-mui">
        <div className="flex justify-between mb-3">
          <p className="text-gray-500">Tours list</p>
          <div className="flex gap-5">
            <AiOutlineSearch />
            <FaSliders />
          </div>
        </div>
        <div className="grid grid-cols-12 border-b border-gray-300 border-solid pb-3">
          <div className="col-span-7">
            <span className="font-medium">Name</span>
          </div>
          <div className="col-span-3">
            <span className="font-medium">Date</span>
          </div>
          <div className="col-span-2 flex justify-end">
            <span className="font-medium">Activity</span>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center"
          style={{ height: "53.5vh" }}
        >
          <img
            className="w-80 h-80 object-cover"
            src="https://img.freepik.com/premium-vector/businessman-woman-reading-business-reports-flat-illustration_828072-312.jpg?w=2000"
            alt="error"
          />
          <div className="items-center flex  justify-center">
            <Link to="/createtour">
              <button className="bg-navy-blue rounded-xl p-2 flex items-center justify-center w-28">
                <AiFillPlusSquare className="w-6 h-6 rounded-xl text-gray-50" />
                <p className="font-medium text-white  ">New tour</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 inset-x-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}

DashBoardTrip.propTypes = {};

export default DashBoardTrip;
