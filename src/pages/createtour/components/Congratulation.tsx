import React from "react";
import { useStepContext } from "../context/ui/useStepContext";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../store/dataContext/DataContext";
import { PuffLoader } from "react-spinners";

const Congratulation: React.FC = () => {
  const { currentStep } = useStepContext();
  const { setRefeshTour } = React.useContext(DataContext);
  const navigate = useNavigate();
  if (currentStep !== 13) {
    return null;
  }
  const handleFormSubmit = () => {
    setRefeshTour((prev) => !prev);
    navigate("/listtour");
  };
  return (
    <div className="bg-navy-blue-opacity-5 w-full h-[100vh] flex items-center justify-center ">
      <div className=" bg-white py-20 px-32 shadow-custom-0 rounded-xl">
        <div className="flex flex-col justify-center text-center items-center">
          <PuffLoader color="green" className="mb-3" />

          <p className=" text-xl font-bold mb-1">Create success</p>
          <span className="w-52 text-gray-500">
            Thank you for contacting us to cooperate! Wait for us to approve
            your application. See you soon.In process...
          </span>
          <button className="flex items-center justify-center mt-4">
            <button onClick={handleFormSubmit} className=" font-medium">
              <p>Start</p>
            </button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
