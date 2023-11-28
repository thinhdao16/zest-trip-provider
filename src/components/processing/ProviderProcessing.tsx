import { IoReturnDownBackOutline } from "react-icons/io5";
import { PuffLoader } from "react-spinners";

function ProviderProcessing() {
  return (
    <div className="bg-navy-blue-opacity-1 w-full h-[100vh] flex items-center justify-center">
      <div className=" bg-white py-20 px-32 shadow-custom-0 rounded-xl">
        <div className="flex flex-col justify-center text-center items-center">
          <PuffLoader color="green" className="mb-3" />

          <p className=" text-xl font-bold mb-1">Progessing</p>
          <span className="w-52 text-gray-500">
            Thank you for contacting us to cooperate! Wait for us to approve
            your application. See you soon.In progress...
          </span>
          <div className="mt-1">
            <span className="font-medium text-sm pr-1">Back</span>
            <IoReturnDownBackOutline
              className="w-10 h-10"
              style={{ marginTop: "-20px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProviderProcessing;
