import { PuffLoader } from "react-spinners";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
function ProviderProcessing() {
  return (
    <div className="bg-navy-blue-opacity-1 w-full h-[100vh] flex items-center justify-center ">
      <div className=" bg-white py-20 px-32 shadow-custom-0 rounded-xl">
        <div className="flex flex-col justify-center text-center items-center">
          <PuffLoader color="green" className="mb-3" />

          <p className=" text-xl font-bold mb-1">Processing</p>
          <span className="w-52 text-gray-500">
            Thank you for contacting us to cooperate! Wait for us to approve
            your application. See you soon.In process...
          </span>
          <Link to="/login">
            <button className="flex items-center justify-center mt-4">
              <BiChevronLeft className="w-5 h-5" />
              <span>Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ProviderProcessing;
