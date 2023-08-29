import React from "react";
import Headers from "./components/Headers";
import { LinearProgress } from "@mui/joy";
import { StepProvider } from "./context/ui/StepContext";
import Tourtype from "./components/TourType";
import { useStepContext } from "./context/ui/useStepContext";
import Welcome from "./components/Welcome";
import { Box, Button } from "@mui/material";
import TransportType from "./components/TransportType";
import AccomType from "./components/AccomType";
import Location from "./components/Location";
import DurationCheckIn from "./components/DurationCheckIn";
import Capacity from "./components/Capacity";
import Price from "./components/Price";
import Media from "./components/Media";
import Title from "./components/Title";
import Review from "./components/Review";
import Congratulation from "./components/Congratulation";
import { postCreateTour } from "../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";

const steps = [
  Welcome,
  Tourtype,
  TransportType,
  AccomType,
  Location,
  DurationCheckIn,
  Capacity,
  Price,
  Media,
  Title,
  Review,
  Congratulation,
];

const CreateTour: React.FC = () => {
  return (
    <>
      <StepProvider totalSteps={steps.length}>
        <div>
          <StepRenderer />
        </div>
      </StepProvider>
    </>
  );
};

export default CreateTour;

const StepRenderer: React.FC = () => {
  const {
    currentStep,
    totalSteps,
    goToNextStep,
    isNextClicked,
    goToPreviousStep,
    formValues,
  } = useStepContext();

  const dispatch: AppDispatch = useDispatch();
  const isLastStep = currentStep === totalSteps;
  const StepsToRender = (
    <>
      {steps.map(
        (Step, index) =>
          (index === currentStep - 1 || isNextClicked) && <Step key={index} />
      )}
    </>
  );
  const abc = {
    name: "Uncharted Expedition",
    description:
      "Embark on an exhilarating journey to discover new horizons and create unforgettable memories.",
    footnote: "For any inquiries, feel free to contact us anytime!",
    tour_images: [
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    ],
    price: 120.5,
    duration_day: 6,
    duration_night: 5,
    location: "Spectacular Natural Oasis",
    tag_id: [3, 4],
    vehicle_id: [5],
    TourComponent: [
      {
        title: "Day 1",
        description:
          "Commence your extraordinary adventure with a warm welcome and an engaging introductory session.",
      },
    ],
    address_name: "179 Tran Phu",
    tour_location_type: "INTERNATIONAL",
    address_city: "Bao  Loc",
    address_province: "Lam Dong",
    address_country: "Viet Nam",
  };
  console.log(formValues[7].checkImage);

  const handleFormSubmit = () => {
    goToNextStep();
  };
  const handlePostCreate = () => {
    const formData = new FormData();
    const dataValueCreate = {
      name: formValues[8]?.Title[0],
      description: formValues[8]?.Title[1],
      footnote: "For any inquiries, feel free to contact us anytime!",
      // price la number
      // price: formValues[6]?.Adults + formValues[6]?.Children,
      price:100,
      //end
      duration_day: formValues[4]?.DurationCheckIn[0]?.no,
      duration_night: formValues[4]?.DurationCheckIn[1]?.no,
      location: formValues[3]?.Location[0]?.value,
      tag_id: formValues[1]?.TransportType?.map((tag: any) => tag?.id),
      vehicle_id: formValues[2]?.AccomType?.map((acc: any) => acc?.id),
      // TourComponent: formValues[8]?.Title[2]?.map((boxes: any, index: any) => ({
      //   title: `Day ${index + 1}`,
      //   description: boxes?.boxes,
      // })),
      TourComponent: [
        {
            title: "Day 1",
            description: "Commence your extraordinary adventure with a warm welcome and an engaging introductory session."
        },
    ],
      address_name: "179 Tran Phu",
      tour_location_type: "INTERNATIONAL",
      address_city: "Bao  Loc",
      address_province: "Lam Dong",
      address_country: "Viet Nam",
    };
    console.log(JSON.stringify(dataValueCreate));
    formData.append("data", JSON.stringify(dataValueCreate));
    // formValues[7]?.Media[0]?.file?.forEach((image:any) => {
    //   console.log(image?.file)
    //   formData.append("tour_images", image?.file);
    // });
    formData.append("tour_images", formValues[7]?.checkImage);
    const requestData = {
      formData, // Send the FormData object
    };
    dispatch(postCreateTour(requestData?.formData)); // Pass the JSON data directly
    goToNextStep();
  };
  return (
    <>
      {!isLastStep && <Headers />}
      {StepsToRender}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          background: "white",
        }}
      >
        {!isLastStep && (
          <LinearProgress
            style={{ color: "black" }}
            determinate
            value={((currentStep + 1) / totalSteps) * 100}
          />
        )}
        {currentStep === totalSteps ? (
          <>
            <Box
              p={3}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={goToPreviousStep}
                disabled={currentStep !== totalSteps}
              >
                Previous Step
              </Button>
              <Button
                onClick={handleFormSubmit}
                disabled={currentStep !== totalSteps}
              >
                Start
              </Button>
            </Box>
          </>
        ) : currentStep === 11 ? (
          <>
            <Box
              p={3}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={goToPreviousStep}
                disabled={currentStep === totalSteps}
              >
                Previous Step
              </Button>
              <Button
                color="primary"
                onClick={handlePostCreate}
                disabled={currentStep === totalSteps}
              >
                Get Started
              </Button>
            </Box>
          </>
        ) : currentStep === 1 ? (
          <Box p={3}>
            <Button
              onClick={goToNextStep}
              disabled={currentStep === totalSteps}
            >
              Next Step
            </Button>
          </Box>
        ) : (
          <>
            <Box
              p={3}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                style={{ marginRight: "10px" }}
              >
                Previous Step
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={currentStep === totalSteps}
                style={{ marginLeft: "10px" }}
              >
                Next Step
              </Button>
            </Box>
          </>
        )}
      </div>
    </>
  );
};
