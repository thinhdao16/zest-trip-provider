import React, { useContext, useEffect, useState } from "react";
import { useStepContext } from "../../context/ui/useStepContext";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { DataContext } from "../../../../store/dataContext/DataContext";
import {
  postCreateAvailabilityTour,
  postCreateTour,
} from "../../../../store/redux/silce/tourSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../store/redux/store";
import { useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";

function CreateTourNav() {
  const step = [
    { id: 1, name: "Welcome" },
    { id: 2, name: "Type Tour" },
    { id: 3, name: "Title" },
    { id: 4, name: "Welcome" },
    { id: 5, name: "Type Tour" },
    { id: 6, name: "Title" },
    { id: 7, name: "Welcome" },
    { id: 8, name: "Type Tour" },
    { id: 9, name: "Title" },
    { id: 10, name: "Welcome" },
    { id: 11, name: "Type Tour" },
    { id: 12, name: "Title" },
  ];

  const {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    formValues,
    chooseStep,
  } = useStepContext();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { setRefeshTour } = useContext(DataContext);
  const [lengthValue, setLengthValue] = useState("");
  const isLastStep = currentStep === totalSteps;
  const handleFormSubmit = () => {
    goToNextStep();
    setRefeshTour((prev) => !prev);
    navigate("/listtour");
  };
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
              ...(formValues[5]?.Capacity?.Sun?.length > 0
                ? [{ day: 1, timeSlot: formValues[5]?.Capacity?.Sun }]
                : []),
              ...(formValues[5]?.Capacity?.Mon?.length > 0
                ? [{ day: 2, timeSlot: formValues[5]?.Capacity?.Mon }]
                : []),
              ...(formValues[5]?.Capacity?.Tue?.length > 0
                ? [{ day: 3, timeSlot: formValues[5]?.Capacity?.Tue }]
                : []),
              ...(formValues[5]?.Capacity?.Wed?.length > 0
                ? [{ day: 4, timeSlot: formValues[5]?.Capacity?.Wed }]
                : []),
              ...(formValues[5]?.Capacity?.Thu?.length > 0
                ? [{ day: 5, timeSlot: formValues[5]?.Capacity?.Thu }]
                : []),
              ...(formValues[5]?.Capacity?.Fri?.length > 0
                ? [{ day: 6, timeSlot: formValues[5]?.Capacity?.Fri }]
                : []),
              ...(formValues[5]?.Capacity?.Sat?.length > 0
                ? [{ day: 7, timeSlot: formValues[5]?.Capacity?.Sat }]
                : []),
            ],

            ...(formValues[5]?.Capacity?.SingleTime?.length > 0
              ? formValues[5]?.Capacity?.SingleTime.map((item: any) => ({
                  date: formatDate(item.day),
                  timeSlot: item.time, // Chuyển thành mảng gồm một chuỗi thời gian
                }))
              : []),
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
  const chooseCurrentStep = (data: number) => {
    if (data < currentStep) {
      chooseStep(data);
    }
  };
  console.log(formValues);
  const constraintLength = () => {
    let classSkip = "no"; // Mặc định là "no"

    if (currentStep === 3) {
      if (
        formValues[8].Title[0].length > 0 &&
        formValues[8].Title[1].length > 0
      ) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 4) {
      if (formValues[1].TransportType.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 5) {
      if (formValues[2].AccomType.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 6) {
      if (formValues[3].Location.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 7) {
      if (
        formValues[4].DurationCheckIn[1].length > 0 &&
        formValues[4].DurationCheckIn[0].length > 0
      ) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 8) {
      const capacities = formValues[5].Capacity;
      let hasNonEmptyArray = false; // Biến kiểm tra mặc định là false
      if (
        (capacities.DateFrom.length > 0 &&
          capacities.DateTo.length > 0 &&
          capacities.Title.length > 0 &&
          capacities.Mon.length > 0) ||
        capacities.Tue.length > 0 ||
        capacities.Wed.length > 0 ||
        capacities.Thu.length > 0 ||
        capacities.Fri.length > 0 ||
        capacities.Sat.length > 0 ||
        capacities.Sun.length > 0 ||
        capacities.SingleTime.length > 0
      ) {
        hasNonEmptyArray = true; // Nếu có ít nhất một mảng có độ dài > 0, đặt biến kiểm tra thành true
      }

      if (hasNonEmptyArray) {
        classSkip = "yes"; // Nếu biến kiểm tra là true, đặt classSkip thành "yes"
      }
    }
    if (currentStep === 10) {
      if (formValues[7].Media.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    } else if (currentStep === 2 || currentStep === 9) {
      classSkip = "yes"; // Nếu currentStep là 2, thì set thành "yes"
    }

    setLengthValue(classSkip);
  };

  useEffect(() => {
    constraintLength();
  }, [currentStep, formValues]);

  return (
    <div className="">
      <div className=" border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
        <div className="flex flex-col justify-center px-8 py-4">
          <p className="font-medium pl-5 pb-3">Information</p>
          <div className="h-[60vh] overflow-auto scrollbar-none gap-4 grid">
            {step.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  chooseCurrentStep(item.id);
                }}
                className={`flex items-center justify-start font-base py-3.5 px-5 w-full rounded-xl border  relative ${
                  currentStep === item.id
                    ? "bg-navy-blue text-white"
                    : currentStep < item.id
                    ? "bg-gray-300 text-gray-700"
                    : " bg-white text-navy-blue border border-navy-blue border-solid"
                }`}
              >
                <p className="mr-4 font-medium">{item?.id}.</p>
                {item.name}
                <FaCircleCheck
                  className={` ${
                    currentStep === item.id
                      ? "hidden"
                      : currentStep < item.id
                      ? "hidden"
                      : "text-navy-blue absolute top-4.5 right-4"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex w-64">
            {!isLastStep && (
              <>
                {currentStep === totalSteps ? (
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
                ) : currentStep === 11 ? (
                  <div className="flex flex-col items-center justify-center px-10 py-4 gap-y-4">
                    <button
                      className="bg-navy-blue font-medium border border-navy-blue px-6 py-2.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                      onClick={handleCreateTourAndAvailability}
                      disabled={currentStep === totalSteps}
                    >
                      Get Started
                    </button>
                    <button
                      className="font-medium border-b-2 border-navy-blue text-navy-blue hover:border-baby-blue hover:border-b-2"
                      onClick={goToPreviousStep}
                      disabled={currentStep === totalSteps}
                    >
                      Previous Step
                    </button>
                  </div>
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
                    <div className="flex flex-col items-center justify-center px-10 py-4 gap-y-4">
                      <button
                        id="yourButtonId"
                        className={`font-medium border  px-6 py-2.5 rounded-lg   ${
                          lengthValue === "yes"
                            ? "bg-navy-blue border-navy-blue text-white  hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                            : "cursor-not-allowed bg-gray-300 border-gray-200 text-gray-800 "
                        }`}
                        onClick={goToNextStep}
                        disabled={lengthValue === "no"}
                      >
                        Next Steps
                      </button>
                      <button
                        className="font-medium border-b-2 border-navy-blue text-navy-blue hover:border-baby-blue hover:border-b-2"
                        onClick={goToPreviousStep}
                        disabled={currentStep === 1}
                      >
                        Previous Step
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTourNav;
