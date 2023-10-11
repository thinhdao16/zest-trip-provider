import React, { useEffect } from "react";
import Headers from "./components/Headers";
import { StepProvider } from "./context/ui/StepContext";
import Tourtype from "./components/TourType";
import { useStepContext } from "./context/ui/useStepContext";
import Welcome from "./components/Welcome";
import { Grid } from "@mui/material";
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
import CreateTourNav from "./components/Step/CreateTourNav";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { getTagTour, getVehicleTour } from "../../store/redux/silce/tourSlice";

const steps = [
  Price,
  // Welcome,
  Tourtype,
  Title,
  TransportType,
  AccomType,
  Location,
  DurationCheckIn,
  Capacity,
  Welcome,
  // Price,
  Media,
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
  const { currentStep, totalSteps, isNextClicked } = useStepContext();
  const dispatch: AppDispatch = useDispatch();
  const isLastStep = currentStep === totalSteps;
  useEffect(() => {
    dispatch(getTagTour());
    dispatch(getVehicleTour());
  }, []);
  const StepsToRender = (
    <>
      {steps.map(
        (Step, index) =>
          (index === currentStep - 1 || isNextClicked) && <Step key={index} />
      )}
    </>
  );

  return (
    <>
      <div className="create-tour h-[100vh]">
        {!isLastStep && <Headers />}

        <Grid container>
          {!isLastStep && (
            <Grid item xs={12} sm={2}>
              <CreateTourNav />
            </Grid>
          )}
          {!isLastStep && (
            <Grid item xs={12} sm={10} className="h-full p-4">
              {StepsToRender}
            </Grid>
          )}
          {isLastStep && (
            <Grid item xs={12} sm={12} className="h-full">
              {StepsToRender}
            </Grid>
          )}
        </Grid>
        {/* {!isLastStep && (
          <div
            style={{
              position: "fixed",
              bottom: "0",
              left: "0",
              right: "0",
              background: "white",
            }}
          >
            <LinearProgress
              style={{ color: "#05445E" }}
              determinate
              value={((currentStep + 1) / totalSteps) * 100}
            />
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
                  <button
                    className="font-medium border-b-2 border-navy-blue text-navy-blue hover:border-baby-blue hover:border-b-2"
                    onClick={goToPreviousStep}
                    disabled={currentStep === totalSteps}
                  >
                    Previous Step
                  </button>
                  <button
                    className="bg-navy-blue font-medium border border-navy-blue px-6 py-2.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                    onClick={handleCreateTourAndAvailability}
                    disabled={currentStep === totalSteps}
                  >
                    Get Started
                  </button>
                </Box>
              </>
            ) : currentStep === 1 ? (
              <div className="flex items-center justify-between px-10 py-4">
                <button></button>
                <button
                  className="bg-navy-blue font-medium border border-navy-blue px-6 py-2.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                  onClick={goToNextStep}
                  disabled={currentStep === totalSteps}
                >
                  Next Step
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-10 py-4">
                  <button
                    className="font-medium border-b-2 border-navy-blue text-navy-blue hover:border-baby-blue hover:border-b-2"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                    style={{ marginRight: "10px" }}
                  >
                    Previous Step
                  </button>
                  <button
                    className="bg-navy-blue font-medium border border-navy-blue px-6 py-2.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                    onClick={goToNextStep}
                    disabled={currentStep === totalSteps}
                    style={{ marginLeft: "10px" }}
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}
          </div>
        )} */}
      </div>
    </>
  );
};
