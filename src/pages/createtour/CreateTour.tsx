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
  console.log(formValues);
  const dataValueCreate = {
    a: "a",
  };

  const handleFormSubmit = () => {
    goToNextStep();
  };
  const handlePostCreate = () => {
    dispatch(postCreateTour(dataValueCreate));
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
