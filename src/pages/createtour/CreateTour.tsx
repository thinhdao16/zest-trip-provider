import React, { useContext, useEffect } from "react";
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
import {
  getTagTour,
  getVehicleTour,
  postCreateAvailabilityTour,
  postCreateTour,
} from "../../store/redux/silce/tourSlice";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../store/dataContext/DataContext";
import { StateTour } from "./types/index.t";

const steps = [
  Welcome,
  Tourtype,
  Title,
  TransportType,
  AccomType,
  Location,
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
  const {
    currentStep,
    totalSteps,
    goToNextStep,
    isNextClicked,
    goToPreviousStep,
    formValues,
  } = useStepContext();
  const navigate = useNavigate();
  const { setRefeshTour } = useContext(DataContext);
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
  useEffect(() => {
    dispatch(getTagTour());
    dispatch(getVehicleTour());
  }, []);
  const { errorCreateTour, loadingCreateTour } = useSelector(
    (state: StateTour) => state.tour
  );
  console.log(loadingCreateTour);
  const orderData = useSelector((state: StateTour) => state.tour.otherData);
  function formatDate(inputDate: string | undefined): string | undefined {
    if (!inputDate) {
      return undefined; // Handle empty input gracefully
    }

    const match = inputDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (!match) {
      throw new Error('Invalid date format. Expected "dd/mm/yyyy".');
    }

    const day = match[1].padStart(2, "0");
    const month = match[2].padStart(2, "0");
    const year = match[3];

    return `${year}-${month}-${day}`;
  }

  const handleFormSubmit = () => {
    goToNextStep();
    setRefeshTour((prev) => !prev);
    navigate("/listtour");
  };

  const handleCreateTourAndAvailability = () => {
    const formData = new FormData();
    const dataValueCreate = {
      name: formValues[8]?.Title[0],
      description: formValues[8]?.Title[1],
      footnote: "For any inquiries, feel free to contact us anytime!",
      // price la number
      price:
        parseInt(formValues[6]?.Adults) + parseInt(formValues[6]?.Children),
      //end
      duration: parseInt(formValues[4]?.DurationCheckIn[0][0]?.no),
      location: formValues[3]?.Location,
      // tag_id: formValues[1]?.TransportType?.map((tag: any) => tag?.id),
      tag_id: [3, 4],
      // vehicle_id: formValues[2]?.AccomType?.map((acc: any) => acc?.id),
      vehicle_id: [5],
      // TourComponent: formValues[8]?.Title[2]?.map((boxes: any, index: any) => ({
      //   title: `Day ${index + 1}`,
      //   description: boxes?.boxes,
      // })),
      TourSchedule: [
        {
          title: "Day 1",
          description:
            "Commence your extraordinary adventure with a warm welcome and an engaging introductory session.",
        },
      ],
      address_ward: "phuong xa",
      address_name: "179 Tran Phu",
      tour_location_type: "INTERNATIONAL",
      address_city: "Bao  Loc",
      address_province: "Lam Dong",
      address_country: "Viet Nam",
      address_district: "quan 9",
    };

    formData.append("data", JSON.stringify(dataValueCreate));
    const mediaArray = formValues[7]?.Media || [];

    for (let i = 0; i < mediaArray.length; i++) {
      const imageFile = mediaArray[i].file;
      formData.append("tour_images", imageFile[i]);
    }

    const requestData = {
      formData,
    };
    dispatch(postCreateTour(requestData.formData))
      .then((tourResponse) => {
        // console.log(tourResponse);
        if (postCreateTour.fulfilled.match(tourResponse)) {
          const dataValueCreateAvailability = {
            name: formValues[5]?.Capacity?.Title,
            tour_id: tourResponse.payload.data.id,
            validity_date_range_from: formValues[5]?.Capacity?.DateFrom,
            validity_date_range_to: formValues[5]?.Capacity?.DateTo,
            weekdays: [
              { day: 1, timeSlot: formValues[5]?.Capacity?.Sun },
              { day: 2, timeSlot: formValues[5]?.Capacity?.Mon },
              { day: 3, timeSlot: formValues[5]?.Capacity?.Tue },
              { day: 4, timeSlot: formValues[5]?.Capacity?.Wed },
              { day: 5, timeSlot: formValues[5]?.Capacity?.Thu },
              { day: 6, timeSlot: formValues[5]?.Capacity?.Fri },
              { day: 7, timeSlot: formValues[5]?.Capacity?.Sat },
            ],
            specialDates: formValues[5]?.Capacity?.SingleTime?.map(
              (item: any) => ({
                date: formatDate(item.day),
                timeSlot: item.time, // Chuyển thành mảng gồm một chuỗi thời gian
              })
            ),
          };

          dispatch(postCreateAvailabilityTour(dataValueCreateAvailability))
            .then((availabilityResponse) => {
              if (
                postCreateAvailabilityTour.fulfilled.match(availabilityResponse)
              ) {
                console.log("Both actions succeeded");
              } else {
                console.log("postCreateAvailabilityTour failed");
              }
            })
            .catch((availabilityError) => {
              console.error("Error:", availabilityError);
            });
        } else {
          console.log("postCreateTour failed");
        }
      })
      .catch((tourError) => {
        console.error("Error:", tourError);
      });
    goToNextStep();
  };

  return (
    <>
      <div className="create-tour">
        {!isLastStep && <Headers />}

        {StepsToRender}
        {!isLastStep && (
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
                  {/* <p onClick={handleCreateTourAndAvailability}>abc</p> */}
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
        )}
      </div>
    </>
  );
};
