import React, { useEffect } from "react";
import Headers from "./components/Headers";
import { StepProvider } from "./context/ui/StepContext";
import Tourtype from "./components/TourType";
import { useStepContext } from "./context/ui/useStepContext";
import Welcome from "./components/Welcome";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
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
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { getTagTour, getVehicleTour } from "../../store/redux/silce/tourSlice";
import CreateTourNav from "./components/Step/CreateTourNav";
import LocationStart from "./components/LocationStart";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/web";
import { getCommistionRate } from "../../store/redux/silce/authSilce";

const steps = [
  Welcome,
  Tourtype,
  Title,
  TransportType,
  AccomType,
  Location,
  LocationStart,
  DurationCheckIn,
  Capacity,
  Price,
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
  const { loadingCreateTour } = useSelector((state: any) => state.tour);
  useEffect(() => {
    dispatch(getTagTour());
    dispatch(getVehicleTour());
    dispatch(getCommistionRate());
  }, []);
  const StepsToRender = (
    <>
      {steps.map(
        (Step, index) =>
          (index === currentStep - 1 || isNextClicked) && <Step key={index} />
      )}
    </>
  );
  const [springProps, setSpringProps] = useSpring(() => ({
    opacity: 1,
    transform: "translateY(0)",
  }));

  useEffect(() => {
    // Update the springProps when currentStep changes
    setSpringProps({
      opacity: 1,
      transform: "translateY(0)",
      from: { opacity: 0, transform: "translateY(20px)" },
    });
  }, [currentStep, setSpringProps]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingCreateTour}
        // onClick={() => setOpenLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <animated.div style={springProps} className="animate-container">
                {StepsToRender}
              </animated.div>
            </Grid>
          )}
          {isLastStep && (
            <Grid item xs={12} sm={12} className="h-full">
              {StepsToRender}
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};
